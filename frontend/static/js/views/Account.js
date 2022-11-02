import ViewScaffold from "./ViewScaffold.js"

export default class extends ViewScaffold {
    constructor() {
        super();
        this.setTitle("Account Settings")
    }

    async getHtml() {
        
        let isLoggedIn = sessionStorage.getItem('loggedIn')
        
        if (isLoggedIn == 'false' || isLoggedIn == 'undefined') {
            return `
            <h1>Account Settings</h1>
            <h3>Login</h3>
            <form method="post" id="loginForm">
                <div class="field">
                    <label for="username">Username:</label>
                    <input type="input" id="username"  name="username" placeholder="Name">
                    <small></small>
                </div>
                <div class="field">
                    <label for="password">Password:</label>
                    <input type="input" id="password" name="password" placeholder="Password">
                    <small></small>
                </div>
                <button type="submit" id="login-btn">Log In</button>
            </form>
            `;
        } else {
            return `
                <h1>Account Settings</h1>
                <h3>Profile</h3>
                <div>
                    Name: ${sessionStorage.getItem('username')}
                </div>
                <div>
                    Address: Placeholder text.
                </div>
                <div>
                    City: Placeholder text.
                </div>
                <div>
                    State:          Zip: 
                </div>
                
                
            `
        }
    }

    // set session variables
    login(loggedIn, username) {
        sessionStorage.setItem('username', username)
        sessionStorage.setItem('loggedIn', loggedIn)

        let navMenu = document.querySelector('.nav')
        let loginEl = document.createElement('a')

        loginEl.href = '#'
        loginEl.id = 'logout-btn'
        loginEl.className = 'nav-link'
        loginEl.innerText = 'Logout'
        navMenu.appendChild(loginEl)
    }
}
