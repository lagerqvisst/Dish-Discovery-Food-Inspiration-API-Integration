//Se API dokumentation: https://www.themealdb.com/api.php
//Använt följande API-metoder:

//Lookup full meal details by id
//Lookup a single random meal
//Filter by main ingredient
//Filter by Area

//Detta gäller för följande metoder. 
//Samtliga metoder utgör en sk. "promise-kedja" där vi asynkront väntar på svar i olika led innan vi går vidare till nästa tills vi kommer i mål.
// Steg 1: Fetch -> en asynkron HTTP-förfrågan till länken nedan som vi väntar på att slutföras innan vi går vidare till steg 2.
// Steg 2: Om HTTP-förfrågan lyckas, startar vi ett nytt block i promise-kedjan där vi säger "konvertera" HTTP-svaret till en JSON-fil.
// Steg 3: När vi väntat klart på konverteringen till JSON så vill vi slutligen retunera JSON-datan till den som anropat metoden.
// Steg (4): Notera i anropet i "index.js" att vi också använder "then" vilket betyder att vi väntar på att alla steg i denna kedjan ska slutföras innan vi börjar bearbeta datan.

export function MealByIngridient(string) {

    return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${string}`)
      
    .then(function (response) {
      return response.json();
    })
    .then(function (data){
      return data;
    })
  
  };

  export function MealByID(string) {

    return fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${string}`)
      
    .then(function (response) {
      return response.json();
    })
    .then(function (data){
      return data;
    })
  
  };


  export function MealByCountry(string) {

    return fetch(`https:/www.themealdb.com/api/json/v1/1/filter.php?a=${string}`)
      
    .then(function (response) {
      return response.json();
    })
    .then(function (data){
      return data;
    })
  
  };

  
  export function RandomMeal() {
  
    return fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
      
    .then(function (response) {
      return response.json();
    })
    .then(function (data){
      return data;
    })
  
  };