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