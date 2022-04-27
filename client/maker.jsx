const helper = require('./helper.js');
const NavBar = require('./nav.jsx');
const Advertisement = require('./ad.jsx');


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

//start of react components
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

const IngredientForm = (props) => {
    return (
        <form id="ingredientForm"
            name="ingredientForm"
            onSubmit={handleIngredient}
            action="/maker"
            method="POST"
            className="ingredientForm">

            <label htmlFor="name">Name: </label>
            <input id="ingredientName" type="text" name="name" placeholder="Ingredient Name" />
            <label htmlFor="category">Category: </label>
            <select name="ingredientCategory" id="ingredientCategory" defaultValue="miscellaneous">
                <option value='canned goods'>canned goods</option>
                <option value='condiments'>condiments</option>
                <option value='produce'>produce</option>
                <option value='meats'>meats</option>
                <option value='dairy'>dairy</option>
                <option value='breakfast'>breakfast</option>
                <option value='pasta and rice'>pasta and rice</option>
                <option value='microwave'>microwave</option>
                <option value='beverages'>beverages</option>
                <option value='bakery'>bakery</option>
                <option value='oils'>oils</option>
                <option value='miscellaneous'>miscellaneous</option>
            </select>
        
            <label htmlFor="quantity">Quantity: </label>
            <input id="ingredientQuantity" type="number" min="0" name="quantity" />

            <select name="ingredientMeasurement" id="ingredientMeasurement">
                <option value="cups">cups</option>
                <option value="fl oz">fluid ounces</option>
                <option value="grams">grams</option>
                <option value="lbs">lbs</option>
                <option value="units">units</option>
                <option value="bunch">bunch</option>
            </select>

            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />

            <input className="makeIngredientSubmit" type="submit" value="Make Ingredient" />
        </form>
    );
}

const IngredientList = (props) => {
    if (props.ingredients.length === 0) {
        return (
            <div className="ingredientList">
                <h3 className="emptyIngredient">No Ingredients yet!</h3>
            </div>
        );
    }

    const ingredientNodes = props.ingredients.map(ingredient => {
        return (
            <div key={ingredient._id} id={ingredient._id} className="ingredient">
                <form action="/deleteIngredient"
                    name="deleteIngredientForm"
                    id="deleteIngredientForm"
                    method="POST"
                    className="ingredientForm"
                    onSubmit={deleteIngredient}>

                    <input type="submit" name="deleteIngredientSubmit" id="deleteIngredientSubmit" value=" X " />
                </form>

                <form id="recipeFinder"
                    name="recipeFinder"
                    action="/findRecipe"
                    onSubmit={getRecipe}
                    method="POST"
                    className="ingredientForm">

                    <input className="findRecipeButton" type="submit" value="Find Recipes" />
                </form>
                
                <h3 className="ingredientName">{ingredient.name}</h3>
                <h3 className="ingredientCategory">Category:{ingredient.category}</h3>
                <h3 className="ingredientQuantity">Quantity:{ingredient.quantity} {ingredient.measurement}</h3>
                <div className='IngredientRecipes'></div>
            </div>
        );
    });

    return (
        <div className="ingredientList">

            <form id="ingredientClearer"
                name="ingredientClearer"
                action="/clearIngredients"
                onSubmit={clearIngredient}
                method="POST"
                className="ingredientForm">

                <input className="clearIngredientsSubmit" type="submit" value="Clear Ingredients" />
            </form>

            {ingredientNodes}
        </div>
    );
}
//end of react components


const handleIngredient = (e) => {
    e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector('#ingredientName').value;
    const category = e.target.querySelector('#ingredientCategory').value;
    const quantity = e.target.querySelector('#ingredientQuantity').value;
    const measurement = e.target.querySelector('#ingredientMeasurement').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    if (!name || !category || !quantity) {
        helper.handleError('All fields are required!');
        return false;
    }

    helper.sendPost(e.target.action, { name, category,quantity, measurement, _csrf },loadIngredientsFromServer);
    return false;
}

const clearIngredient = async(e)=>{
    e.preventDefault();
    helper.hideError();

    await fetch(e.target.action);
    loadIngredientsFromServer();
}

const deleteIngredient = (e)=>{
    e.preventDefault();
    helper.hideError();

    const _csrf = document.querySelector('#_csrf').value;

    helper.sendPost(e.target.action, {'_id':e.target.parentElement.id, _csrf}, loadIngredientsFromServer);
}

const getRecipe = (e)=>{
    e.preventDefault();
    helper.hideError();
    
    const _csrf = document.querySelector('#_csrf').value;

    helper.sendPost(e.target.action, {'_id':e.target.parentElement.id, _csrf}, handleRecipe);
}

const handleRecipe = (e)=>{
    //console.log(e);
    ReactDOM.render(
        <RecipeList meals={e}/>,
        document.getElementById(e[0]._id).getElementsByClassName('IngredientRecipes')[0]
    );
}

const loadIngredientsFromServer = async()=>{
    const response = await fetch('/getIngredients');
    const data = await response.json();
    ReactDOM.render(
        <IngredientList ingredients={data.ingredients}/>,
        document.getElementById('ingredients')
    );
}

const init = async()=>{
    const response = await fetch('/getToken');
    const data = await response.json();

    ReactDOM.render(<NavBar links={navLinks}/>, 
    document.getElementById('nav'));

    ReactDOM.render(
        <IngredientForm csrf={data.csrfToken}/>,
        document.getElementById('makeIngredient')
    );

    ReactDOM.render(
        <IngredientList csrf={data.csrfToken} ingredients={[]}/>,
        document.getElementById('ingredients')
    );

    const advertisementNodes = document.querySelectorAll('#ad');
    for(let i = 0; i < advertisementNodes.length;i++){
            ReactDOM.render(
                <Advertisement href='assets/img/ad.jpeg' alt='placeholder advertisement'/>,
                advertisementNodes[i]
            );
    }

    loadIngredientsFromServer();
}

window.onload=init;