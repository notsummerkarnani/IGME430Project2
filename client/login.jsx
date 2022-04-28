const helper = require('./helper.js');
const NavBar = require('./nav.jsx');
const Advertisement = require('./ad.jsx');

const navLinks = [
    {
        name: 'Login',
        href: '/login',
        id: 'loginButton'
    },
    {
        name: 'Sign Up',
        href: '/signup',
        id: 'signupButton'
    },
    {
        name: 'Change Password',
        href: '/changePass',
        id: 'changePassButton'
    }
];

//handles login req
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

//handles signup req
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

//handles password change req
const handleChangePass = (e)=>{
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
    if (pass === pass2) {
        helper.handleError('New password cannot be same as current password!');
        return false;
    }
    helper.sendPost(e.target.action, { username, pass, pass2, _csrf });
    return false;
}

//components
const LoginWindow = (props) => {
    return (

        <form id="loginForm"
            name="loginForm"
            onSubmit={handleLogin}
            action="/login"
            method="POST"
            className="form">

            <div className='bg notification is-primary field is-grouped level is-justify-content-center'>
                <label className='label is-size-4 pr-4' htmlFor="username">Username: </label>
                <div className='control'>
                    <input className="input" id="user" type="text" name="username" placeholder="username" />
                </div>
                <label className="label is-size-4 pr-4" htmlFor="pass">Password: </label>
                <div className='control'>
                    <input className="input" id="pass" type="password" name="pass" placeholder="password" />
                </div>
                <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
                <div className='control'>
                    <input className="button is-hoverable" type="submit" value="Sign in" />
                </div>
            </div>
        </form>
    );
};

const SignupWindow = (props) => {
    console.log(props);
    return (

        <form id={props.props.id}
            name={props.props.id}
            onSubmit={props.props.submit}
            action={props.props.action}
            method="POST"
            className="form">

            <div className='bg notification is-primary field columns is-vcentered'>
                <div className='column'>
                    <label className={props.props.labelClass} htmlFor={props.props.inputs[1].id} >{props.props.inputs[1].text} </label>
                    <div className='control'>
                        <input className={props.props.inputs[1].class} id={props.props.inputs[1].id} type={props.props.inputs[1].type} name={props.props.inputs[1].name} placeholder={props.props.inputs[1].name} />
                    </div>
                </div>
                <div className='column'>
                    <label className={props.props.labelClass} htmlFor={props.props.inputs[2].id} >{props.props.inputs[2].text} </label>
                    <div className='control'>
                        <input className={props.props.inputs[2].class} id={props.props.inputs[2].id} type={props.props.inputs[2].type} name={props.props.inputs[2].name} placeholder={props.props.inputs[2].name} />
                    </div>
                </div>
                <div className='column'>
                    <label className={props.props.labelClass} htmlFor={props.props.inputs[3].id} >{props.props.inputs[3].text} </label>
                    <div className='control'>
                        <input className={props.props.inputs[3].class} id={props.props.inputs[3].id} type={props.props.inputs[3].type} name={props.props.inputs[3].name} placeholder={props.props.inputs[3].name} />                
                    </div>
                </div>
                <div className='control'>
                    <input id="_csrf" type="hidden" name="_csrf" value={props.props.csrf} />
                    <input className={props.props.inputs[4].class} type={props.props.inputs[4].type} value={props.props.inputs[3].value} />
                </div>
            </div>

        </form>
    );
};
//components

const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();

    ReactDOM.render(<NavBar links={navLinks}/>, 
    document.getElementById('nav'));

    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');
    const changePassButton = document.getElementById('changePassButton');

    loginButton.classList.add('has-background-warning');
    loginButton.classList.add('has-text-black');


    loginButton.addEventListener('click',(e)=>{
        e.preventDefault();
        loginButton.classList.add('has-background-warning');
        signupButton.classList.remove('has-background-warning');
        changePassButton.classList.remove('has-background-warning');
        loginButton.classList.add('has-text-black');
        signupButton.classList.remove('has-text-black');
        changePassButton.classList.remove('has-text-black');      

        ReactDOM.render(<LoginWindow csrf={data.csrfToken}/>,
            document.getElementById('content'));
        return false;
    });

    signupButton.addEventListener('click',(e)=>{
        e.preventDefault();

        loginButton.classList.remove('has-background-warning');
        signupButton.classList.add('has-background-warning');
        changePassButton.classList.remove('has-background-warning'); 
        loginButton.classList.remove('has-text-black');
        signupButton.classList.add('has-text-black');
        changePassButton.classList.remove('has-text-black');     

        let props = {
            id:"signupForm",
            submit: handleSignup,
            action: "/signup",
            labelClass: 'label is-size-4 pr-4',
            inputs:{
                1: {
                name: 'username',
                text: 'Username: ',
                id: 'user',
                type: 'text',
                class: 'input'
                },
                2: {
                    name: 'password',
                    text: 'Password: ',
                    id: 'pass',
                    type: 'password',
                    class: 'input'
                },
                3: {
                    name: 'password',
                    text: 'Retype Password: ',
                    id: 'pass2',
                    type: 'password',
                    class: 'input'
                },
                4: {
                    type: 'submit',
                    value: 'Sign Up',
                    class: 'button is-hoverable'
                }
            },
            csrf: data.csrfToken,
        };

        ReactDOM.render(<SignupWindow props={props} />,
            document.getElementById('content'));
        return false;
    });

    changePassButton.addEventListener('click',(e)=>{
        e.preventDefault();

        loginButton.classList.remove('has-background-warning');
        signupButton.classList.remove('has-background-warning');
        changePassButton.classList.add('has-background-warning');
        loginButton.classList.remove('has-text-black');
        signupButton.classList.remove('has-text-black');
        changePassButton.classList.add('has-text-black');     

        let props = {
            id:"changePassForm",
            submit: handleChangePass,
            action: "/changePass",
            labelClass: 'label is-size-4 pr-4',
            inputs:{
                1: {
                name: 'username',
                text: 'Username: ',
                id: 'user',
                type: 'text',
                class: 'input'
                },
                2: {
                    name: 'password',
                    text: 'Current Password: ',
                    id: 'pass',
                    type: 'password',
                    class: 'input'
                },
                3: {
                    name: 'password',
                    text: 'New Password: ',
                    id: 'pass2',
                    type: 'password',
                    class: 'input'
                },
                4: {
                    type: 'submit',
                    value: 'Change Password',
                    class: 'button is-hoverable'
                }
            },
            csrf: data.csrfToken,
        };

        ReactDOM.render(<SignupWindow props={props} />,
            document.getElementById('content'));
        return false;
    });

    ReactDOM.render(<LoginWindow csrf={data.csrfToken} />,
    document.getElementById('content'));

    const advertisementNodes = document.querySelectorAll('#ad');
    for(let i = 0; i < advertisementNodes.length;i++){
        ReactDOM.render(
            <Advertisement href='assets/img/ad.jpeg' alt='placeholder advertisement'/>,
            advertisementNodes[i]
        );
    }
};


window.onload = init;