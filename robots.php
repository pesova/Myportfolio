<?php

declare(strict_types=1);

header('Content-Type: text/plain; charset=UTF-8');

$https = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';
$scheme = $https ? 'https' : 'http';
$host = $_SERVER['HTTP_HOST'] ?? 'localhost';
$base = $scheme . '://' . $host;

$dir = str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'] ?? '/'));
if ($dir === '/' || $dir === '.') {
    $sitemap = $base . '/sitemap.php';
} else {
    $sitemap = rtrim($base . $dir, '/') . '/sitemap.php';
}

echo "User-agent: *\n";
echo "Allow: /\n\n";
echo 'Sitemap: ' . $sitemap . "\n";
