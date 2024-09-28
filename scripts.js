// JavaScript dictionary of valid passcodes
const validPasscodes = {
    '5A3B9': 'A boisterous voice calls out from the darkness: “A magnificent hat for magnificent fame - work hard so the world will remember your name! And beware those who twist thoughts for selfish gain...”',
    'D47F1': 'A soft voice warms your heart: "The past is a chain that only you can unlock. But some links are stronger than they seem." As the voice quiets, you see images chained together... a young Sue Dini playing with their younger sibling at the circus, a lion with a bushy mane, Sue Dini’s family singing around a birthday cake, a roaring fire, Sue Dini escaping the burning canopy, and unmistakably, Sue Dini’s younger sibling also making it to safety.',
    'B2C8E': 'A squeaking voice bubbles through the darkness: “You’ve spent a lifetime mastering minds, but maybe it’s time to trust your heart. Some things can’t be controlled—only felt.”',
    '8F9A2': 'A somber voice whispers through the darkness: “Beware the tangled web you weave, where shadows lurk and liars grieve. The path you walk is not your own, our blood runs deep—you’re not alone. Turn back before it’s far too late, for power gained may seal your fate.”',
    '3D6E7': 'A husky voice beckons from the darkness: “The cards may be stacked, kiddo, but it’s how you play ‘em that paves your fate. Your heart suits you well—it’s always been in the right place. You’ve been the ace up our sleeve, and we’re proud of you for that.”',
    '1AF4B': 'A honey voice echos in the darkness: "A blade is only as sharp as the will that wields it..." But as the voice fades away you see several images, coming quickly in a dizzying array - a circus tent, a lion roaring, and a long pause as a thin candle flickers and falls onto the ground, catching rope on fire which quickly spreads to the canopy. Then darkness again as the images leave you”',
    'E90C3': 'A crackly voice chippers from the void: “You simply... cannot fathom... the amount of cocaine I have brewed with this spoon. Dearie, don’t take life too seriously”',
    '4B5DA': 'A warm voice calls from the darkness: “My darling Ellie, if it ain’t broke we’ll be sure to break it eh? Trust your gut and maybe be cautious with those Buskers...',
    'C7E3F': 'A somber voice calls out to you in the darkness: “you and your brother were always destined for greatness. Don’t let the tragedies you’ve survived mask your future. It’s time to let go of old shadows and step into the light where you belong.”',
    'A68F2': 'A loving voice calls out: "Your family’s pride burns brighter than any flame. Let go of the ashes, and carry their light forward"',
    'TEST' : 'Hey Izzy! This is where your magic message will appear'
};


function checkAccessCode() {
    // Get the value from the input field
    const enteredCode = document.getElementById("accessCodeInput").value.toUpperCase();

    // Check if the entered code exists in the dictionary
    if (validPasscodes[enteredCode]) {
        // Hide the candle by fading it out
        const candle = document.getElementById("candle");
        candle.style.opacity = 0;

        // After the fade-out is complete (1s), hide the candle and show the message
        setTimeout(() => {
            candle.classList.add('hidden');  // Hide the candle fully
            const resultMessage = document.getElementById("resultMessage");
            resultMessage.textContent = validPasscodes[enteredCode];
            resultMessage.classList.remove('hidden');  // Show the message div
            resultMessage.classList.add('show');  // Trigger fade-in effect
        }, 1000);  // Match the CSS transition duration (1s)
    } else {
         // Show an error message
        const resultMessage = document.getElementById("resultMessage");
        resultMessage.textContent = "Nothing can be heard";
        resultMessage.classList.remove('hidden');
        resultMessage.classList.add('show');
        resultMessage.style.color = 'red';
    }
}

// Function to check password and log in the user
function checkPassword() {
    const enteredPassword = document.getElementById("passwordInput").value.toUpperCase();
    if (enteredPassword === "VEILPARTING") {
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
