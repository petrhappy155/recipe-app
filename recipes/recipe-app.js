let recipes = getRecipes();
let filters = {
    searchText: '',
}


renderRecipes(recipes, filters)


document.querySelector('#searchText').addEventListener('input', function (e) {
    filters.searchText = e.target.value
    renderRecipes(recipes, filters)
})

document.querySelector('#add-recipe').addEventListener('click', function () {
    let id = uuidv4()
    recipes.push({
        id: id,
        title: '',
        steps: '',
        ingredients: []
    })
    location.assign(`edit.html#${id}`)
    saveRecipe(recipes)
})





