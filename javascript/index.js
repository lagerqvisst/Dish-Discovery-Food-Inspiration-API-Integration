
import {  } from '/apiextract.js';


//För att lyckas med denna uppgift behöver vi programmera asynkront eftersom att just datahämtning från ett API är en asynkron uppgift. 
//Pusselbiten här är ".then" som säkerställer att vi inte börjar skapa några matchrader förrens datahämtningen är klar (promise/löftet har levererats).
//Beskriver i mer detalj på "fetch.Data.js" om hur metoden är utformad.
getStrykTipsData().then(function (data) {
    //När datahämtningen är fullständig kör vi metoden nedan för att skapa matchraderna (callback-funktion).  
    SkapaMatchRader(data);
});