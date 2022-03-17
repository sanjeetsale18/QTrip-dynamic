import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let id = search.substring(11)
  // Place holder for functionality to work in the Stubs
  return id;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    const res= await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`);
    const data = await res.json();
    return data;
  } catch (Exception){
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById("adventure-name").innerHTML = adventure.name;
  document.getElementById("adventure-subtitle").innerHTML = adventure.subtitle;
  adventure.images.map(elem => {
    document.getElementById('photo-gallery').innerHTML += `
    <div><img class="activity-card-image" src=${elem}/></div>` 
  })
  document.getElementById('adventure-content').innerHTML = adventure.content;

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  document.getElementById("photo-gallery").innerHTML = '';
  let carouselContainer = document.getElementById('photo-gallery');
  let Maindivelem = document.createElement("div");
  Maindivelem.setAttribute('id', 'carouselExampleControls')
  Maindivelem.setAttribute('class', "carousel slide");
  Maindivelem.setAttribute('data-bs-ride', 'carousel');
  let divelem = document.createElement('div');
  divelem.setAttribute('class','carousel-inner');
  images.map( (elem,index) => {
    let imgDiv = document.createElement('div');
    index === 0
    ? imgDiv.setAttribute('class', 'carousel-item activity-card img active')
    :imgDiv.setAttribute('class', 'carousel-item activity-card img');
    imgDiv.innerHTML = `<img class='d-block w-100' src=${elem} alt='First slide'></img>`;
    divelem.appendChild(imgDiv);
  });
  Maindivelem.append(divelem);
  Maindivelem.innerHTML += `
  <button class='carousel-control-prev' type='button' data-bs-target='#carouselExampleControls' data-bs-slide='prev'>
  <span class='caroiusel-control-prev-icon' aria-hidden='true'></span>
  </button>
  <button class='carousel-control-prev' type='button' data-bs-target='#carouselExampleControls' data-bs-slide='next'>
  <span class='caroiusel-control-prev-icon' aria-hidden='true'></span>
  </button>`;

  carouselContainer.append(Maindivelem);

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available){
    document.getElementById('reservation-panel-sold-out').style.display = 'none';
    document.getElementById('reservation-panel-available').style.display = 'block';
    document.getElementById('reservation-person-cost').innerHTML = `${adventure.costPerHead}`;
  }else {
    document.getElementById('reservation-panel-sold-out').style.display = 'block';
    document.getElementById('reservation-panel-available').style.display = 'none';
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let totalCost = adventure.costPerHead * persons;
  document.getElementById('reservation-cost').innerHTML = `${totalCost}`;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const form = document.getElementById('myForm');

  let reservationObj = {};

  form.addEventListener('submit', function(event){
    event.preventDefault();
    reservationObj['name'] = form.elements['name'].value;
    reservationObj['date'] = form.elements['date'].value;
    reservationObj['person'] = form.elements['person'].value;
    reservationObj['adventure'] = `${adventure.id}`;

    const reservationUpdate = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservationObj),
    };

    fetch(`${config.backendEndpoint}/reservations/new`, reservationUpdate)
    .then(data => {
      if(!data.ok) {
        throw Error(data.status);
      }
      return data.json()
    }).then(reservationUpdate => {
      alert('Success!');
      location.reload();
    }).catch(e => {
      alert('Failed!')
    });
  });

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved){
    document.getElementById('reserved-banner').style.display = 'block';
  } else{
    document.getElementById('reserved-banner').style.display = 'none';
  };
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
