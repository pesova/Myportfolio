<?php

declare(strict_types=1);

/**
 * Configure session storage before session_start().
 */
function configure_portfolio_session(): void
{
    if (getenv('RAILWAY_ENVIRONMENT') || file_exists('/etc/railway')) {
        session_save_path('/tmp');
        return;
    }

    $dir = dirname(__DIR__) . '/sessions';
    if (!is_dir($dir)) {
        mkdir($dir, 0700, true);
    }
    session_save_path($dir);
}

/**
 * Portfolio gate code from env / .env. Null if unset — verify endpoint must fail closed.
 */
function getAccessCode(): ?string
{
    $root = dirname(__DIR__);

    if (getenv('RAILWAY_ENVIRONMENT') || getenv('RAILWAY_STATIC_URL')) {
        $code = getenv('ACCESS_CODE');
        return ($code !== false && $code !== '') ? $code : null;
    }

    if (!is_file($root . '/.env') || !is_file($root . '/vendor/autoload.php')) {
        return null;
    }

    require_once $root . '/vendor/autoload.php';

    try {
        $dotenv = Dotenv\Dotenv::createImmutable($root);
        $dotenv->load();
        $code = $_ENV['ACCESS_CODE'] ?? null;
        if ($code === null || $code === '') {
            return null;
        }
        return $code;
    } catch (Throwable $e) {
        return null;
    }
}
