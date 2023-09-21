const searchButton = document.getElementById('submit');
const searchInput = document.getElementById('search');
const recipeList = document.getElementById('recipeList');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');



const fetchRecipes = async (q) => {

  const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${q}`);
  const response = await data.json();

  if (response.meals === null || response.meals === undefined || response.meals.length === 0) {
    recipeList.innerHTML = '<h1>Recipe not found.</h1>'
    return;
  }

  recipeList.innerHTML = '';
  response.meals.forEach(meal => {

    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card');
    recipeCard.innerHTML = `    
            <img src="${meal.strMealThumb}"/>
            <h3>${meal.strMeal}</h3>              
                
    `
    const button = document.createElement('button');
    button.textContent = 'Go Recipe';
    recipeCard.appendChild(button);

    button.addEventListener('click', () => {
      recipeWindow(meal);
    })

    recipeList.appendChild(recipeCard);
  });
}

const recipeWindow = (meal) => {
  recipeDetailsContent.innerHTML = `
  <h3>${meal.strMeal}</h3>
  <div class='details-window'>
  <div class='details-left'> 
  <img src="${meal.strMealThumb}"/>
  </div>
  <div class='details-right'>
    <h4>Nationality: ${meal.strArea}</h4>
    <h4>Category: ${meal.strCategory}</h4>
  </div>  
  </div>
  
  <p>${meal.strInstructions}</p>
  `
  recipeDetailsContent.parentElement.style.display = 'block';
}

recipeCloseBtn.addEventListener('click', () => {
  recipeDetailsContent.parentElement.style.display = 'none';
})

searchButton.addEventListener('click', (e) => {
  e.preventDefault();
  const searchValue = searchInput.value.trim();
  fetchRecipes(searchValue);
})


// nav-scroll
function scrollToSection(sectionId) {
  const section = document.querySelector(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const links = document.querySelectorAll('nav a');
  links.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetSectionId = link.getAttribute('href');
      scrollToSection(targetSectionId);
    });
  });
});

// searct-btn scroll
searchButton.addEventListener('click', () => {
  recipeList.scrollIntoView({ behavior: 'smooth' });
})




