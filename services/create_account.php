<?php

// GET LIST OF PRODUCTS BY CATEGORY

$username = $_POST["username"];
$username = addslashes($username);

$password = $_POST["password"];
$password = addslashes($password);

$name_first = $_POST["name_first"];
$name_first = addslashes($name_first);

$name_last = $_POST["name_last"];
$name_last = addslashes($name_last);



require_once("easy_groceries.class.php");

$oEasyGroceries = new EasyGroceries();

$data = $oEasyGroceries->createAccount($username,$password,$name_first,$name_last);

header("Content-Type: application/json");

echo $data;

?>
