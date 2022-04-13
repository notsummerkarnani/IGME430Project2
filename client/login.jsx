const helper = require('./helper.js');

const navLinks = [
    {
        name: 'login',
        href: '/login',
        id: 'loginButton'
    },
    {
        name: 'signup',
        href: '/signup',
        id: 'signupButton'
    }
]

const handleLogin = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    if (!username || !pass) {
        helper.handleError('Username or password is empty!');
        return false;
    }

    helper.sendPost(e.target.action, { username, pass, _csrf });
    return false;
}

const handleSignup = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const pass2 = e.target.querySelector('#pass2').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    if (!username || !pass || !pass2) {
        helper.handleError('All fields are required');
        return false;
    }
    if (pass !== pass2) {
        helper.handleError('Passwords do not match!');
        return false;
    }
    helper.sendPost(e.target.action, { username, pass, pass2, _csrf });
    return false;
}


const NavBar = (props)=>{
    const navNodes = props.links.map(link=>{
    return(
        <div className="navlink"><a id={link.id} href={link.href}>{link.name}</a></div>
    )
    });

    return(
        <nav id="navbar">
            {navNodes}
        </nav>
    )
}


//Since this is a simple component that will not update when the user
//types into it, we will make a “functional stateless component” or FSC
const LoginWindow = (props) => {
    return (

        <form id="loginForm"
            name="loginForm"
            onSubmit={handleLogin}
            action="/login"
            method="POST"
            className="mainForm">

            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username" />
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password" />
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <input className="formSubmit" type="submit" value="Sign in" />
        </form>
    );
};

const SignupWindow = (props) => {
    return (

        <form id="signupForm"
            name="signupForm"
            onSubmit={handleSignup}
            action="/signup"
            method="POST"
            className="mainForm"
        >
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username" />
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password" />
            <label htmlFor="pass2">Password: </label>
            <input id="pass2" type="password" name="pass2" placeholder="retype password" />
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <input className="formSubmit" type="submit" value="Sign in" />

        </form>
    );
};

const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();

    ReactDOM.render(<NavBar links={navLinks}/>, 
    document.getElementById('nav'));

    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');

    loginButton.addEventListener('click',(e)=>{
        e.preventDefault();
        ReactDOM.render(<LoginWindow csrf={data.csrfToken}/>,
            document.getElementById('content'));
        return false;
    });

    signupButton.addEventListener('click',(e)=>{
        e.preventDefault();
        ReactDOM.render(<SignupWindow csrf={data.csrfToken} />,
            document.getElementById('content'));
        return false;
    });

    ReactDOM.render(<LoginWindow csrf={data.csrfToken} />,
        document.getElementById('content'));
};


window.onload = init;