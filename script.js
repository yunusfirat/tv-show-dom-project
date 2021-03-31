//You can edit ALL of the code here
function setup() {
  let back = document.querySelector('.back')
  back.style.display = "none";
  let selectmovies = document.querySelector('#selectmovies')
  selectmovies.style.display = "none";
  const allShows = getAllShows()
  getShowId(allShows)
  displayAllShows(allShows);
}
function showcount(count){
  let countElement = document.getElementById('countmovie');
  countElement.innerHTML = `${count}`;
}

function displayAllShows(displayAll){
let container = document.querySelector('.container');

displayAll.forEach(show => {
  let image = show.image !== null ? show.image.medium : ""  
  container.innerHTML +=
   `<div class = "showcard">
    <div class="showname">
        <h1 class="header" data-id="${show.id}">${show.name}</h1>
        <image src =${image} alt = ${show.name} />
    </div>
    <div class="summary"><p>${show.summary}</p></div>
    <div class= "smallcard"> 
      <ul>
        <li><strong>Rated</strong> : ${show.rating.average}<li>
        <li><strong>Genres</strong> : ${show.genres}<li>
        <li><strong>Status</strong> : ${show.status}<li>
        <li><strong>Runtime</strong> : ${show.runtime}<li>
      <ul>   
    </div>
  </div>`


})
  let countElement = document.getElementById('countmovie');
  let countElementtwo = document.getElementById('countallmovie');
  countElement.innerHTML = `${displayAll.length}`;
  countElementtwo.innerHTML = `${displayAll.length} Shows`;
  let headers = document.querySelectorAll('.header')

headers.forEach(header => {
  header.addEventListener('click', function(e){
    let selectvalue= e.currentTarget.dataset
    let selectValue  = selectvalue.id;
    const rootElem = document.getElementById("root");
    selectmovies.style.display = "";
    container.style.display = "none"
    rootElem.innerHTML = ""
    if (selectValue) {
      let url = `https://api.tvmaze.com/shows/${selectValue}/episodes`
      getFactAjax(url)
    }
    })
})

let input = document.querySelector('#moviesearch');
input.addEventListener('input', findepisode)

function findepisode(e) {
  let showcards = document.querySelectorAll(".showcard");
  let optionsvalue = e.currentTarget.value.toLowerCase();
  let count = 0;
  let message = document.querySelector(".message");
  let footer = document.querySelector(".footer");
  showcards.forEach(card => {
    let cardValue = card.textContent.toLowerCase()
    if (cardValue.includes(optionsvalue)) {
      message.style.display = "none";
      card.style.display = "";
      count++
    showcount(count)
    } else if (optionsvalue === "") {
      reset();
    showcount(count)
    } else {
      card.style.display = "none";
    showcount(count)
    }
  })
  if (count == 0) {
    message.style.display = "";
    message.style.display = "margin-top:100px;"
    footer.style.display = "none"
  }
}}



function getShowId(allShows) {
  const flex = document.querySelector('.flex')
  let selectElement = document.createElement('select');
  selectElement.innerHTML = `<option>Please select show to view.</option>`
  selectElement.classList.add('view')
  let sortedshows = allShows.sort(sortoptions)
  sortedshows.forEach(show => {
    let optionElement = document.createElement('option');
    optionElement.innerHTML = `${show.name}`
    optionElement.value = `${show.id}`
    selectElement.appendChild(optionElement)
    flex.insertAdjacentElement('afterBegin', selectElement);
  })

  function sortoptions(firstShow, secondShow) {
    let first = firstShow.name.toLowerCase();
    let second = secondShow.name.toLowerCase();
    if (first > second) {
      return 1
    } else if (second > first) {
      return -1
    } else {
      return 0
    }

  }

  let view = document.querySelector('.view');
  view.addEventListener('change', getvalue)

  function getvalue(e) {
    const rootElem = document.getElementById("root");
    const container = document.querySelector('.container')
    let selectmovies = document.querySelector('#selectmovies')
    let back = document.querySelector('.back')
    back.style.display = "";
    selectmovies.style.display = "";
    rootElem.innerHTML = ""
    container.style.display = "none"
    let optionsvalue = e.currentTarget.value.toLowerCase();
    if (optionsvalue) {
      let url = `https://api.tvmaze.com/shows/${optionsvalue}/episodes`
      getFactAjax(url)
    }
  }
}
let back = document.querySelector('.back')
back.addEventListener('click',reset)


function getFactAjax(url) {
  let back = document.querySelector('.back')
    back.style.display = "";
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`something happen unexpected ${response.status}`)
      }
      return response.json();
    })
    .then(data => {
      makePageForEpisodes(data)
    })
    .catch(err => console.log(err));
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  let select = document.querySelector('#selectmovies');
  let countElement = document.getElementById('countmovie');
  let countElementtwo = document.getElementById('countallmovie');
  countElement.innerHTML = `${episodeList.length}`;
  countElementtwo.innerHTML = `${episodeList.length} Episodes`;
  select.innerHTML = `<option id="option" value="">Select Episodes</option>`
  rootElem.innerHTML = ""
  episodeList.forEach(episode => {
    const seasonNumber = episode.season > 9 ? episode.season : "0" + episode.season
    const episodeNumber = episode.number > 9 ? episode.number : "0" + episode.number
    let h1 = document.createElement('h1');
    let div = document.createElement('div');
    let img = document.createElement('img');
    let p = document.createElement('p');
    let a = document.createElement('a')
    let options = document.createElement('option')
    const episodeCode = `S${seasonNumber}E${episodeNumber}`;
    let select = document.querySelector('#selectmovies');
    div.classList.add('card');
    h1.classList.add('h1');
    div.appendChild(h1);
    div.appendChild(img);
    div.appendChild(p);
    div.appendChild(a);
    p.innerHTML = `${episode.summary}`
    img.src = `${episode.image.medium}`
    h1.innerHTML = `${episode.name} - ${episodeCode}`;
    options.value = `${h1.innerHTML}`
    options.innerHTML = `${episodeCode} - ${episode.name}`
    a.href = `${episode.url}`;
    a.innerHTML = "Click for details"
    select.appendChild(options);
    rootElem.appendChild(div);
  })

  let input = document.querySelector('#moviesearch');
  
  input.addEventListener('input', findepisode)
  input.addEventListener('click', findepisode)
  input.addEventListener('click', resetsearch)
  select.addEventListener('change', findepisode)

  function resetsearch() {
    let select = document.querySelector('#selectmovies');
    select.selectedIndex = 0
  }
  


  function findepisode(e) {
    let cards = document.querySelectorAll(".card");
    let optionsvalue = e.currentTarget.value.toLowerCase();
    let count = 0;
    let message = document.querySelector(".message");
    let footer = document.querySelector(".footer");

    cards.forEach(card => {
      let cardValue = card.textContent.toLowerCase()
      if (cardValue.includes(optionsvalue)) {
        message.style.display = "none";
        card.style.display = "";
        count++
        showcount(count)
      } else if (optionsvalue === "") {
        reset();
        showcount(count)
      } else {
        card.style.display = "none";
        showcount(count)
      }
    })
    if (count == 0) {
      message.style.display = "";
      message.style.display = "margin-top:100px;"
      footer.style.display = "none"
    }
  }



}

function reset() {
  document.location.reload();
}
window.onload = setup;
