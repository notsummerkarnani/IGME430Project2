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
        <div className='bg notification is-primary'>
            <form id="ingredientForm"
                name="ingredientForm"
                onSubmit={handleIngredient}
                action="/maker"
                method="POST"
                className="form">

                <div className='columns'>
                    <div className='column is-8'>
                        <div className='columns'>
                            <div className='column is-8 field'>
                                <label className="label" htmlFor="name">Name: </label>
                                <div className='control'>
                                    <input className="input" id="ingredientName" type="text" name="name" placeholder="Ingredient Name" />
                                </div>
                            </div>

                            <div className='column field'>
                                <label className="label" htmlFor="category">Category: </label>
                                <div className='control'>
                                    <select className="select is-normal" name="ingredientCategory" id="ingredientCategory" defaultValue="miscellaneous">
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
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='column'>
                        <div className='columns'>
                            <div className='column field'>
                                <label className="label" htmlFor="quantity">Quantity: </label>
                                <div className='control'>
                                    <input className="input" id="ingredientQuantity" type="number" min="0" name="quantity" placeholder='Quantity'/>
                                </div>
                            </div>

                            <div className='column field'>
                                <label className="label" htmlFor="ingredientMeasurement">Measure: </label>
                                <div className='control'>
                                    <select className="select is-normal" name="ingredientMeasurement" id="ingredientMeasurement">
                                        <option value="cups">cups</option>
                                        <option value="fl oz">fluid ounces</option>
                                        <option value="grams">grams</option>
                                        <option value="lbs">lbs</option>
                                        <option value="units">units</option>
                                        <option value="bunch">bunch</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='field'>
                    <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
                    <div className='control'>
                        <input className="button is-fullwidth is-primary is-inverted title" type="submit" value="Make Ingredient" />
                    </div>
                </div>
            </form>

            <form id="ingredientClearer"
                name="ingredientClearer"
                action="/clearIngredients"
                onSubmit={clearIngredient}
                method="POST"
                className="form">

                <div className='field'>
                    <div className='control'>
                        <input className="button is-fullwidth is-danger" type="submit" value="Clear Ingredients" />
                    </div>
                </div>
            </form>
        </div>
        
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