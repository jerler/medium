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
