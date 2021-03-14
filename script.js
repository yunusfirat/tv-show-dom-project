//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
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
  div.appendChild(h1);
  div.appendChild(img);
  div.appendChild(p);
  h1.innerHTML = `${episode.name} ${episodeCode}`;
  p.innerHTML = `${episode.summary}`
  img.src = `${episode.image.medium}`
  rootElem.appendChild(div);
  

  })
}
window.onload = setup;
