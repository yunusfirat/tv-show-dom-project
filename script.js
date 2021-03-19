//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  episodeList.forEach(episode => {
    const seasonNumber = episode.season > 9 ? episode.season : "0" + episode.season
    const episodeNumber = episode.number > 9 ? episode.number : "0" + episode.number
    let h1 = document.createElement('h1');
    let div = document.createElement('div');
    let img = document.createElement('img');
    let p = document.createElement('p');
    let options = document.createElement('option')
    const episodeCode = `S${seasonNumber}E${episodeNumber}`;
    let select = document.querySelector('#selectmovies');
    div.classList.add('card');
    h1.classList.add('h1');
    div.appendChild(h1);
    div.appendChild(img);
    div.appendChild(p);
    p.innerHTML = `${episode.summary}`
    img.src = `${episode.image.medium}`
    h1.innerHTML = `${episode.name} - ${episodeCode}`;
    options.value = `${h1.innerHTML}`
    options.innerHTML = `${h1.innerHTML}`
    select.appendChild(options);
    rootElem.appendChild(div);
  })

  let input = document.querySelector('#moviesearch')
  input.addEventListener('keyup', findmovies) 
  
    function findmovies () {
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
  }

  let select = document.querySelector('#selectmovies');
  select.addEventListener('change', findmovie)
  
  function findmovie(e) {
    let cards = document.querySelectorAll(".card");
    let optionsvalue = e.currentTarget.value.toLowerCase();
    console.log(optionsvalue);
    cards.forEach(card => {
      let h1Value = card.textContent.toLowerCase()
      if (h1Value.includes(optionsvalue)) { 
        card.style.display = "";
      }else if(optionsvalue === ""){
        card.style.display = "";
        reset();
      }
       else {
        card.style.display = "none";
      }
    })
  }
}

function reset(){
  document.location.reload();
}


window.onload = setup;
