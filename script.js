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
  img.src = `${episode.image.medium}`
  div.classList.add('card');
  div.appendChild(h1);
  div.appendChild(img);
  div.appendChild(p);
  h1.innerHTML = `${episode.name}`;
  p.innerHTML = `${episode.summary}`
  rootElem.appendChild(div);
  

  })
}
window.onload = setup;
