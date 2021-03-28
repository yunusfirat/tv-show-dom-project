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
        <li><strong>Rated</strong> :${show.rating.average}<li>
        <li><strong>Genres</strong> :${show.genres}<li>
        <li><strong>Status</strong> :${show.status}<li>
        <li><strong>Runtime</strong> :${show.runtime}<li>
      <ul>   
    </div>
  </div>`


})
let headers = document.querySelectorAll('.header')

headers.forEach(header => {
  header.addEventListener('click', function(e){
    let optionsvalue= e.currentTarget.dataset
    console.log(title);
    const rootElem = document.getElementById("root");
    let foundmovies = document.getElementById('moviescount');
    container.style.display = "none"
    foundmovies.innerHTML = ""
    rootElem.innerHTML = ""
    if (optionsvalue) {
      let url = `https://api.tvmaze.com/shows/${optionsvalue}/episodes`
      getFactAjax(url)
    }
    })
})

}



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
    let foundmovies = document.getElementById('moviescount');
    const container = document.querySelector('.container')
    let selectmovies = document.querySelector('#selectmovies')
    let back = document.querySelector('.back')
    back.style.display = "";
    selectmovies.style.display = "";
    foundmovies.innerHTML = ""
    rootElem.innerHTML = ""
    container.style.display = "none"
    let optionsvalue = e.currentTarget.value.toLowerCase();
    console.log(optionsvalue);
    if (optionsvalue) {
      let url = `https://api.tvmaze.com/shows/${optionsvalue}/episodes`
      getFactAjax(url)
    }
  }
}
let back = document.querySelector('.back')
back.addEventListener('click',reset)


function getFactAjax(url) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`something happen unexpected ${response.status}`)
      }
      return response.json();
    })
    .then(data => {
      console.log(data)
      makePageForEpisodes(data)

    })
    .catch(err => console.log(err));
}



function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  let select = document.querySelector('#selectmovies');
  let foundmovies = document.getElementById('moviescount');
  foundmovies.innerHTML = `Displaying ${episodeList.length}/${episodeList.length} episodes`
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
      let foundmovies = document.getElementById('moviescount');
      let cardValue = card.textContent.toLowerCase()
      if (cardValue.includes(optionsvalue)) {
        message.style.display = "none";
        card.style.display = "";
        count++
        foundmovies.innerHTML = `Displaying ${count}/${rootElem.children.length} episodes`
      } else if (optionsvalue === "") {
        reset();
        foundmovies.innerHTML = `Displaying ${count}/${rootElem.children.length} episodes`
      } else {
        card.style.display = "none";
        foundmovies.innerHTML = `Displaying ${count}/${rootElem.children.length} episodes`
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
