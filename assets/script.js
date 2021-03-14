let map;

function initMap() {
  //creates map that currently centers around Bellevue
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 47.6137, lng: -122.19093 },
    zoom: 13,
  });

  //starts creating markers
/*   let marker = new google.maps.Marker({
    position: {lat: 47.61575076969564, lng: -122.18219365835807},
    map: map
  }) */

  let infoWindow = new google.maps.InfoWindow({
    content:`<h1>Uwajimaya</h1> <p> Asian food here</p>`
  })

/*   marker.addListener('click', function () {
    infoWindow.open(map, marker)
  }) */

  let uwajlat = 47.6157507;
  let uwajlgn = -122.182193;



  addMarker(uwajlat, uwajlgn)

  //add marker function, *utilize this within the card making function*
  function addMarker(latitude, longitude) {
    let marker = new google.maps.Marker({
      position: {lat: latitude, lng: longitude},
      map: map
    })
  }
}
