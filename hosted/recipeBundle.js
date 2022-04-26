(()=>{var e={603:e=>{const t=e=>{document.getElementById("errorMessage").innerHTML=`<h3>${e}</h3>`,document.getElementById("errorMessage").classList.remove("hidden")};e.exports={handleError:t,sendPost:async(e,a,r)=>{const c=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}),n=await c.json();n.redirect&&(window.location=n.redirect),n.error&&t(n.error),r&&r(n)},hideError:()=>{document.getElementById("errorMessage").classList.add("hidden")}}}},t={};function a(r){var c=t[r];if(void 0!==c)return c.exports;var n=t[r]={exports:{}};return e[r](n,n.exports,a),n.exports}(()=>{const e=a(603),t=[{name:"Pantry",href:"/maker",id:"makerButton"},{name:"Logout",href:"/logout",id:"logoutButton"}],r=e=>{const t=e.links.map(((e,t)=>React.createElement("div",{key:t,className:"navlink"},React.createElement("a",{id:e.id,href:e.href},e.name))));return React.createElement("nav",{id:"navbar"},t)},c=e=>React.createElement("form",{action:"/searchRecipe",id:"searchRecipeForm",name:"searchRecipeForm",onSubmit:i,method:"POST",className:"RecipeForm"},React.createElement("label",{htmlFor:"recipeInput"},"Recipe Name: "),React.createElement("input",{type:"text",name:"recipeInput",id:"recipeInput",placeholder:"Recipe Name"}),React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e.csrf}),React.createElement("input",{className:"searchRecipeSubmit",type:"submit",value:"Search Recipe"})),n=e=>{if(console.log(e),0===e.meals.length)return React.createElement("div",{className:"recipeList"},React.createElement("h3",{className:"emptyRecipe"},"No Recipes Found!"));const t=e.meals.map((e=>{const t=e.ingredients.map(((e,t)=>React.createElement("li",{key:t},e)));return React.createElement("div",{key:e.id,id:e.id,className:"recipe"},React.createElement("img",{src:e.thumbnail,alt:"Meal Image"}),React.createElement("h2",{className:"recipeName"},e.name),React.createElement("h3",{className:"recipeCategory"},"Category:",e.category),React.createElement("div",{className:"recipeIngredients"},React.createElement("h3",null,"Ingredients:"),React.createElement("ul",null,t)),React.createElement("h3",null,"Instructions: "),React.createElement("p",null,e.instructions),React.createElement("h3",null,"Youtube Link: ",React.createElement("a",{href:e.youtube},e.youtube)))}));return React.createElement("div",{className:"recipeList"},t)},i=t=>{t.preventDefault(),e.hideError();const a=document.querySelector("#_csrf").value,r=document.querySelector("#recipeInput").value;e.sendPost(t.target.action,{_csrf:a,name:r},s)},s=e=>{ReactDOM.render(React.createElement(n,{meals:e}),document.getElementById("recipes"))};window.onload=async()=>{const e=await fetch("/getToken"),a=await e.json();ReactDOM.render(React.createElement(r,{links:t}),document.getElementById("nav")),ReactDOM.render(React.createElement(c,{csrf:a.csrfToken}),document.getElementById("searchRecipe"))}})()})();