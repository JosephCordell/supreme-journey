const container = document.querySelector(".card-container"); 
const inputEl = document.getElementById('search-text')
var searchFormEl = document.querySelector('#search-form');
var cardEl = document.querySelector('.card')

let zoomLevel = 14;
let map;
let infoWindow;

cardEl.addEventListener('hover', markerBounce);

function markerBounce() {
  console.log('BOUNCE')
}

//gets data from DocuMenu for cards and map markers
function searchRestaurant(zipcode = null) {
  if (zipcode === null) {
    zipcode = inputEl.value.trim()
  }
  docuMenuURL = `https://api.documenu.com/v2/restaurants/zip_code/${zipcode}?key=ce2dc71b6458503cfc0e34adfe844c3f`
  fetch(docuMenuURL)
    .then(response => {
      if (response.ok){
        return response.json();
      }
      throw new Error("invalid asl;dkjf")
    })
    .then(request => {
      businessCards(request);  
    })
    .catch(error => {
      console.log(error)
    });
};

//creates map that currently centers around Bellevue
function initMap() {
  if (window.location.search.indexOf('q=') === -1 ){
  map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: 47.6137, lng: -122.19093},
    zoom: zoomLevel,
  });
  } else {
    let URLtransfer = window.location.search.slice(window.location.search.indexOf('q=')+2)
    if (URLtransfer.indexOf('&') !== -1) {
      URLtransfer.slice(1,URLtransfer.indexOf('&') -1)
    }
    searchRestaurant(URLtransfer)
  }
}

//creates map that currently centers around Bellevue
function updateMap(lati, longi) {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: lati, lng: longi},
    zoom: zoomLevel,
  });
}

//creates the business cards for the left column
function businessCards (data) {
  if (data.data.length > 0) {
  container.innerHTML = ""
  let rlat = data.data[0].geo.lat;
  let rlon = data.data[0].geo.lon;
  updateMap(rlat, rlon)
  console.log(data)
  for (let i = 0; i <= data.data.length; i++) {
        const restaurantCardEl = document.createElement("div"); 
        restaurantCardEl.classList.add("card"); 
        const rName = data.data[i].restaurant_name; 
        const rPhone = data.data[i].restaurant_phone;
        const rAddress = data.data[i].address.formatted;
        const rGoogleAddress = rAddress.replace(/ /g, '+');
        const rWebsite = data.data[i].restaurant_website;
        let rlat = data.data[i].geo.lat;
        let rlon = data.data[i].geo.lon;
        let rCuisines;
        let rInnerHTML
        if (data.data[i].cuisines[0] != '') {
            rCuisines = data.data[i].cuisines;
            rInnerHTML = `
            <h1> ${rName} </h1> <br>
            Type of food: ${rCuisines[0]} <br>
            <a href="tel:${rPhone}">${rPhone}</a> <br> 
            <a href="http://maps.google.com/maps/place/${rGoogleAddress}/" target=”_blank>${rAddress}</a> <br>
            <a href="${rWebsite}" target=”_blank”>Website</a>
            `
        } else {
          rInnerHTML = `
          <h1> ${rName} </h1> <br>
          Type of food: Unlisted<br>
          <a href="tel:${rPhone}">${rPhone}</a> <br> 
          <a href="http://maps.google.com/maps/place/${rGoogleAddress}/" target=”_blank>${rAddress}</a> <br>
          <a href="${rWebsite}" target=”_blank”>Website</a>
          `
        }
        restaurantCardEl.innerHTML = rInnerHTML; 
        
        let markee = addMarker(rlat, rlon, rInnerHTML, data.data[i].restaurant_id);
        restaurantCardEl.addEventListener('mouseover', () => {
          if (markee.getAnimation() === null) {
            markee.setAnimation(google.maps.Animation.BOUNCE);
          }
        })
        restaurantCardEl.addEventListener('mouseout', () => {
            markee.setAnimation(null);
        })
        restaurantCardEl.addEventListener('click', function() {
          infoWindow.setContent(rInnerHTML);
          infoWindow.open(map, markee);
        });
        
        container.appendChild(restaurantCardEl);
      } 
    } else showModal(); 
  }

//add marker function, *utilize this within the card making function*
function addMarker(latitude, longitude, note, id) {
  let marker = new google.maps.Marker({
    map,
    position: {lat: latitude, lng: longitude},
    animation: google.maps.Animation.DROP,
    clickable: true, 
    id
  })
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(note);
    infoWindow.open(map, marker);
  });
  return marker;
}

//creates info window with details from each card
window.addEventListener('load', (event) => {
  infoWindow = new google.maps.InfoWindow({
    content: ''
  })
});

//searches a new zip code from the search input
function handleSearchFormSubmit(event) {
  event.preventDefault();
  var searchTextVal = document.querySelector('#search-text').value;
  if (!searchTextVal) {
    console.error('You need a search input value!');
    return;
  }
  searchRestaurant();
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

// Show modal if invalid zip code 
const modalBtn = document.querySelector(".modal-btn"); 
const modalBg = document.querySelector(".modal-bg"); 

function showModal() {
  modalBg.classList.add("modal-active"); 
}

// Close modal on button click 
document.querySelector(".modal-btn").addEventListener("click", function() {
  modalBg.classList.remove("modal-active"); 
})