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

  let select = document.querySelector('#selectmovies');
  let input = document.querySelector('#moviesearch');

  input.addEventListener('keyup', findmovie)
  select.addEventListener('change', findmovie)

  function findmovie(e) {
    let cards = document.querySelectorAll(".card");
    let optionsvalue = e.currentTarget.value.toLowerCase();
    let count = 0;
    cards.forEach(card => {
      let foundmovies = document.getElementById('moviescount');
      let h1Value = card.textContent.toLowerCase()
      if (h1Value.includes(optionsvalue)) {
        card.style.display = "";
        count++
        foundmovies.innerHTML = `Displaying ${count}/${rootElem.children.length} movies`
      } else if (optionsvalue === "") {
        card.style.display = "";
        reset();
        count++
        foundmovies.innerHTML = `Displaying ${count}/${rootElem.children.length} movies`
      }
      else {
        card.style.display = "none";
      }
    })
  }
}

function reset() {
  document.location.reload();
}


window.onload = setup;
