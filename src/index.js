document.addEventListener('DOMContentLoaded', function(){
  const imgUrl = 'https://dog.ceo/api/breeds/image/random/4';
  const breedUrl = 'https://dog.ceo/api/breeds/list/all';

  const dogSelector = document.getElementById('breed-dropdown');
  const dogBreedsUl = document.getElementById('dog-breeds');
  const dogImageDiv = document.getElementById('dog-image-container');
  let breeds = [];

    fetch(imgUrl)
    .then(function(response){
      return response.json()
    })
    .then(function(json){
      let images = json.message;
      return images;
    })
    .then(renderAllDogs);

    function renderAllDogs(images){
      images.forEach(function(image){
        dogImageDiv.innerHTML += `
        <img src="${image}">
        `
      })
    }

    fetch(breedUrl)
    .then(function(response){
      console.log(response);
      console.log(response.json);
      return response.json();
    })
    .then(function(json){
      breeds = Object.keys(json.message);
      return breeds;
    })
    .then(renderBreeds);

    function renderBreeds(breeds){
      dogBreedsUl.innerHTML = '';
      breeds.forEach(function(breed){
        dogBreedsUl.innerHTML += `
        <li>${breed}</li>
        `
      })
    };


    dogBreedsUl.addEventListener('click', function(e){
      if(e.target.tagName === "LI"){
        e.target.style.color = "blue";
      }
    });

    dogSelector.addEventListener('input', function(e){
      let filteredBreeds = breeds.filter(function(breed){
          return breed.startsWith(e.target.value);
      })
      renderBreeds(filteredBreeds);
    })
});
