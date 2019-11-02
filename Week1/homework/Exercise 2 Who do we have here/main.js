'use strict';

//======= With XMLHttpRequest =======

(function() {
  const personReq = new XMLHttpRequest();
  personReq.open('GET', 'https://www.randomuser.me/api');
  personReq.responseType = 'json';
  personReq.onload = function() {
    if (personReq.response) {
      if (personReq.status >= 200 && personReq.status <= 299) {
        console.log(personReq.response);
      } else {
        console.log('error');
      }
    }
  };
  personReq.onerror = () => {console.log(`Error`)};
  personReq.send();
})();

//======= With axios =======

(() => {
  axios.get('https://www.randomuser.me/api')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
})()