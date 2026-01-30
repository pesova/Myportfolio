<?php
// verify-code.php
session_start();
require_once realpath(__DIR__ . "/vendor/autoload.php");

use Dotenv\Dotenv;
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

header('Content-Type: application/json');

// Initialize attempt tracking
if (!isset($_SESSION['attempt_count'])) {
    $_SESSION['attempt_count'] = 0;
    $_SESSION['first_attempt_time'] = time();
    $_SESSION['last_attempt_time'] = 0;
}

// Rate limiting: Max 5 attempts every 5 minutes
$maxAttempts = 5;
$timeWindow = 300; // 5 minutes in seconds
$currentTime = time();

// Check if user is rate limited
if ($_SESSION['attempt_count'] >= $maxAttempts) {
    $timeSinceFirstAttempt = $currentTime - $_SESSION['first_attempt_time'];
    
    if ($timeSinceFirstAttempt < $timeWindow) {
        $timeLeft = $timeWindow - $timeSinceFirstAttempt;
        echo json_encode([
            'valid' => false,
            'message' => 'Too many attempts. Please wait ' . ceil($timeLeft / 60) . ' minutes.'
        ]);
        exit;
    } else {
        // Reset counter if time window has passed
        $_SESSION['attempt_count'] = 0;
        $_SESSION['first_attempt_time'] = $currentTime;
    }
}

// Get the submitted code
$submittedCode = $_POST['code'] ?? '';

// Basic validation
if (strlen($submittedCode) !== 4 || !ctype_digit($submittedCode)) {
    $_SESSION['attempt_count']++;
    echo json_encode(['valid' => false, 'message' => 'Invalid code format']);
    exit;
}

// Get the real code from environment
$realCode = $_ENV['ACCESS_CODE'] ?? '';

// Verify (timing-safe comparison)
$isValid = hash_equals($realCode, $submittedCode);

if ($isValid) {
    // Success - reset attempts and set session
    $_SESSION['attempt_count'] = 0;
    $_SESSION['authenticated'] = true;
    $_SESSION['auth_time'] = $currentTime;
    $_SESSION['access_granted_at'] = $currentTime;
    
    echo json_encode(['valid' => true]);
} else {
    // Increment attempt counter
    $_SESSION['attempt_count']++;
    $_SESSION['last_attempt_time'] = $currentTime;
    
    $attemptsLeft = $maxAttempts - $_SESSION['attempt_count'];
    $message = $attemptsLeft > 0
        ? "Incorrect code. Attempts left: {$attemptsLeft}"
        : "Too many failed attempts. Please wait.";
    
    echo json_encode([
        'valid' => false,
        'message' => $message,
        'attempts_left' => $attemptsLeft
    ]);
}
