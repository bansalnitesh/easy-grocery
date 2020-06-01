<?php

// GET LIST OF PRODUCTS BY CATEGORY

$cart = $_POST["cart"];
//$cart = addslashes($cart);

require_once("easy_groceries.class.php");

$oEasyGroceries = new EasyGroceries();

$data = $oEasyGroceries->getProductsByCart($cart);

header("Content-Type: application/json");

echo $data;

?>
