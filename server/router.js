const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
    app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
    app.get('/getIngredients', mid.requiresLogin, controllers.Ingredient.getIngredients);
    app.get('/clearIngredients', mid.requiresLogin, controllers.Ingredient.clearIngredients);

    app.post('/deleteIngredient', mid.requiresLogin, controllers.Ingredient.deleteIngredient);

    app.get('/recipePage', mid.requiresLogin, controllers.Recipe.recipePage);
    app.post('/findRecipe', mid.requiresLogin, controllers.Ingredient.findRecipe);
    app.post('/searchRecipe', mid.requiresLogin, controllers.Recipe.searchRecipe);

    app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
    app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

    app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

    app.get('/logout', mid.requiresLogin, controllers.Account.logout);

    app.post('/changePass', mid.requiresSecure, mid.requiresLogout, controllers.Account.changePass);

    app.get('/maker', mid.requiresLogin, controllers.Ingredient.makerPage);
    app.post('/maker', mid.requiresLogin, controllers.Ingredient.updateIngredient);

    app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);

    app.get('*', mid.requiresSecure, mid.requiresSecure, controllers.Account.loginPage);
};

module.exports = router;