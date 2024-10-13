// Simulating a simple queue
let queue = [];

// Add event listener to the form
document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form from reloading the page

    // Get customer details
    let customerName = document.getElementById('name').value;
    let customerOrder = document.getElementById('order').value;

    // Add customer to the queue
    let positionInQueue = queue.length + 1;
    queue.push({
        name: customerName,
        order: customerOrder,
        position: positionInQueue
    });

    // Display the queue status to the user
    let queueStatus = `Hi ${customerName}, your test order for "${customerOrder}" has been placed. You are number ${positionInQueue} in the queue.`;
    document.getElementById('queueStatus').innerText = queueStatus;

    // Clear the form
    document.getElementById('orderForm').reset();

    // Simulate updates (optional)
    simulateQueueUpdates();
});

// Function to simulate real-time queue updates
function simulateQueueUpdates() {
    setTimeout(function() {
        if (queue.length > 0) {
            let servedCustomer = queue.shift();  // Simulate serving a customer
            alert(`${servedCustomer.name}, your table is ready!`);
            document.getElementById('queueStatus').innerText = `Your table is ready! Thank you for your order.`;
        }
    }, 5000); // Simulate a 5-second wait before serving
}
