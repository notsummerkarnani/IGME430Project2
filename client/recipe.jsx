const helper = require('./helper.js');

const navLinks = [
    {
        name: 'Logout',
        href: '/logout',
        id: 'logoutButton'
    }
];

const NavBar = (props)=>{
    const navNodes = props.links.map((link, index)=>{
    return(
        <div key={index} className="navlink"><a id={link.id} href={link.href}>{link.name}</a></div>
    )
    });

    return(
        <nav id="navbar">
            {navNodes}
        </nav>
    )
}

const RecipeForm = (props)=>{
    return(
        <form action="/searchRecipe"
            id="searchRecipeForm"
            name="searchRecipeForm"
            onSubmit={searchRecipes}
            method="POST"
            className='RecipeForm'>

            <label htmlFor="recipeInput">Recipe Name: </label>
            <input type="text" name="recipeInput" id="recipeInput" placeholder='Recipe Name' />

            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />

            <input className="searchRecipeSubmit" type="submit" value="Search Recipe" />
        </form>
    )
}

const searchRecipes = (e)=>{
    e.preventDefault();
    helper.hideError();

    const _csrf = document.querySelector('#_csrf').value;
    const name = document.querySelector('#recipeInput').value;

    helper.sendPost(e.target.action, {_csrf: _csrf, name: name}, handleRecipes)
}

const handleRecipes = (e)=>{

}