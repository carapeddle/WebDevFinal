<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);


// Initialize variables
$firstName = $_POST['firstName'] ?? '';
$lastName = $_POST['lastName'] ?? '';
$street = $_POST['street'] ?? '';
$city = $_POST['city'] ?? '';
$state = $_POST['state'] ?? '';
$zip = $_POST['zip'] ?? '';
$country = $_POST['country'] ?? '';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';
$creditCard = $_POST['creditCard'] ?? '';
$cardName = $_POST['cardname'] ?? '';
$cardNumber = $_POST['cardnumber'] ?? '';
$expiration = $_POST['expiration'] ?? '';
$securityCode = $_POST['securitycode'] ?? '';
$shippingMethod = $_POST['shipping'] ?? '';

$subtotal = isset($_POST['subtotal']) && is_numeric($_POST['subtotal']) ? floatval($_POST['subtotal']) : 0.0;
$shippingCost = ($shippingMethod == 'Shipping') ? 5 : 0;
$total = $subtotal + $shippingCost;

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Receipt</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            padding: 0;
            background-color: #f7f7f7;
        }
        h1, h2 {
            text-align: center;
        }
        .receipt {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .receipt p {
            margin: 0 0 10px;
            line-height: 1.5;
        }
        .receipt .total {
            font-size: 18px;
            font-weight: bold;
        }
        .section {
            margin-bottom: 20px;
        }
    </style>
</head>
<body>

<div class="receipt">
    <h1>Order Receipt</h1>

    <div class="section">
        <h2>Customer Information</h2>
        <p><strong>Name:</strong> <?php echo htmlspecialchars($firstName . ' ' . $lastName); ?></p>
        <p><strong>Email:</strong> <?php echo htmlspecialchars($email); ?></p>
        <p><strong>Phone:</strong> <?php echo htmlspecialchars($phone); ?></p>
    </div>

    <div class="section">
        <h2>Shipping Address</h2>
        <p><?php echo htmlspecialchars($street); ?></p>
        <p><?php echo htmlspecialchars($city . ', ' . $state . ' ' . $zip); ?></p>
        <p><?php echo htmlspecialchars($country); ?></p>
    </div>

    <div class="section">
        <h2>Payment Information</h2>
        <p><strong>Credit Card Type:</strong> <?php echo htmlspecialchars($creditCard); ?></p>
        <p><strong>Card Number:</strong> **** **** **** <?php echo substr($cardNumber, -4); ?></p>
        <p><strong>Expiration Date:</strong> <?php echo htmlspecialchars($expiration); ?></p>
    </div>

    <div class="section">
        <h2>Order Summary</h2>
        <p><strong>Subtotal:</strong> $<?php echo number_format($subtotal, 2); ?></p>
        <p><strong>Shipping:</strong> $<?php echo number_format($shippingCost, 2); ?></p>
        <p class="total"><strong>Total:</strong> $<?php echo number_format($total, 2); ?></p>
    </div>

    <!-- Go back to Menu button -->
    <div style="text-align: center; margin-top: 20px;">
        <a href="index.php" style="text-decoration: none;">
            <button style="padding: 10px 20px; font-size: 16px; background-color: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">
                Go back to Menu
            </button>
        </a>
    </div>
</div>

</body>
</html>
