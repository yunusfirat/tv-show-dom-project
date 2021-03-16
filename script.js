//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  selectItem(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  episodeList.forEach(episode => {
    let h1 = document.createElement('h1');
    let div = document.createElement('div');
    let img = document.createElement('img');
    let p = document.createElement('p');
    let episodeCode = `S0${episode.season}E0${episode.number}`;
    div.classList.add('card');
    h1.classList.add('h1');
    div.appendChild(h1);
    div.appendChild(img);
    div.appendChild(p);
    h1.innerHTML = `${episode.name} - ${episodeCode}`;
    p.innerHTML = `${episode.summary}`
    img.src = `${episode.image.medium}`
    rootElem.appendChild(div);
  })
  let input = document.querySelector('#moviesearch')
  input.addEventListener('keyup', function () {
    let cards = document.querySelectorAll(".card");
    let count = 0;
    let filter = input.value.toUpperCase();
    cards.forEach(card => {
    let h1Value = card.childNodes[0].textContent || card.childNodes[0].innerHTML
    let pValue = card.childNodes[2].textContent || card.childNodes[2].innerHTML;
    let foundmovies = document.getElementById('moviescount');
      if (h1Value.toUpperCase().indexOf(filter) > -1 || pValue.toUpperCase().indexOf(filter) > -1) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
      let check = card.style.display === "none"
      if (check === false) {
        count = count + 1;
      }
      foundmovies.innerHTML = `Displaying ${count}/${rootElem.children.length} movies`
    })

  })
}

function selectItem(episodes){
  episodes.forEach(episode => {
    let select = document.querySelector('#selectmovies');
    let options = document.createElement('option')
    let h1 = document.querySelector('.h1')
    let episodeCode = `S0${episode.season}E0${episode.number}`;
    h1.innerHTML = `${episode.name} - ${episodeCode}`;
    options.value = `${h1.innerHTML}`
    options.innerHTML = `${h1.innerHTML}`
    select.appendChild(options);
  })
    let select = document.querySelector('#selectmovies');
    select.addEventListener('click', function(event){
    event.preventDefault;
    let cards = document.querySelectorAll(".card");
    let optionsvalue = select.options[select.options.selectedIndex].value;
    cards.forEach(card => {
    let h1Value = card.childNodes[0].innerHTML;
      if(optionsvalue.includes(h1Value)){
        card.style.display = "";
        card.style.width = "50%";
      }else{
        card.style.display = "none";
      }
    })
    })

}


window.onload = setup;
