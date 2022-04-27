const RecipeList = (props)=>{
    if (props.meals.length === 0) {
        return (
            <div className="container notification title is-danger">
                <h3>No Recipes Found!</h3>
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
                    <div className='content'>
                        <div className='tile is-child columns level'>
                            <div className='column is-5'>
                                <h1 className="title level-left">{recipe.name}</h1>
                                <p className="subtitle">Category:{recipe.category}</p>
                                <div>
                                    <h3 className='has-text-white'>Ingredients:</h3>
                                    <ul className='subtitle'>{ingredientNodes}</ul>
                                </div>
                            </div>
                            <div className='column'>
                                <img src={recipe.thumbnail} alt="Meal Image" className='level-right is-pulled-right pb-2' />
                                <div className='columns pt-2'>
                                    <h3 className='subtitle column'>Youtube Link:</h3>
                                    <a className='button is-hoverable subtitle has-text-primary column' href={recipe.youtube}>Watch Video</a>
                                </div>
                            </div>
                        </div>
                        <h3 className='has-text-white mt-0'>Instructions: </h3><p className='subtitle'>{recipe.instructions}</p>
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

module.exports = RecipeList;