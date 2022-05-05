<?php
session_start();

if (isset($_GET['access_code'])) {$_SESSION['access_code'] = $_GET['access_code'];}
?>