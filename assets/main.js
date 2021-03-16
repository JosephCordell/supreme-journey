var searchFormEl = document.querySelector('#search-form');

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchTextVal = document.querySelector('#search-text').value;

  //use below if we have search options dropdown
/*   var formatInputVal = document.querySelector('#format-input').value; */

  if (!searchTextVal) {
    console.error('You need a search input value!');
    return;
  }

  var queryString = './search-results.html?q=' + searchTextVal/*  + '&format=' + formatInputVal */;

  location.assign(queryString);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);