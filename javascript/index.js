import { MealByIngridient } from './apiextract.js';
import { MealByID } from './apiextract.js';
import { RandomMeal } from './apiextract.js';
//Funktionalitet för Discover Dishes sidan där man kan söka på en ingridens för att returnerar resultat.

const searchInput = document.getElementById('searchFieldIngridient');
const searchButton = document.getElementById('ingridientButtonSubmit');

const randomMealButton = document.getElementById('randomMealButton');

//Sektion som agerar parent där vi lägger till sökresultaten. 
const searchResultsSection = document.getElementById("searchResults"); 

//Tar in användarens input som sträng och skickar in den i metoden för att hämta specifik data från API baserat på text strängen.
searchButton.addEventListener('click', function() {
    // Spara ner användarens input i sökfältet som skickas vidare till API-metoden. 
    var searchValue = searchInput.value;
    console.log('Söksträng: ', searchValue);

    MealByIngridient(searchValue).then(function (data) {
        ClearResults(); 
        GenerateMealData(data); 
    });
});

randomMealButton.addEventListener('click', function() {
    
    RandomMeal().then(function (data){
        ClearResults(); 
        GenerateMealData(data); 
    })
    
});

//Denna metod är skapad för att rensa innehållet när man tex. trycker på random-knappen flera gånger. 
//Även om du tryckt på random och sedan börjar söka så vill jag ta bort resultatet från random knappen.
function ClearResults() {
    const searchResultsSection = document.getElementById('searchResults');
    searchResultsSection.innerHTML = ''; 
}


async function GenerateMealData(data) {

    for (const meal of data.meals) {
        var idMeal = meal.idMeal;

        const mealDetails = await MealByID(idMeal);
        console.dir(mealDetails);

        const articleContainer = document.createElement('article');
        articleContainer.className = 'recipeArticle';

        const mealName = document.createElement('h2');
        mealName.className = 'foodTitleSearch'; 
        mealName.textContent = meal.strMeal;

        const mealImage = document.createElement('img');
        mealImage.className = 'foodImagesearch'; 
        mealImage.src = meal.strMealThumb;

        const instructions = document.createElement('p');
        instructions.className = 'reciepeSearch'; 
        instructions.textContent = mealDetails.meals[0].strInstructions;

        articleContainer.appendChild(mealName);
        articleContainer.appendChild(mealImage);
        articleContainer.appendChild(instructions);

        searchResultsSection.appendChild(articleContainer);
    }
}



