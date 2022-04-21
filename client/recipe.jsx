const helper = require('./helper.js');

const navLinks = [
    {
        name: 'Pantry',
        href: '/maker',
        id: 'makerButton'
    },
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

const RecipeList = (props)=>{
    console.log(props);

    if (props.meals.length === 0) {
        return (
            <div className="recipeList">
                <h3 className="emptyRecipe">No Recipes Found!</h3>
            </div>
        );
    }

    const recipeNodes = props.meals.map(recipe => {

        const ingredientNodes = recipe.ingredients.map((ingredient, index)=>{
           return(
               <li key={index}>{ingredient}</li>
           ); 
        });

        return (
            <div key={recipe.id} id={recipe.id} className="recipe">
                <img src={recipe.thumbnail} alt="Meal Image" />
                <h2 className="recipeName">{recipe.name}</h2>
                <h3 className="recipeCategory">Category:{recipe.category}</h3>
                <div className='recipeIngredients'>
                    <h3>Ingredients:</h3>
                    <ul>{ingredientNodes}</ul>
                </div>
                <h3>Instructions: </h3><p>{recipe.instructions}</p>
                <h3>Youtube Link: <a href={recipe.youtube}>{recipe.youtube}</a></h3>
            </div>
        );
    });

    return (
        <div className="recipeList">
            {recipeNodes}
        </div>
    );
}

const searchRecipes = (e)=>{
    e.preventDefault();
    helper.hideError();

    const _csrf = document.querySelector('#_csrf').value;
    const name = document.querySelector('#recipeInput').value;

    helper.sendPost(e.target.action, {_csrf: _csrf, name: name}, handleRecipes)
}

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
}

window.onload = init;