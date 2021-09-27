let documentListContainer = document.getElementById("document-list");

let getFormatName = function () {
  let queryString = document.location.search;
  let collectionName = queryString.split('=')[2];
  let queryCondition = queryString.split('=')[1].split('&')[0];
  console.log(queryString);
  console.log(collectionName);
  console.log(queryCondition);

  if (collectionName) {
    getDocuments(collectionName,queryCondition);
  } 
};

let getDocuments = function (collectionName,queryCondition) {
  let apiUrl = 'https://www.loc.gov/' + collectionName + '/?q=' + queryCondition + '&fo=json';
console.log(apiUrl);
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
          console.log(data.results);
            displayResults(data.results);
      });
    } else {
      document.location.replace('./index.html');
    }
  });
};

let displayResults = function (results) {
  if (results.length === 0) {
    return;
  }
  console.log(documentListContainer);
  console.log(results.length );

  for (let i = 0; i < results.length; i++) {
    let issueEl = document.createElement('div');
    issueEl.classList = 'row p2 m1 d-flex';

    let titleEl = document.createElement('p');
    titleEl.textContent = results[i].title;
    titleEl.classList = 'p-1 ml-3';
    issueEl.appendChild(titleEl);

    let dateEl = document.createElement('p');
    dateEl.textContent = results[i].date;
    dateEl.classList = 'p-1 ml-3';
    issueEl.appendChild(dateEl);

    let descEl = document.createElement('p');
    descEl.textContent = results[i].description;
    descEl.classList = 'p-1 ml-3 d-flex';
    issueEl.appendChild(descEl);

    let urlEl = document.createElement('button');
    urlEl.textContent = "Read More";
    urlEl.classList = "btn btn-dark";
    urlEl.setAttribute('data-attribute', results[i].url);
    urlEl.addEventListener("click",function(event){

    });
    issueEl.appendChild(urlEl);


    documentListContainer.appendChild(issueEl);
    console.log(issueEl);
    console.log(documentListContainer);
    
  }
};


getFormatName();
