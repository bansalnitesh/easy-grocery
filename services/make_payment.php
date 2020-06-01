<?php

// GET LIST OF PRODUCTS BY CATEGORY

$card_holder_name = $_POST["card_holder_name"];
$card_holder_name = addslashes($card_holder_name);

$card_number = $_POST["card_number"];
$card_number = addslashes($card_number);

$month = $_POST["month"];
$month = addslashes($month);

$year = $_POST["year"];
$year = addslashes($year);

$cvv = $_POST["cvv"];
$cvv = addslashes($cvv);



require_once("easy_groceries.class.php");

$oEasyGroceries = new EasyGroceries();

$data = $oEasyGroceries->makePayment($card_holder_name, $card_number, $month, $year, $cvv);

header("Content-Type: application/json");

echo $data;

?>
