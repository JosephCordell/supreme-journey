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

function searchRestaurant() {
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


//creates map that currently centers around Bellevue
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: 47.6137, lng: -122.19093},
    zoom: zoomLevel,
  });
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
        console.log(rGoogleAddress)
        const rWebsite = data.data[i].restaurant_website;
        let rlat = data.data[i].geo.lat;
        let rlon = data.data[i].geo.lon;
        let rCuisines;
        if (data.data[i].cuisines[0] != '') {
            rCuisines = data.data[i].cuisines;
            const rInnerHTML = `
            <h1> ${rName} </h1> <br>
            Type of food: ${rCuisines[0]} <br>
            Phone Number: <a href="tel:${rPhone}">${rPhone}</a> <br> 
            Address: <a href="http://maps.google.com/maps/place/${rGoogleAddress}/" target=”_blank>${rAddress}</a> <br>
            Website Link: <a href="${rWebsite}" target=”_blank”>Website</a>
            `
            restaurantCardEl.innerHTML = rInnerHTML; 
            container.appendChild(restaurantCardEl);
            addMarker(rlat, rlon, rInnerHTML)
        } else {
          const rInnerHTML = `
          <h1> ${rName} </h1> <br>
          Type of food: Unknown<br>
          Phone Number: <a href="tel:${rPhone}">${rPhone}</a> <br> 
          Address: <a href="http://maps.google.com/maps/place/${rGoogleAddress}/" target=”_blank>${rAddress}</a> <br>
          Website Link: <a href="${rWebsite}" target=”_blank”>Website</a>
          `
          restaurantCardEl.innerHTML = rInnerHTML; 
          container.appendChild(restaurantCardEl);
          addMarker(rlat, rlon, rInnerHTML)
        }
  }
}

//add marker function, *utilize this within the card making function*
function addMarker(latitude, longitude, note) {
  let marker = new google.maps.Marker({
    map: map,
    position: {lat: latitude, lng: longitude},
    animation: google.maps.Animation.DROP,
    clickable: true
  })
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(note);
    infoWindow.open(map, marker);
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
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
  searchRestaurant();
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);


//trying to make the markers bounce, it's not working yet :( 
$(".card").hover(
  function() {
      $(this).addClass('active');
  }, function() {
      $( this ).removeClass('active');
  }
  );


