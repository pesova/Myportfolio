<?php

/**
 * Single HTTP endpoint for portfolio access control.
 *
 * GET  gate.php?action=status  → { "authenticated": bool }
 * POST gate.php                → JSON { "code": "1234" } or form field "code"
 *      Response: { "ok": bool, "valid": bool (same as ok), "message"?: string }
 *
 * Optional .env: GATE_ALLOW_ORIGIN=http://localhost:5173 (CORS + credentials for Vite dev)
 */
declare(strict_types=1);

function portfolio_ensure_dotenv(): void
{
    static $done = false;
    if ($done) {
        return;
    }
    $done = true;
    if (getenv('RAILWAY_ENVIRONMENT') || getenv('RAILWAY_STATIC_URL')) {
        return;
    }
    if (!is_file(__DIR__ . '/.env') || !is_file(__DIR__ . '/vendor/autoload.php')) {
        return;
    }
    require_once __DIR__ . '/vendor/autoload.php';
    try {
        Dotenv\Dotenv::createImmutable(__DIR__)->load();
    } catch (Throwable $e) {
    }
}

// --- Session storage (must run before session_start) ---
if (getenv('RAILWAY_ENVIRONMENT') || file_exists('/etc/railway')) {
    session_save_path('/tmp');
} else {
    $sessionDir = __DIR__ . '/sessions';
    if (!is_dir($sessionDir)) {
        mkdir($sessionDir, 0700, true);
    }
    session_save_path($sessionDir);
}

portfolio_ensure_dotenv();
session_start();

header('Content-Type: application/json; charset=utf-8');

// --- CORS for SPA dev (see GATE_ALLOW_ORIGIN in .env) ---
$allow = $_ENV['GATE_ALLOW_ORIGIN'] ?? getenv('GATE_ALLOW_ORIGIN') ?: '';
if (is_string($allow) && $allow !== '') {
    header('Access-Control-Allow-Origin: ' . $allow);
    header('Access-Control-Allow-Credentials: true');
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'OPTIONS') {
    if ($allow !== '') {
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');
    }
    http_response_code(204);
    exit;
}

function portfolio_access_code(): ?string
{
    portfolio_ensure_dotenv();

    if (getenv('RAILWAY_ENVIRONMENT') || getenv('RAILWAY_STATIC_URL')) {
        $code = getenv('ACCESS_CODE');
        return ($code !== false && $code !== '') ? $code : null;
    }

    $code = $_ENV['ACCESS_CODE'] ?? null;
    if ($code === null || $code === '') {
        return null;
    }
    return $code;
}

// --- GET: auth status ---
if ($method === 'GET') {
    $action = $_GET['action'] ?? '';
    if ($action === 'status') {
        $ok = isset($_SESSION['authenticated']) && $_SESSION['authenticated'] === true;
        echo json_encode(['authenticated' => $ok]);
        exit;
    }
    http_response_code(400);
    echo json_encode(['error' => 'Use ?action=status or POST with code']);
    exit;
}

// --- POST: verify code ---
if ($method !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'valid' => false, 'message' => 'Method not allowed']);
    exit;
}

if (!isset($_SESSION['attempt_count'])) {
    $_SESSION['attempt_count'] = 0;
    $_SESSION['first_attempt_time'] = time();
    $_SESSION['last_attempt_time'] = 0;
}

$maxAttempts = 5;
$timeWindow = 300;
$currentTime = time();

if ($_SESSION['attempt_count'] >= $maxAttempts) {
    $timeSinceFirst = $currentTime - $_SESSION['first_attempt_time'];
    if ($timeSinceFirst < $timeWindow) {
        $timeLeft = $timeWindow - $timeSinceFirst;
        echo json_encode([
            'ok' => false,
            'valid' => false,
            'message' => 'Too many attempts. Please wait ' . ceil($timeLeft / 60) . ' minutes.',
        ]);
        exit;
    }
    $_SESSION['attempt_count'] = 0;
    $_SESSION['first_attempt_time'] = $currentTime;
}

$realCode = portfolio_access_code();
if ($realCode === null) {
    http_response_code(503);
    echo json_encode([
        'ok' => false,
        'valid' => false,
        'message' => 'Access is temporarily unavailable.',
    ]);
    exit;
}

$contentType = $_SERVER['CONTENT_TYPE'] ?? $_SERVER['HTTP_CONTENT_TYPE'] ?? '';
$submittedCode = '';
if (is_string($contentType) && str_contains(strtolower($contentType), 'application/json')) {
    $raw = file_get_contents('php://input');
    $data = is_string($raw) ? json_decode($raw, true) : null;
    if (is_array($data) && isset($data['code'])) {
        $submittedCode = (string) $data['code'];
    }
} else {
    $submittedCode = isset($_POST['code']) ? (string) $_POST['code'] : '';
}

if (strlen($submittedCode) !== 4 || !ctype_digit($submittedCode)) {
    $_SESSION['attempt_count']++;
    echo json_encode(['ok' => false, 'valid' => false, 'message' => 'Invalid code format']);
    exit;
}

if (hash_equals($realCode, $submittedCode)) {
    $_SESSION['attempt_count'] = 0;
    session_regenerate_id(true);
    $_SESSION['authenticated'] = true;
    $_SESSION['auth_time'] = $currentTime;
    $_SESSION['access_granted_at'] = $currentTime;
    echo json_encode(['ok' => true, 'valid' => true]);
    exit;
}

$_SESSION['attempt_count']++;
$_SESSION['last_attempt_time'] = $currentTime;
$attemptsLeft = $maxAttempts - $_SESSION['attempt_count'];
$message = $attemptsLeft > 0
    ? "Incorrect code. Attempts left: {$attemptsLeft}"
    : 'Too many failed attempts. Please wait.';

echo json_encode([
    'ok' => false,
    'valid' => false,
    'message' => $message,
    'attempts_left' => $attemptsLeft,
]);
