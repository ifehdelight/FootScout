const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsDiv = document.getElementById('results');

function renderPlayers(players) {
  resultsDiv.innerHTML = '';
  
  if (!players) {
    resultsDiv.innerHTML = '<p style="color: var(--text-2)">No players found</p>';
    return;
  }
  
  players.forEach(p => {
    if (p.strSport !== "Soccer") return;
    
    const imgSrc = p.strThumb || p.strCutout || 'https://via.placeholder.com/130x173/131722/8892A0?text=No+Photo';
    
    const card = document.createElement('div');
    card.className = 'player-card';
    card.innerHTML = `
      <img src="${imgSrc}" alt="${p.strPlayer}">
      <p class="player-infos">${p.strPlayer}</p>
      <p class="player-club">${p.strTeam || 'No Club'}</p>
    `;
    resultsDiv.appendChild(card);
  });
}

function searchPlayer() {
  const query = searchInput.value.trim();
  
  if (query.length < 2) {
    alert('Type at least 2 letters');
    return;
  }
  
  resultsDiv.innerHTML = '<p style="color: var(--text-2)">Searching...</p>';
  
  fetch('https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=' + query)
    .then(res => res.json())
    .then(data => {
      renderPlayers(data.player);
    })
    .catch(err => {
      resultsDiv.innerHTML = '<p style="color: var(--live)">Connection Error. Check your internet connection</p>';
      console.log(err);
    });
}

//searchBtn.onclick = searchPlayer;
searchInput.onkeypress = function(e) {
  if (e.key === 'Enter') searchPlayer();
};
