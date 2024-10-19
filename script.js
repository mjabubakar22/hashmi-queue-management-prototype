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

// Elements
const emailBtn = document.getElementById('emailBtn');
const smsBtn = document.getElementById('smsBtn');
const whatsappBtn = document.getElementById('whatsappBtn');
const emailForm = document.getElementById('emailForm');
const smsForm = document.getElementById('smsForm');
const whatsappForm = document.getElementById('whatsappForm');
const confirmationMessage = document.getElementById('confirmationMessage');

// Handle Email button click
emailBtn.addEventListener('click', function() {
    hideAllForms();
    emailForm.style.display = 'block';
});

// Handle SMS button click
smsBtn.addEventListener('click', function() {
    hideAllForms();
    smsForm.style.display = 'block';
});

// Handle WhatsApp button click
whatsappBtn.addEventListener('click', function() {
    hideAllForms();
    whatsappForm.style.display = 'block';
});

// Function to hide all forms
function hideAllForms() {
    emailForm.style.display = 'none';
    smsForm.style.display = 'none';
    whatsappForm.style.display = 'none';
    confirmationMessage.style.display = 'none';
}

// Handle Email submission
document.getElementById('submitEmail').addEventListener('click', function() {
    const email = document.getElementById('emailInput').value;
    if (validateEmail(email)) {
        showConfirmation();
        // Call function to send email updates (email service integration required)
        sendLiveUpdates(email, 'email');
    } else {
        alert("Please enter a valid email address.");
    }
});

// Handle SMS submission
document.getElementById('submitSMS').addEventListener('click', function() {
    const phone = document.getElementById('smsInput').value;
    if (validatePhoneNumber(phone)) {
        showConfirmation();
        // Call function to send SMS updates (SMS service integration required)
        sendLiveUpdates(phone, 'sms');
    } else {
        alert("Please enter a valid phone number.");
    }
});

// Handle WhatsApp submission
document.getElementById('submitWhatsApp').addEventListener('click', function() {
    const whatsappNumber = document.getElementById('whatsappInput').value;
    if (validatePhoneNumber(whatsappNumber)) {
        showConfirmation();
        // Call function to send WhatsApp updates (WhatsApp API integration required)
        sendLiveUpdates(whatsappNumber, 'whatsapp');
    } else {
        alert("Please enter a valid WhatsApp number.");
    }
});

// Show confirmation message
function showConfirmation() {
    hideAllForms();
    confirmationMessage.style.display = 'block';
}

// Email validation function
function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

// Phone number validation function
function validatePhoneNumber(phone) {
    const re = /^[0-9]{10,}$/;
    return re.test(phone);
}

// Function to send live updates (placeholder for integration with email/SMS/WhatsApp services)
function sendLiveUpdates(contactInfo, method) {
    // Placeholder for future integration with backend services for sending updates
    console.log(`Sending live updates to ${contactInfo} via ${method}`);
}

window.addEventListener('beforeunload', function (e) {
    var confirmationMessage = 'You will continue receiving live updates via your selected contact method.';
    e.returnValue = confirmationMessage;  // For most browsers
    return confirmationMessage;  // For Chrome
});
