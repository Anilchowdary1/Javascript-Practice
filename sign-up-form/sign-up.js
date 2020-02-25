const signupForm = document.getElementById('signupForm');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const mobileNumber = document.getElementById('mobile-number');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const color1 = document.getElementById('color1');
const color2 = document.getElementById('color2');
const male = document.getElementById('male');
const female = document.getElementById('female');
const otherGender = document.getElementById('otherGender');
const branch = document.getElementById('branch');
const dob = document.getElementById('dob');
const slider = document.getElementById('slider');
const typingSpeed = document.getElementById('typing-speed');
const termsAndConditions = document.getElementById('terms-conditions');
const submitButton = document.getElementById('submit');
const address = document.getElementById('address');
const form = document.getElementById('form');
const toast = document.getElementById("toast");
const namePattern = /^[A-Za-z]+$/;
const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])/;
let user = {};

color2.onchange = (event) => { changeBackgroundColors(color1, color2) };
color1.onchange = (event) => { changeBackgroundColors(color1, color2) };
firstName.onblur = (event) => { validateFormField(event.target, namePattern, `First Name`, `Name should contain alphabets only!`) };
lastName.onblur = (event) => { validateFormField(event.target, namePattern, `Last Name`, `Name should contain alphabets only!`) };
mobileNumber.onblur = (event) => { validateFormField(event.target, /^[0-9]{10}$/, `Mobile Number`, `Mobile number should contain 10 digits only!`) };
email.onblur = (event) => { validateFormField(event.target, mailFormat, `Email`, `Enter Valid Email!`) };
password.onblur = (event) => { validateFormField(event.target, passwordFormat, `Password`, `Enter atleast 1 lowercase letter,1 uppercase letter!`) };
confirmPassword.onblur = (event) => { matchConfirmPassword(event.target) };
//branch.onblur = (event) => { selectBranch(branch) };
dob.onblur = (event) => { validateDateOfBirth(event.target) };
slider.oninput = (event) => { changeTypingSpeed(event.target) };
submitButton.onclick = (event) => { submitForm() };

function submitForm() {
    if (isGenderSelected()) {
        if (Object.keys(user).length === 7) {
            if (isTermsChecked()) {
                selectBranch();
                addAddresstoUser();
                addTypingSpeedtoUser();
                console.log(user);
                alert('Submitted!');
                user = {};
                form.reset();
            }
        }
        else {
            displayError(`Please fill all required fields!`);
        }
    }


}

function changeBackgroundColors(color1, color2) {
    signupForm.style.backgroundImage = `linear-gradient(-90deg,${color2.value},${color1.value})`;
}

function displayError(errorMessage) {
    toast.children[0].innerHTML = errorMessage;
    toast.className = "show";
    setTimeout(function() { toast.className = toast.className.replace("show", ""); }, 1500);

}

function setBorderColor(target, color) {
    target.style.borderColor = color;
}

function validateFormField(target, pattern, key, errorMessage) {
    if (target.value.match(pattern)) {
        user[key] = target.value;
        setBorderColor(target, `white`);
        return true;
    }
    else {
        delete user[key];
        displayError(errorMessage);
        setBorderColor(target, `red`);
        return false;
    }
}

function matchConfirmPassword(target) {
    if (target.value === password.value) {
        setBorderColor(target, `white`)
        return true;
    }
    else {
        displayError(`Password isn't matching!`);
        setBorderColor(target, `red`)
        return false;
    }
}

function isGenderSelected() {
    if (male.checked) {
        user.Gender = male.value;
        return true;
    }
    else if (female.checked) {
        user.Gender = female.value;
        return true;
    }
    else if (otherGender.checked) {
        user.Gender = `Other`;
        return true;
    }
    else {
        displayError(`Please fill all required fields!`);
        return false;
    }
}

function selectBranch() {
    user.Branch = branch.options[branch.selectedIndex].text;
    return true;
}

function validateDateOfBirth(target) {
    let datePattern = target.value.split('-');
    if (datePattern[0] >= 2002) {
        user.DateOfBirth = target.value;
        setBorderColor(target, `green`);
        return true;
    }
    else {
        displayError(`Enter Valid date!`);
        setBorderColor(target, `red`);
        return false;
    }
}

function addAddresstoUser() {
    if (address.value != '') {
        user.Address = address.value;
    }
}

function changeTypingSpeed(target) {
    typingSpeed.innerHTML = target.value;
    return true;
}

function addTypingSpeedtoUser() {
    user.TypingSpeed = slider.value;
}

function isTermsChecked() {
    if (termsAndConditions.checked) {
        return true;
    }
    else {
        displayError(`Please accept terms and conditions!`);
        return false;
    }
}
