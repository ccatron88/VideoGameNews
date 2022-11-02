import Home from "./views/Home.js";
import Daily from "./views/Daily.js"
import Account from "./views/Account.js"

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
}

const router = async () => {
    const routes = [
        { path: "/", view: Home },
        { path: "/daily", view: Daily },
        { path: "/account", view: Account }
    ];
    
    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

    if (!match) {
        match = {
            route: routes[0],
            isMatch: true
        }
    }

    const view = new match.route.view();

    document.querySelector("#app").innerHTML = await view.getHtml()

    let loggedIn = false;
    let form = document.getElementById("loginForm")
    let username
    const username_required = "Please enter your name.";
    const password_required = "Please enter your password.";
    const password_invalid = "Please enter a password with at least 1 capital, 1 number, and one character.";

    // listen for login and set session variables
    document.addEventListener('click', async function(e) {
        if (e.target.id === 'login-btn') {
            e.preventDefault()

            let usernameIsValid = hasValue(form.elements['username'], username_required)
            let passwordIsValid = isValidField(form.elements['password'],password_required, password_invalid)

            if (usernameIsValid && passwordIsValid) {
                loggedIn = !loggedIn
                username = form.elements['username'].value
                view.login(loggedIn, username)
                document.querySelector("#app").innerHTML = await view.getHtml();
            }
        }
        if(e.target.id === 'logout-btn') {
            logout(view)
        }
    })
    
};

window.addEventListener('popstate', router)

// Check if page is loaded and call router()
if (document.readyState !== 'loading') {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    })
    router();
} else {
    document.addEventListener("DOMContentLoaded", () => {
        document.body.addEventListener("click", e => {
            if (e.target.matches("[data-link]")) {
                e.preventDefault();
                navigateTo(e.target.href);
            }
        })
        router();
    });
}

function logout(view) {
    sessionStorage.setItem('username', undefined)
    sessionStorage.setItem('loggedIn', false)

    let navMenu = document.querySelector('.nav')
    let loginEl = document.getElementById('logout-btn')

    navMenu.removeChild(loginEl)
    location.reload()
    view.getHtml()
}

function formMessage(input, message, checkValue) {
    // select the "small" element
    const msg = input.parentNode.querySelector('small')

    // set small element message
    msg.innerText = message;

    // add class for input depending on validation
    input.className = checkValue ? 'success' : 'error'

    return checkValue
}

function errorMessage(input, message) {
    return formMessage(input, message, false)
}

function successMessage(input) {
    return formMessage(input, '', true)
}

function hasValue(input, message) {
    if (input.value.trim() === "") {
        return errorMessage(input, message)
    }
    return successMessage(input)
}

function isValidField(input, requiredMsg, invalidMsg) {
    // check if field has a value
    if (!hasValue(input, requiredMsg)) {
        return false;
    }

    const passRegex = /[A-Za-z0-9]/
    const password = input.value.trim()
    
    if (!passRegex.test(password)) {
        return errorMessage(input, invalidMsg)
    }
    return true
}