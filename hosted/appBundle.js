(()=>{var e={603:e=>{const t=e=>{document.getElementById("errorMessage").innerHTML=`<h3>${e}</h3>`,document.getElementById("errorMessage").classList.remove("hidden")};e.exports={handleError:t,sendPost:async(e,n,a)=>{const r=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}),i=await r.json();i.redirect&&(window.location=i.redirect),i.error&&t(i.error),a&&a(i)},hideError:()=>{document.getElementById("errorMessage").classList.add("hidden")}}}},t={};function n(a){var r=t[a];if(void 0!==r)return r.exports;var i=t[a]={exports:{}};return e[a](i,i.exports,n),i.exports}(()=>{const e=n(603),t=[{name:"Logout",href:"/logout",id:"logoutButton"}],a=e=>{const t=e.links.map(((e,t)=>React.createElement("div",{key:t,className:"navlink"},React.createElement("a",{id:e.id,href:e.href},e.name))));return React.createElement("nav",{id:"navbar"},t)},r=t=>{t.preventDefault(),e.hideError();const n=t.target.querySelector("#ingredientName").value,a=t.target.querySelector("#ingredientCategory").value,r=t.target.querySelector("#ingredientQuantity").value,i=t.target.querySelector("#ingredientMeasurement").value,c=t.target.querySelector("#_csrf").value;return n&&a&&r?(e.sendPost(t.target.action,{name:n,category:a,quantity:r,measurement:i,_csrf:c},s),!1):(e.handleError("All fields are required!"),!1)},i=async t=>{t.preventDefault(),e.hideError(),await fetch(t.target.action),s()},c=t=>{t.preventDefault(),e.hideError();const n=document.querySelector("#_csrf").value;e.sendPost(t.target.action,{_id:t.target.parentElement.id,_csrf:n},s)},o=t=>{t.preventDefault(),e.hideError();const n=document.querySelector("#_csrf").value;e.sendPost(t.target.action,{_id:t.target.parentElement.id,_csrf:n},l)},l=e=>{console.log(e)},m=e=>React.createElement("form",{id:"ingredientForm",name:"ingredientForm",onSubmit:r,action:"/maker",method:"POST",className:"ingredientForm"},React.createElement("label",{htmlFor:"name"},"Name: "),React.createElement("input",{id:"ingredientName",type:"text",name:"name",placeholder:"Ingredient Name"}),React.createElement("label",{htmlFor:"category"},"Category: "),React.createElement("select",{name:"ingredientCategory",id:"ingredientCategory",defaultValue:"miscellaneous"},React.createElement("option",{value:"canned goods"},"canned goods"),React.createElement("option",{value:"condiments"},"condiments"),React.createElement("option",{value:"produce"},"produce"),React.createElement("option",{value:"meats"},"meats"),React.createElement("option",{value:"dairy"},"dairy"),React.createElement("option",{value:"breakfast"},"breakfast"),React.createElement("option",{value:"pasta and rice"},"pasta and rice"),React.createElement("option",{value:"microwave"},"microwave"),React.createElement("option",{value:"beverages"},"beverages"),React.createElement("option",{value:"bakery"},"bakery"),React.createElement("option",{value:"oils"},"oils"),React.createElement("option",{value:"miscellaneous"},"miscellaneous")),React.createElement("label",{htmlFor:"quantity"},"Quantity: "),React.createElement("input",{id:"ingredientQuantity",type:"number",min:"0",name:"quantity"}),React.createElement("select",{name:"ingredientMeasurement",id:"ingredientMeasurement"},React.createElement("option",{value:"cups"},"cups"),React.createElement("option",{value:"fl oz"},"fluid ounces"),React.createElement("option",{value:"grams"},"grams"),React.createElement("option",{value:"lbs"},"lbs"),React.createElement("option",{value:"units"},"units"),React.createElement("option",{value:"bunch"},"bunch")),React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e.csrf}),React.createElement("input",{className:"makeIngredientSubmit",type:"submit",value:"Make Ingredient"})),d=e=>{if(0===e.ingredients.length)return React.createElement("div",{className:"ingredientList"},React.createElement("h3",{className:"emptyIngredient"},"No Ingredients yet!"));const t=e.ingredients.map((e=>React.createElement("div",{key:e._id,id:e._id,className:"ingredient"},React.createElement("form",{action:"/deleteIngredient",name:"deleteIngredientForm",id:"deleteIngredientForm",method:"POST",className:"ingredientForm",onSubmit:c},React.createElement("input",{type:"submit",name:"deleteIngredientSubmit",id:"deleteIngredientSubmit",value:" X "})),React.createElement("form",{id:"recipeFinder",name:"recipeFinder",action:"/findRecipe",onSubmit:o,method:"POST",className:"ingredientForm"},React.createElement("input",{className:"findRecipeButton",type:"submit",value:"Find Recipes"})),React.createElement("h3",{className:"ingredientName"},e.name),React.createElement("h3",{className:"ingredientCategory"},"Category:",e.category),React.createElement("h3",{className:"ingredientQuantity"},"Quantity:",e.quantity," ",e.measurement))));return React.createElement("div",{className:"ingredientList"},React.createElement("form",{id:"ingredientClearer",name:"ingredientClearer",action:"/clearIngredients",onSubmit:i,method:"POST",className:"ingredientForm"},React.createElement("input",{className:"clearIngredientsSubmit",type:"submit",value:"Clear Ingredients"})),t)},s=async()=>{const e=await fetch("/getIngredients"),t=await e.json();ReactDOM.render(React.createElement(d,{ingredients:t.ingredients}),document.getElementById("ingredients"))};window.onload=async()=>{const e=await fetch("/getToken"),n=await e.json();ReactDOM.render(React.createElement(a,{links:t}),document.getElementById("nav")),ReactDOM.render(React.createElement(m,{csrf:n.csrfToken}),document.getElementById("makeIngredient")),ReactDOM.render(React.createElement(d,{csrf:n.csrfToken,ingredients:[]}),document.getElementById("ingredients")),s()}})()})();