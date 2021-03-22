var searchFormEl = document.querySelector('#search-form');
const getHistory = document.querySelector("#get-history");
const clearHistoryBtnEl = document.querySelector(".clear-history");
clearHistoryBtnEl.addEventListener("click", clearHistory);

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchTextVal = document.querySelector('#search-text').value;

  if (!searchTextVal) {
    console.error('You need a search input value!');
    return;
  }

  var queryString = './search-results.html?q=' + searchTextVal;

  location.assign(queryString);
  updateHistory(searchTextVal);
}

function historyClick(event, zip) {
  event.preventDefault();
  var queryString = './search-results.html?q=' + zip;
  location.assign(queryString);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

function updateHistory(userZip){
  document.querySelector("#get-history").textContent = "";
  let storage = JSON.parse(localStorage.getItem("userInput"));
  let zipHistory=[userZip];
  if(storage != null){
      storage.forEach(zip=>{
          if (zip !== userZip){
            zipHistory.push(zip);
          }
      })
  }
    var jsonObject = JSON.stringify(zipHistory);
    localStorage.setItem("userInput", jsonObject);

  }
  
  function viewHistory(){
    getHistory.innerHTML="";
    var storage = JSON.parse(localStorage.getItem("userInput"));
    while (storage.length > 5) {
      storage.pop()
    }
    for (let i = 0; i < storage.length; i++) {      
      let displayHistory = document.createElement("div");
      let updateItem =
      `<button class="history-item btn" data-id="${storage[i]}"onclick="historyClick(event, ${storage[i]})">${storage[i]}</button>`;
      displayHistory.innerHTML = updateItem;
      getHistory.appendChild(displayHistory);
    }
      
}

function clearHistory(){
  localStorage.clear("userInput");
  localStorage.removeItem("userInput");
  getHistory.innerHTML="";
}

viewHistory();