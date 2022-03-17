import config from "../conf/index.js";



async function init() {
  // console.log('From init()') ;
  // console.log(config) ;
  // //Fetches list of all cities along with their images and description
 
  
  //Updates the DOM with the cities
  let cities = await fetchCities();
    cities.map((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });

}
// addCityToDOM("london", "London", "London is the capital of UK", "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format");

//Implementation of fetch call


async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  let url = (config.backendEndpoint + "/cities")
 try {
   const res = await fetch(url);
   const data = await res.json();
   return data
 } catch(Exception){
   return null
 }
  
}


//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const main_div =document.getElementById('data') ;

  const container = document.createElement('div');
 
  container.className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-3 mt-4";

  

 container.innerHTML = `<a href="./pages/adventures/?city=${id}" id=${id}>
 <div class="tile">
   <img src="${image}" />
   <div class="tile-text text-center">
     <h5>${city}</h5>
     <p>${description}</p>
   </div>
 </div>
</a>`
 main_div.append(container);
}
// addCityToDOM("london", "London", "London is the capital of UK", "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format");
export { init, fetchCities, addCityToDOM };


