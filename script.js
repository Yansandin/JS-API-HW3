const photoContainer = document.getElementById("photo-container");
let page = localStorage.getItem('page') ? parseInt(localStorage.getItem('page')) : 1;
let counter = 0;
let isFetching = false;

async function fetchPhotos() {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos?page=${page}&per_page=1&client_id=2MRjIgo0b27bKNqWvkz6aXeCjO5HNNxedMqehBxFP7M`
    );
    const photos = await response.json();
    return photos;
  } catch (error) {
    console.error("Ошибка при загрузке фотографий:", error);
    return [];
  } finally {
    isFetching = false;
  }
}

async function loadPhoto() {
  isFetching = true;
  const data = await fetchPhotos();
  data.forEach((photo) => {
    photoContainer.insertAdjacentHTML('beforebegin'
        , `<img class="photo" src="${photo.urls.small}" alt="${photo.alt_description}">
        <div class="photo-content"> <p>${photo.user.name}</p> <button class="like"><?xml version="1.0" encoding="UTF-8"?>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Bold" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" width="30" height="30">
            <path d="M485.379,170.88c-22.148-27.445-55.547-43.367-90.815-43.293H351.25l1.913-11.222c7.798-45.716-22.94-89.097-68.656-96.895  c-5.03-0.858-10.128-1.256-15.23-1.188c-32.056-0.167-61.464,17.761-76.001,46.332l-32.135,62.973h-44.249  C52.364,127.658,0.07,179.951,0,244.48v106.266c0.07,64.529,52.364,116.822,116.892,116.892H372.1  c55.158-0.2,102.743-38.764,114.363-92.685l22.465-106.266C516.299,234.201,507.639,198.232,485.379,170.88z M63.759,350.745V244.48  c0-29.344,23.788-53.133,53.133-53.133h31.88v212.531h-31.88C87.548,403.878,63.759,380.09,63.759,350.745z M446.549,255.489  l-22.486,106.266c-5.273,24.506-26.897,42.035-51.964,42.124H212.531V167.139l37.533-73.557c3.978-7.446,11.886-11.937,20.318-11.54  c11.174,0.007,20.227,9.072,20.22,20.246c-0.001,1.128-0.096,2.254-0.284,3.366l-14.601,85.693h118.847  c29.344-0.003,53.135,23.783,53.138,53.127C447.703,248.176,447.316,251.867,446.549,255.489L446.549,255.489z"/>
            </svg>
            </button> <p class="counter">${counter}</p></div>`
    )
  });
  addEventListeners();
  page++;
  localStorage.setItem('page', page);
}


function addEventListeners() {
    const likeButton = document.querySelector('.like');
    const counterEl = document.querySelector('.counter');
   likeButton.addEventListener('click', () => {
      counter++;
      counterEl.textContent = counter;
    });
  }


  window.addEventListener('DOMContentLoaded',()=>{
    loadPhoto();
  })

