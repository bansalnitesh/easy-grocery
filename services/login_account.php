<?php

// GET LIST OF PRODUCTS BY CATEGORY

$username = $_POST["username"];
$username = addslashes($username);

$password = $_POST["password"];
$password = addslashes($password);



require_once("easy_groceries.class.php");

$oEasyGroceries = new EasyGroceries();

$data = $oEasyGroceries->loginAccount($username,$password);

header("Content-Type: application/json");

echo $data;

?>
