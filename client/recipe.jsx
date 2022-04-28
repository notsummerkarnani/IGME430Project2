const helper = require('./helper.js');
const NavBar = require('./nav.jsx');
const Advertisement = require('./ad.jsx');
const RecipeList = require('./recipelist.jsx');


const navLinks = [
    {
        name: 'Pantry',
        href: '/maker',
        id: 'makerButton'
    },
    {
        name: 'Search Recipes',
        href: '/recipePage',
        id: 'recipePageButton'
    },
    {
        name: 'Logout',
        href: '/logout',
        id: 'logoutButton'
    }
];

//Start of react components
const RecipeForm = (props)=>{
    return(
        <form action="/searchRecipe"
            id="searchRecipeForm"
            name="searchRecipeForm"
            onSubmit={searchRecipes}
            method="POST"
            className='form'>

            <div className='bg notification is-primary field is-grouped level is-justify-content-center'>
                <label className='label is-size-4 pr-4' htmlFor="recipeInput">Recipe Name:</label>
                <div className='control'>
                    <input className='input' type="text" name="recipeInput" id="recipeInput" placeholder='Recipe Name' />
                </div>
                <div className='control'>
                    <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
                    <input className="button is-hoverable" type="submit" value="Search Recipe" />
                </div>
            </div>
        </form>
    )
}
//end of react components
const searchRecipes = (e)=>{
    e.preventDefault();
    helper.hideError();

    const _csrf = document.querySelector('#_csrf').value;
    const name = document.querySelector('#recipeInput').value;

    if(!name){
        helper.handleError('Recipe name is required!');
        return false;
    }

    helper.sendPost(e.target.action, {_csrf: _csrf, name: name}, handleRecipes)
}

//handles recipe search request
const handleRecipes = (e)=>{
    ReactDOM.render(
        <RecipeList meals={e}/>,
        document.getElementById('recipes')
    );
}

const init = async()=>{
    const response = await fetch('/getToken');
    const data = await response.json();

    ReactDOM.render(<NavBar links={navLinks}/>, 
    document.getElementById('nav'));

    ReactDOM.render(
        <RecipeForm csrf={data.csrfToken}/>,
        document.getElementById('searchRecipe')
    );

    const advertisementNodes = document.querySelectorAll('#ad');
    for(let i = 0; i < advertisementNodes.length;i++){
            ReactDOM.render(
                <Advertisement href='assets/img/ad.jpeg' alt='placeholder advertisement'/>,
                advertisementNodes[i]
            );
    }
}

window.onload = init;