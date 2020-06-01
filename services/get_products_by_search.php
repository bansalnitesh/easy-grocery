<?php

// GET LIST OF PRODUCTS BY CATEGORY

$search = $_POST["search"];
$search = addslashes($search);

require_once("easy_groceries.class.php");

$oEasyGroceries = new EasyGroceries();

$data = $oEasyGroceries->getProductsBySearch($search);

header("Content-Type: application/json");

echo $data;

?>
