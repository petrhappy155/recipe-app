let getId = location.hash.substring(1)

let recipes = getRecipes();

let thisRecipe = recipes.find(function (recipe) {
    return getId === recipe.id
})

if (thisRecipe === undefined) {
    location.assign('index.html')
}

document.querySelector('#recipe-title-edit').value = thisRecipe.title
document.querySelector('#recipe-text-edit').value = thisRecipe.steps
renderIngredients(thisRecipe)

document.querySelector('#add-ingredient-form').addEventListener('submit', function (e) {
    e.preventDefault();

    thisRecipe.ingredients.push({
        name: e.target.elements.text.value,
        onStock: false
    })
    saveRecipe(recipes)
    renderIngredients(thisRecipe)
    e.target.elements.text.value = ''
})

document.querySelector('#recipe-title-edit').addEventListener('input', function (e) {
    thisRecipe.title = e.target.value
    
    saveRecipe(recipes)
})

document.querySelector('#recipe-text-edit').addEventListener('input', function (e) {
    thisRecipe.steps = e.target.value
    saveRecipe(recipes)
})

document.querySelector('#delete-recipe').addEventListener('click', function () {
    let recipeIndex = recipes.findIndex(function (recipe) {
        return recipe.id === thisRecipe.id
    })

    if (recipeIndex > -1) {
        recipes.splice(recipeIndex, 1)
        saveRecipe(recipes)
        location.assign('index.html')
    }

})



