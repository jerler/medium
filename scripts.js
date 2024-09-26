// JavaScript dictionary of valid passcodes
const validPasscodes = {
    '12345': 'Welcome!',
    'password1': 'Access Granted',
    'open-sesame': 'You have entered the secret door'
};

function checkAccessCode() {
    // Get the value from the input field
    const enteredCode = document.getElementById("accessCodeInput").value;

    // Check if the entered code exists in the dictionary
    if (validPasscodes[enteredCode]) {
        document.getElementById("resultMessage").textContent = validPasscodes[enteredCode];
        document.getElementById("resultMessage").style.color = 'green';
    } else {
        document.getElementById("resultMessage").textContent = "Invalid code. Try again!";
        document.getElementById("resultMessage").style.color = 'red';
    }
}

// Function to check password and log in the user
function checkPassword() {
    const enteredPassword = document.getElementById("passwordInput").value;
    if (enteredPassword === "PartingTheVeil") {
        // Store a flag in localStorage to mark as authenticated
        localStorage.setItem("authenticated", "true");

        // Store the current timestamp
        localStorage.setItem("loginTime", Date.now().toString());

        // Redirect to the summon page
        window.location.href = "summon.html";
    } else {
        alert("Incorrect password. Try again.");
    }
}

// Function to check if the session has expired
function checkSessionTimeout() {
    const authenticated = localStorage.getItem("authenticated");
    const loginTime = localStorage.getItem("loginTime");

    if (authenticated !== "true" || !loginTime) {
        // If not authenticated or login time is missing, redirect to login
        window.location.href = "index.html";
    } else {
        // Calculate how much time has passed since login
        const currentTime = Date.now();
        const elapsedTime = currentTime - parseInt(loginTime);

        // Check if more than 5 minutes (300,000 ms) have passed
        if (elapsedTime > 300000) {  // 300,000 ms = 5 minutes
            // If session expired, log the user out
            localStorage.removeItem("authenticated");
            localStorage.removeItem("loginTime");
            alert("Session expired. Please log in again.");
            window.location.href = "index.html";
        }
    }
}

// Reset the timer on user activity (optional)
function resetLoginTime() {
    localStorage.setItem("loginTime", Date.now().toString());
}

// Check session timeout on page load for the summon page
if (window.location.pathname.includes("summon.html")) {
    checkSessionTimeout();
    // Optional: Check session timeout at intervals to keep the check active
    setInterval(checkSessionTimeout, 60000);  // Check every 60 seconds

    // Reset login time on mouse or keyboard activity
    document.addEventListener('mousemove', resetLoginTime);
    document.addEventListener('keydown', resetLoginTime);
}

