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
            <div key={recipe.id} className='tile is-ancestor bg notification is-primary m-3'>
                <div id={recipe.id} className="tile is-parent">
                    <div>
                        <div className='tile is-child columns level'>
                            <div className='column is-5 content'>
                                <p className="title">{recipe.name}</p>
                                <p className="subtitle">Category:{recipe.category}</p>
                                <div className='recipeIngredients level-left'>
                                    <h3>Ingredients:</h3>
                                    <ul>{ingredientNodes}</ul>
                                </div>
                            </div>
                            <div className='column'>
                                <img src={recipe.thumbnail} alt="Meal Image" className='level-right image is-square is-pulled-right' />
                            </div>
                        </div>
                        <p>Instructions: </p><p>{recipe.instructions}</p>
                        <p>Youtube Link: <a href={recipe.youtube}>{recipe.youtube}</a></p>
                    </div>
                </div>
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

    let rowChange;
    let ingredientNodes = props.ingredients.map((ingredient, index) => {
        if(index%3===0) {
            rowChange = <div className="tile is-ancestor notification is-info"></div>;
        }

        return (
            <div key={ingredient._id} className='tile is-parent'>
                <div id={ingredient._id} className="tile is-child box notification is-primary">
                    <div className='columns'>
                        
                        <form id="recipeFinder"
                            name="recipeFinder"
                            action="/findRecipe"
                            onSubmit={getRecipe}
                            method="POST"
                            className="column">

                            <input className="button is-primary is-inverted" type="submit" value="Find Recipes" />
                        </form>

                        <form action="/deleteIngredient"
                            name="deleteIngredientForm"
                            id="deleteIngredientForm"
                            method="POST"
                            className="column"
                            onSubmit={deleteIngredient}>

                            <div className='field is-pulled-right'>
                                <div className='control'>
                                    <button className="delete is-large" type="submit" name="deleteIngredientSubmit" id="deleteIngredientSubmit" value=" X "></button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className='content'>
                        <p className="is-size-2">{ingredient.name}</p>
                        <p className="is-size-4">Category:{ingredient.category}</p>
                        <p className="is-size-4">Quantity:{ingredient.quantity} {ingredient.measurement}</p>
                        <div className='IngredientRecipes'></div>
                    </div>
                </div>
            </div>
            
        );
    });

    //break nodes into groups so that they can be displayed properly
    let groupedNodes = [];
    let row = -1;
    ingredientNodes.map((node, index)=>{
        if(index%3===0) {
            row++;
            groupedNodes[row] = [];
        }
        groupedNodes[row].push(node);
    })

    ingredientNodes = groupedNodes.map((nodes, index)=>{
        return (
                <div key={index} className='tile is-ancestor'>
                    {nodes}
                </div>
        );
    });

    return(
        <div>
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

    helper.sendPost(e.target.action, {'_id':e.target.parentElement.parentElement.id, _csrf}, loadIngredientsFromServer);
}

const getRecipe = (e)=>{
    e.preventDefault();
    helper.hideError();
    
    const _csrf = document.querySelector('#_csrf').value;

    helper.sendPost(e.target.action, {'_id':e.target.parentElement.parentElement.id, _csrf}, handleRecipe);
}

const handleRecipe = (e)=>{
    ReactDOM.render(
        <RecipeList meals={e}/>,
        document.getElementById('recipes')
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