// Simulating a simple queue
let queue = [];

// Add event listener to the form for placing an order
document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form from reloading the page

    // Get customer details
    let customerName = document.getElementById('name').value;
    let customerOrder = document.getElementById('order').value;
    let guestCount = document.getElementById('guestCount').value;

    // Add customer to the queue
    let positionInQueue = queue.length + 1;
    queue.push({
        name: customerName,
        order: customerOrder || "Will order after seating",  // Handle if no pre-order is provided
        guests: guestCount,
        position: positionInQueue
    });

    // Display the queue status to the user
    let queueStatus = `Hi ${customerName}, your order for "${customerOrder || 'No pre-order'}" has been placed for ${guestCount} guests. You are number ${positionInQueue} in the queue.`;
    document.getElementById('queueStatus').innerText = queueStatus;

    // Clear the form
    document.getElementById('orderForm').reset();

    // Simulate queue updates and waiting time
    simulateQueueUpdates();
});

// Add event listener for "Order in Advance" button
document.getElementById('preOrderBtn').addEventListener('click', function() {
    var menuForm = document.getElementById('menuForm');
    if (menuForm.style.display === "none") {
        menuForm.style.display = "block";
    } else {
        menuForm.style.display = "none";
    }
});

// Handle the pre-order submission
document.getElementById('submitOrder').addEventListener('click', function() {
    var orderDetails = document.getElementById('orderDetails').value;
    if (orderDetails) {
        document.getElementById('order').value = orderDetails;  // Set the order in the form
        alert("Your pre-order has been submitted.");
        document.getElementById('menuForm').style.display = "none";  // Hide the pre-order form
    } else {
        alert("Please enter your order.");
    }
});

// Function to simulate real-time queue updates
function simulateQueueUpdates() {
    setTimeout(function() {
        if (queue.length > 0) {
            let servedCustomer = queue.shift();  // Simulate serving the first customer
            alert(`${servedCustomer.name}, your table for ${servedCustomer.guests} guests is ready!`);
            document.getElementById('queueStatus').innerText = `Your table is ready! Thank you for your order.`;

            // Update queue positions for remaining customers
            queue.forEach((customer, index) => {
                customer.position = index + 1;  // Update position in queue
            });

            // If there are still customers in the queue, update their status
            if (queue.length > 0) {
                let nextCustomer = queue[0];
                document.getElementById('queueStatus').innerText = `Hi ${nextCustomer.name}, you are now number 1 in the queue. Estimated wait time: 5 minutes.`;
            } else {
                document.getElementById('queueStatus').innerText = "No one left in the queue.";
            }

            // Continue updating the queue
            simulateQueueUpdates();
        }
    }, 5000);  // Simulate a 5-second wait before serving the next customer
}

// Placeholder for future Google Maps integration
function calculateDriveTime() {
    // This will be integrated with Google Maps API to calculate drive time
    return "Drive time feature coming soon!";
}
