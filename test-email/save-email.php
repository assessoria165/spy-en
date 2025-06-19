<?php
// Headers for accepting external POST requests (CORS and JSON)
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Allow only POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

// Function to sanitize input data
function sanitize($value) {
    return htmlspecialchars(strip_tags(trim($value)));
}

// Capture email sent via POST
$input = json_decode(file_get_contents('php://input'), true);
$email = isset($input['email']) ? sanitize($input['email']) : '';

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address']);
    exit;
}

// Webhook configuration
$webhook_url = 'https://get.emailserverside.com/webhook/0038a50f946e2e84acf31a09a41ba0600725a735f64c860f26bb5370a7e8dc36';
$tag = 'quiz-nome';

// Data to send to the webhook
$data = [
    'email' => $email,
    'tag' => $tag
];

// Send data to webhook
$ch = curl_init($webhook_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Check for webhook response
if ($http_code < 200 || $http_code >= 300) {
    http_response_code($http_code);
    echo json_encode([
        'error' => 'Failed to register email with webhook',
        'details' => json_decode($response, true) ?: 'No response details available'
    ]);
    exit;
}

// Success response
echo json_encode([
    'success' => true
]);
?>
