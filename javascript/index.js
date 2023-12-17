import { MealByIngridient,MealByID, MealByCountry, RandomMeal } from './apiextract.js';


//Följande element används i metoderna som är beskrivna nedan. 
const searchInput = document.getElementById('searchFieldIngridient');
const searchButton = document.getElementById('ingridientButtonSubmit');
const randomMealButton = document.getElementById('randomMealButton');
const searchResultsSection = document.getElementById("searchResults"); 

//Metoden beskrivs i detalj nedan. 
GenerateFlags(); 

//Denna metod är skapad för att rensa innehållet när man tex. trycker på random-knappen flera gånger. 
//Även om du tryckt på random och sedan börjar söka så vill jag ta bort resultatet från random knappen.
function ClearResults() {
    const searchResultsSection = document.getElementById('searchResults');
    searchResultsSection.innerHTML = ''; 
}

//Anledning till if searchButton och randomMealButton är att när man navigerar på andra sidor så tycks javascript producera errors när den inte kan lokalisera elementet på den sidan man är på och det producerar fel om man försöker exekvera javascript på andra sidor.
//Denna metod används för realisera funktionaliten på sidan "Discover Dishes".
//När en användare har skrivit in text i sökfäletet och sedan trycker på sökknappen sparar vi när texten i sökfältet till en variabel.
//Den sparade variabeln används som inputparameter i metodanropet för att extrahera data från APIn som får maträtter baserat på ingridienser.
if(searchButton){
    searchButton.addEventListener('click', function() {
        var searchValue = searchInput.value;
        console.log('Söksträng: ', searchValue);
    
        MealByIngridient(searchValue).then(function (data) {
            ClearResults(); 
            GenerateMealData(data); 
        });
    });
    
}

//Denna metod används också på sidan "Discover Dishes". 
//När användaren trycker på "random-knappen" anropar vi API-metoden för att få fram en slumpad maträtt. 
if(randomMealButton){
    randomMealButton.addEventListener('click', function() {
    
        RandomMeal().then(function (data){
            ClearResults(); 
            GenerateMealData(data); 
        })
        
    });

}

//Den här metoden används för att realisera funktionaliteten på sidan "Global Inspiration". 
//Notera i HTML-filen att vi taggat varje bild med en class "flag-image".
//Alla flaggbilder sparas effektivt ner som en array. 
//För varje flagga som finns har vi en eventlyssnare som lyssnar efter ett musklick. 
//När en användare klickar på en flagga anropar vi ClickedOnFlag vilket jag beskriver vidare nedan. 
function GenerateFlags(){
   
var flagImages = document.getElementsByClassName('flag-image');

//Gör effektivt att alla flaggor får eventlyssnare med musklick. 
for (var i = 0; i < flagImages.length; i++) {
    flagImages[i].addEventListener('click', function() {
        ClickedOnFlag(this);
    });
}

}

//Denna metod körs när en användare klickar på en flagga på sidan "Global Inspiration."
//Som beskrivit ovan har varje flagga en eventlyssnare som lyssnar på musklick. 
//När en användare klickar på flagga sparar vi ner en text-sträng som är unikt taggad på bilden i HTML. 
//Detta för att vi ska kunna korrekt anropa API-metoden som behöver exempelvis en input såsom "Canadian" för mat från Canada. 
function ClickedOnFlag(flag) {
    var countryCode = flag.getAttribute('data-country-code');
    
    MealByCountry(countryCode).then(function (data){
        ClearResults(); 
        GenerateMealData(data); 
        console.dir(data);  
    })
}

//Denna metod kan vi återanvända för samtliga API-anrop vi gör på sidan när vi genrerar recept utifrån random-knapp, "söka på ingridient" samt "klicka på flaggor"
//Både API-metoden för MealByCountry och MealByIngridient lagrar inte fulla receptet i JSON-filen men den lagrar dock ett ID. 
//Därav använder vi en API-metod för att generera fram full maträttsdata genom metoden MealByID. 
//Metoden börjar med att iterera igenom alla meals och för varje iteration arbetar vi med idMeal som är input parameter för att extrahera ut full data för en viss maträtt.
//Sen följer ett liknande arbetsflöde som inlämningen för stryktipset (första javascripts inlämningen).
//Notera HTML filerna för discoverydishes och globalinspiration har en tom placeholder section som är ämnad för sökresultaten. 
//För varje iteration arbetar vi med en maträtt i taget (mealDetails) och vi bygger därefter upp en artikel med information som sedan appendas till placeholder sectionen jag tidigare nämnde. 
async function GenerateMealData(data) {

    for (const meal of data.meals) {
        var idMeal = meal.idMeal;

        const mealDetails = await MealByID(idMeal); //Inväntar att vi får fram JSON-filen från MealByID som resterande rader kommer bearabeta.
        console.dir(mealDetails);

        const articleContainer = document.createElement('article');
        articleContainer.className = 'recipeArticle';

        const mealName = document.createElement('h2');
        mealName.className = 'foodTitleSearch'; 
        mealName.textContent = meal.strMeal;

        const mealImage = document.createElement('img');
        mealImage.className = 'foodImagesearch'; 
        mealImage.src = meal.strMealThumb;
        mealImage.alt = meal.strMeal; //Lägger till alt-text för varje bild (titeln på maträtten).
       

        const instructions = document.createElement('p');
        instructions.className = 'reciepeSearch'; 
        instructions.textContent = mealDetails.meals[0].strInstructions;

        articleContainer.appendChild(mealName);
        articleContainer.appendChild(mealImage);
        articleContainer.appendChild(instructions);

        searchResultsSection.appendChild(articleContainer); //Läggs till inom placeholder sectionen som beskrevs ovan. 
    }
}

const btnContactUs = document.getElementById('contactUsSubmit'); 

btnContactUs.addEventListener('click', function() {
    
    alert('Thanks for your message, we will get back to you ASAP!');
    
});

