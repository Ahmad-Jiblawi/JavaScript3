'use strict';

//======= With XMLHttpRequest =======

(function() {
  const photoReq = new XMLHttpRequest();
  photoReq.open('GET', 'https://picsum.photos/400');
  photoReq.onload = function() {
    if(photoReq.response) {
    if(photoReq.status >= 200 && photoReq.status <= 299) {
      console.log(photoReq.responseURL);
      const image = document.querySelector('img');
      image.setAttribute('src', this.responseURL);
    }
    else {
      console.log('error')
    }
  }
}
  photoReq.send();
})();

//======= With axios =======

(() => {
  axios.get('https://picsum.photos/400')
  .then(function (response) {
    const image = document.querySelector('img');
    image.setAttribute('src', response.config.url);
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
})()