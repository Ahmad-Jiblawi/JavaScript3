'use strict';

//======= With XMLHttpRequest =======

(function() {
  const kittenReq = new XMLHttpRequest();
  kittenReq.open('GET', 'https://wwww.placekitten.com/api');
  kittenReq.onload = () => {
    if (kittenReq.response) {
      if (kittenReq.status >= 200 && kittenReq.status <= 299) {
        console.log(kittenReq.response);
      } else {
        console.log('Error');
      }
    }
  };
  kittenReq.onerror = () => {console.log('Error : The page is not found')};
  kittenReq.send();
})();

//======= With axios =======

(() => {
  axios.get('https://wwww.placekitten.com/api')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log('Error: The page is not found');
  });
})()