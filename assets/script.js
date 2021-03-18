const container = document.querySelector(".card-container"); 
const buttonEl = document.getElementById('button')
const inputEl = document.getElementById('search-text')
var searchFormEl = document.querySelector('#search-form');


lastWindow=null;

//buttonEl.addEventListener('click', searchRestaruant);

function searchRestaruant () {
  let input = inputEl.value.trim()
  docuMenuURL = `https://api.documenu.com/v2/restaurants/zip_code/${input}?key=ce2dc71b6458503cfc0e34adfe844c3f`
  fetch(docuMenuURL)
  .then(response => {
    return response.json();
  })
  .then(request => {
    businessCards(request);
  });
};

//console.log(process.env.GOOGLEAPI)

let map;
let infoWindow;

//creates map that currently centers around Bellevue
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: 47.6137, lng: -122.19093},
    zoom: 13,
  });
}

//creates map that currently centers around Bellevue
function updateMap(lati, longi) {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: lati, lng: longi},
    zoom: 13,
  });
}

//creates the business cards for the left column
function businessCards (data) {
  container.innerHTML = ""
  let rlat = data.data[0].geo.lat;
  let rlon = data.data[0].geo.lon;
  updateMap(rlat, rlon)
  console.log(data)
  for (let i = 0; i <= 5; i++) {
        const restaurantCardEl = document.createElement("div"); 
        restaurantCardEl.classList.add("card"); 
        const rName = data.data[i].restaurant_name; 
        const rPhone = data.data[i].restaurant_phone;
        const rAddress = data.data[i].address.formatted;
        let rlat = data.data[i].geo.lat;
        let rlon = data.data[i].geo.lon;
        const rInnerHTML = `
        <h1> ${rName} </h1>
        <a href="tel:${rPhone}">${rPhone}</a> <br> 
        <a href="http://maps.google.com?q=${rlat},${rlon} "> Address: ${rAddress}</a>
        `
        restaurantCardEl.innerHTML = rInnerHTML; 
        container.appendChild(restaurantCardEl);
        addMarker(rlat, rlon, rInnerHTML)
}
}

//add marker function, *utilize this within the card making function*
function addMarker(latitude, longitude, note) {
  let marker = new google.maps.Marker({
    map: map,
    position: {lat: latitude, lng: longitude},
    clickable: true
  })
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(note);
    infoWindow.open(map, marker);
  });
}


window.addEventListener('load', (event) => {
  infoWindow = new google.maps.InfoWindow({
    content: ''
  })
});

//searches a new zip code from the search input
function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchTextVal = document.querySelector('#search-text').value;

  //use below if we have search options dropdown
/*   var formatInputVal = document.querySelector('#format-input').value; */

  if (!searchTextVal) {
    console.error('You need a search input value!');
    return;
  }
  searchRestaruant();
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);



