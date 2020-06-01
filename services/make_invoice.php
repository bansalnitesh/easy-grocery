<?php

// GET LIST OF PRODUCTS BY CATEGORY

$transaction_code = $_POST["transaction_code"];
$transaction_code = addslashes($transaction_code);

$myCart = $_POST["myCart"];
//$myCart = addslashes($myCart);

$ea_user_id = $_POST["ea_user_id"];
$ea_user_id = addslashes($ea_user_id);



$billing_name_first = $_POST["billing_name_first"];
$billing_name_first = addslashes($billing_name_first);

$billing_name_last = $_POST["billing_name_last"];
$billing_name_last = addslashes($billing_name_last);


$billing = $_POST["billing"];
$shipping = $_POST["shipping"];

require_once("easy_groceries.class.php");

$oEasyGroceries = new EasyGroceries();

$data = $oEasyGroceries->makeInvoice($transaction_code, $myCart, $ea_user_id, $billing_name_last, $billing_name_first);

header("Content-Type: application/json");

echo $data;

?>
