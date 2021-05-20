const pronouns = document.querySelector('#pronouns');
const firstName = document.querySelector('#first-name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');
const termsYes = document.querySelector('#terms-yes');
const termsNo = document.querySelector('#terms-no');
const submit = document.querySelector('.submit');

let currentErr = [];

validateForm = (e) => {
    e.preventDefault();

    // clear all errors
    removeErr(currentErr);

    currentErr = [];

    const nameReg = /^[a-zA-Z]+$/
    const emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passReg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

    // pronouns error
    if (pronouns.value == 'none') {
        currentErr.push({id: 'pronouns', message: 'Please select an option.'});
    }

    // name error
    if (firstName.value == '' || (!nameReg.test(firstName.value))) {
        currentErr.push({id: 'first-name', message: 'Please enter your first name. No numbers or special characters.'});
    }

    // email error
    if (email.value == '' || (!emailReg.test(email.value))) {
        currentErr.push({id: 'email', message: 'Please enter a valid email.'});
    }

    // password error
    if (password.value == '' || (!passReg.test(password.value))) {
        currentErr.push({id: 'password', message: 'Please enter a valid password. Minimum eight characters, at least one upper case letter, one lower case letter, one number and one special character'});
    }

    // confirm password error
    if (confirmPassword.value == '' || (confirmPassword.value !== password.value)) {
        currentErr.push({id: 'confirm-password', message: 'Please try again. Passwords do not match.'});
    }

    // privacy error
    if ((!termsYes.checked && !termsNo.checked) || termsNo.checked) {
        currentErr.push({id: 'privacy', message: 'Please read and agree to the terms.'});
    }

    if (currentErr.length > 0) {
        displayErr(currentErr);
        countErr(currentErr);
        return false;
    } else {
        const form = document.querySelector('#register');
        form.reset();
        alert('Form submitted. Thank you!')
        return true;
    }

}

displayErr = (errs) => {
    // create message for all current errors
    errs.forEach( (error) => {
        const newEle = document.querySelector(`.${error.id}`);
        const node = document.createElement('p');
        node.setAttribute('class', 'err');
        node.innerHTML = `${error.message}`;
        newEle.append(node);
    })
}

removeErr = (errs) => {
    // remove errors
    errs.forEach((error) => {
        const element = document.querySelector(`.${error.id}`);
        if(typeof(element) != 'undefined' && element != null){
            element.innerHTML = '';
        }
    })

    // remove submit error
    if(typeof(submit) != 'undefined' && submit != null){
        submit.innerHTML = '';
    }
}

countErr = (errs) => {
    const str = errs.map((error) => error.id).join(', ');

    // submit error message with error count
    const nodeSubmit = document.createElement('p');
    nodeSubmit.setAttribute('class', 'submit-err');
    if (errs.length == 1) {
        nodeSubmit.innerHTML = `Please fix 1 error to submit: ${str}`;
        submit.append(nodeSubmit);
    } else if (errs.length > 1) {
        nodeSubmit.innerHTML = `Please fix ${errs.length} errors to submit: ${str}`;
        submit.append(nodeSubmit);
    }
}

const submitButton = document.querySelector("#submit");
submitButton.addEventListener('click', validateForm);