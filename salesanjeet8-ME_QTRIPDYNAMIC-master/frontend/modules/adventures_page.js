import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const city = new URLSearchParams(search); 
  return city.get('city');
}
// console.log('http://3.109.13.211:8082/adventures')
//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  let url = (config.backendEndpoint + "/adventures/?city=" + city)
  try {
    const res = await fetch(url);
    const adventures = await res.json();
    return adventures;
  } catch(Exception){
    return null
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  const main_div = document.getElementById('data');
  adventures.map(elem => {
    const container = document.createElement('div');
    container.setAttribute("class", "col-6 col-lg-3 mb-5")
    container.innerHTML = "";
    container.innerHTML = `
    <a href="detail/?adventure=${elem.id}" id=${elem.id}>
  
    <div class="activity-card">
    <span class="category-banner">${elem.category}</span>
      <img class="img-responsive" src=${elem.image}/>
      <div class="w-100 mt-3">
        <div class="d-md-flex justify-content-between pl-3 pr-3">
          <h5>${elem.name}</h5>
          <p>₹${elem.costPerHead}</p>
        </div>
        <div class="d-md-flex justify-content-between pl-3 pr-3">
          <h5>Duration</h5>
          <p>${elem.duration} Hours</p>
        </div>
      </div>
    </div>
     </a>`
     main_div.append(container);
  })
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredList = [];

  list.map(adv => {
    if(adv.duration >= low && adv.duration <= high) {
      filteredList.push(adv);

    }
  });
    if(filteredList.length === 0) {
      return list;
    }
    //console.log(filteredList);
    return filteredList;
}

function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list 

  var filteredAdvByCategory = [];
  categoryList.map((category) => {
    list.map((key) => {
      if (key.category === category) {
        filteredAdvByCategory.push(key);
      }
    });
  });

  if(categoryList.length === 0) {
    return list;
  }
  //console.log(filteredAdvByCategory);
  return filteredAdvByCategory;

}





function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  
console.log(list)
console.log(filters)
  if(filters["duration"].length > 0 && filters["category"].length > 0) {
    let range = filters["duration"];
    let rangeArray = range.split("-");
    let filterByDurationList = filterByDuration(list, rangeArray[0], rangeArray[1]);
    var finalList = filterByCategory(filterByDurationList, filters["category"]);
  }
  else if(filters["duration"].length > 0){
    let range = filters["duration"];
    let rangeArray = range.split("-");
    var finalList = filterByDuration(list, rangeArray[0], rangeArray[1]);
  }
  else if(filters["category"].length > 0) {
    var finalList = filterByCategory(list, filters["category"]);
  }
  else {
    return list;
  }
  
  return finalList;

}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters to localStorage using JSON.stringify()
  window.localStorage.setItem("filters",JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return in JSON format
  let localStorageFilter = JSON.parse(window.localStorage.getItem("filters"));

  // Place holder for functionality to work in the Stubs
  return localStorageFilter;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter and Generate Category Pills
  

  filters["category"].map(key => {
    let divElementPills = document.createElement("div");
    divElementPills.className = "category-filter";
    divElementPills.innerHTML = `
      <div>${key}</div>
    `;
    document.getElementById("category-list").appendChild(divElementPills);
  })

  if(filters["duration"]) {
  document.getElementById("duration-select").value=filters["duration"];
  }
  
}

export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
