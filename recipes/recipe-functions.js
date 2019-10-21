// Save recipe function
let saveRecipe = function (recipes) {
    let recipeString = JSON.stringify(recipes)
    localStorage.setItem('recipes', recipeString)
}

//Get recipes function
let getRecipes = function () {
    let loadRecipes = localStorage.getItem('recipes')
    let parsedRecipes = JSON.parse(loadRecipes)
    if (parsedRecipes) {
        return parsedRecipes
    }
    else {
        return []
    }
}

//Render recipes function
let renderRecipes = function (recipes, filters) {
    
    recipes.forEach(function(recipe){
        if(recipe.title === ''){
            recipe.title = 'Unnamed recipe'
        }
    })

    let filteredRecipes = recipes.filter(function (recipe) {
        return recipe.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })


    document.querySelector('#recipe-list').innerHTML = ''

    filteredRecipes.forEach((recipe) => {
        let id = recipe.id
       
        let div = document.createElement('div')
        let title = document.createElement('a')
        title.setAttribute('href', `edit.html#${id}`)
        title.textContent = recipe.title
        div.setAttribute('class', 'recipe')
       
        
        document.querySelector('#recipe-list').appendChild(div)
        div.appendChild(title)


        let ingredientsOnStock = recipe.ingredients.filter((ingredient) => ingredient.onStock)
      
        let message = document.createElement('p')
        if (ingredientsOnStock.length === recipe.ingredients.length && ingredientsOnStock.length > 0) {
            message.textContent = 'You have all ingredients needed'
        } else if (ingredientsOnStock.length === 0) {
            message.textContent = 'You have no ingredients needed'
        } else  {            
            message.textContent = 'You have some ingredients needed'
        }
        div.appendChild(message)


    })
}

//Render Ingredients function
let renderIngredients = function (thisRecipe) {
    document.querySelector('.ingredients-list').innerHTML = ''
    thisRecipe.ingredients.forEach(function (ingredient) {
        let li = document.createElement('li')

        let checkBox = document.createElement('input')
        checkBox.setAttribute('type', 'checkbox')

        let removeBtn = document.createElement('button')
        removeBtn.textContent = 'X'

        let span = document.createElement('span')
         span.textContent = ingredient.name

        if (ingredient.name === '') {
            span.textContent = 'unknown ingredient'
        }

        document.querySelector('.ingredients-list').appendChild(li)
        li.appendChild(checkBox)
        li.appendChild(span)
        li.appendChild(removeBtn)


        checkBox.addEventListener('change', function (e) {
            ingredient.onStock = e.target.checked
            saveRecipe(recipes)
        })

        if (ingredient.onStock) {
            checkBox.checked = true
        }



        removeBtn.addEventListener('click', function (e) {
            let ingrText = e.target.previousSibling.innerText
            let indexIngr = thisRecipe.ingredients.findIndex(function (ingredient) {
                return ingredient.name === ingrText
            })
            
            thisRecipe.ingredients.splice(indexIngr, 1)
            saveRecipe(recipes)
            renderIngredients(thisRecipe)
        })

    })


}


