const container = document.querySelector(".card-container"); 
const buttonEl = document.getElementById('button')
const inputEl = document.getElementById('search-text')
var searchFormEl = document.querySelector('#search-form');

//buttonEl.addEventListener('click', test);

function test () {
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

function initMap() {
  //creates map that currently centers around Bellevue
  map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: 47.6137, lng: -122.19093},
    zoom: 13,
  });
}

//creates the business cards for the left column
function businessCards (data) {
  container.innerHTML = ""
  let rlat = data.data[0].geo.lat;
  let rlon = data.data[0].geo.lon;

  console.log(data)
  for (let i = 0; i <= 5; i++) {
        const restaurantCardEl = document.createElement("div"); 
        restaurantCardEl.classList.add("card"); 
        const rName = data.data[i].restaurant_name; 
        const rPhone = data.data[i].restaurant_phone;
        const rAddress = data.data[i].address.formatted;
        let rlat = data.data[i].geo.lat;
        let rlon = data.data[i].geo.lon;
        console.log(rName); 
        const rInnerHTML = `
        <h1> ${rName} </h1>
        <a href="tel:${rPhone}">${rPhone}</a> <br> 
        <a href="http://maps.google.com?q=${rlat},${rlon} "> Address: ${rAddress}</a>
        `
        restaurantCardEl.innerHTML = rInnerHTML; 
        container.appendChild(restaurantCardEl);
        addMarker(rlat, rlon)
}
}


//add marker function, *utilize this within the card making function*
function addMarker(latitude, longitude) {
  let marker = new google.maps.Marker({
    position: {lat: latitude, lng: longitude},
    map: map
})
}

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchTextVal = document.querySelector('#search-text').value;

  //use below if we have search options dropdown
/*   var formatInputVal = document.querySelector('#format-input').value; */

  if (!searchTextVal) {
    console.error('You need a search input value!');
    return;
  }
  test();
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

/* UTILIZE FOR POP UP WINDOWS LATER
  let infoWindow = new google.maps.InfoWindow({
    content:`<h1>Uwajimaya</h1> <p> Asian food here</p>`
  })

   marker.addListener('click', function () {
    infoWindow.open(map, marker)
  }) */
