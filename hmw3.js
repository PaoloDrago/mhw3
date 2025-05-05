document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("menuButton");
    const dropdownMenu = document.getElementById("dropdownMenu");

    const areaPersonaleButton = document.getElementById("areaPersonaleButton");
    const areaPersonaleMenu = document.getElementById("areaPersonaleMenu");

    // Toggle menu sinistro
    menuButton.addEventListener("click", () => {
        dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
    });

    // Toggle menu destro (area personale)
    areaPersonaleButton.addEventListener("click", () => {
        areaPersonaleMenu.style.display = areaPersonaleMenu.style.display === "block" ? "none" : "block";
    });

    // Chiusura menu cliccando fuori
    document.addEventListener("click", (event) => {
        if (!menuButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.display = "none";
        }
        if (!areaPersonaleButton.contains(event.target) && !areaPersonaleMenu.contains(event.target)) {
            areaPersonaleMenu.style.display = "none";
        }
    });
});


const GNEWS_API_KEY = '5a2676113ef6d3dfcfe9ebfef061d186'; // ← Inserisci la tua chiave qui
const GNEWS_ENDPOINT = `https://gnews.io/api/v4/search?q=porsche&lang=it&country=it&max=5&apikey=${GNEWS_API_KEY}`;
async function fetchNews() {
  const newsList = document.getElementById('news-list');
  try {
    const res = await fetch(GNEWS_ENDPOINT);
    const data = await res.json();
    console.log(data); // log per debug
    if (!data.articles) throw new Error('Nessun articolo ricevuto');
    newsList.innerHTML = '';
    data.articles.forEach(article => {
      const li = document.createElement('li');
      li.innerHTML = `
        <a href="${article.url}" target="_blank">${article.title}</a>
        <p>${new Date(article.publishedAt).toLocaleDateString('it-IT')}</p>
      `;
      newsList.appendChild(li);
    });
  } catch (error) {
    console.error('Errore GNews:', error);
    newsList.innerHTML = 'Errore durante il caricamento delle notizie.';
  }
}

fetchNews();
setInterval(fetchNews, 300000); // aggiorna ogni 5 minuti


const apiKey = 'd6d0af6eaff180854ccf24268f5ab244';
const city = 'Catania';

fetch(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`)
  .then(response => response.json())
  .then(data => {
    if(data.success === false){
      throw new Error(data.error.info);
    }
    const temp = data.current.temperature;
    const description = data.current.weather_descriptions[0];
    const icon = data.current.weather_icons[0];

    document.querySelector('#weather').innerHTML = `
      <h3>Meteo a ${data.location.name}</h3>
      <img src = "${icon}" alt = "Icona meteo">
      <p>${description}, ${temp}°C</p>`;
  })
  .catch(error => {
    console.error('Errore:', error);
    document.querySelector('#weather').innerHTML = 'Errore durante il caricamento delle informazioni meteo.';
  });
  
