<?php

// GET LIST OF PRODUCTS BY CATEGORY

$category_id = $_POST["category_id"];
$category_id = addslashes($category_id);

require_once("easy_groceries.class.php");

$oEasyGroceries = new EasyGroceries();

$data = $oEasyGroceries->getProductsByCategory($category_id);

header("Content-Type: application/json");

echo $data;

?>
