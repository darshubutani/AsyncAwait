'use strict';
//  Ajax call XMLhttp request
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const request = new XMLHttpRequest();
request.open('GET','https://restcountries.com/v3.1/name/india');
request.send();

request.addEventListener('load', function(){
    const[data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `<article class="country">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${(data.name.nativeName.hin.common)}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(data.population/1000000).toFixed(2)} M people</p>
      <p class="country__row"><span>🗣️</span>${data.languages.hin}</p>
      <p class="country__row"><span>💰</span>${data.currencies.INR.name}</p>
    </div>
  </article>`
  
  countriesContainer.insertAdjacentHTML('beforeend',html);
  countriesContainer.style.opacity = 1;
});

////////////////////////////////////////////////////////////////////
// Callback hell
const renderCountry= function (data,className = '') {
      const html = `
    <article class="country  ${className}">
    <img class="country__img" src="${data.flags.png}" />
         <div class="country__data">
          <h3 class="country__name">${(data.name.common)}</h3>
           <h4 class="country__region">${data.region}</h4>
       <p class="country__row"><span>👫</span>${(data.population/1000000).toFixed(2)} M people</p>
      </div>
    </article>
    `;
      countriesContainer.insertAdjacentHTML('beforeend', html);
      countriesContainer.style.opacity = 1;
    };
  
  const getCountryAndNeighbour = function () {
    // AJAX call country 1
    const request = new XMLHttpRequest();
    request.open('GET', 'https://restcountries.com/v3.1/name/india');
    request.send();
    request.addEventListener('load', function () {
      const [data] = JSON.parse(this.responseText);
      console.log(data);
      // Render country 1
      renderCountry(data);
     // Get neighbour country (2)
       const neighbour = 'nepal';
       if (!neighbour) return;
    //   AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', 'https://restcountries.com/v3.1/name/nepal');
    request2.send();
    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2[0]);
      renderCountry(data2[0], 'neighbour');
    });
  });
};
 getCountryAndNeighbour();

////////////////////////////////////////////////////////////////////////
Promises (Chaining Promises)
 
const getCountryData = function(){
    fetch('https://restcountries.com/v3.1/name/india')
    .then(response => response.json()) 
    .then (data => {
         renderCountry(data[0]);
      return fetch('https://restcountries.com/v3.1/name/nepal');
     })
    .then(response => response.json())
    .then (data => renderCountry(data[0],'neighbour'))
};
getCountryData();


  
