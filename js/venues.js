

// url de la API
const API_URL = "https://sheets.googleapis.com/v4/spreadsheets/1HQAPXrCWANrQqv8aaaGyZe7TVNaeAGBPr54GSd8kcMk/values/venues/?alt=json&key=AIzaSyBPbg-txQxQOjgftKPNBr1BwOuVEqkP-mg"

/** 
 *  trae los datos de la API, los parsea y los devuelve como un array de objetos
 * */
const getVenues = async () => {
  const response = await fetch(API_URL)
  const data = await response.json()
  // .splice(1) quita la primera fila de la tabla (que contiene los nombres de las columnas)
  const venueData =  data.values.splice(1).map(venue => ({
    id: venue[0],
    name: venue[1],
    description: venue[2],
    image: venue[3],
    lat: +venue[4],
    lng: +venue[5],
    address: venue[6]
  }))
  return venueData
}

/**
 * muestra los venues en el DOM (en la página index.html)
 * @param Array venues
 *  */ 
const listVenues = (venues) => {
  const venuesContainer = document.getElementById("venues")
  // itera sobre los objetos recibidos y los muestra en el DOM
  venues.forEach(venue => {
    const venueDiv = document.createElement("div")
    venueDiv.innerHTML = `
        <a href="venue.html?id=${venue.id}" style="color: white;">
          <div class="card-box">
            <img src="${venue.image}" alt="${venue.name}">
            <div class="card-box-info offer-30">
              <p>${venue.name}</p>
              <a href="contact.html" class="btn">Contactar</a>
            </div>
          </div>
        </a>
    `
    venuesContainer.appendChild(venueDiv)
  })
}

/**
 * muestra el mapa de un venue en el DOM (en la página venue.html)
 * @param Object venue 
 */
const showVenueMap = (venue) => {
  var coord = {lat: venue.lat, lng: venue.lng};
  var map = new google.maps.Map(document.getElementById('map'),{
    zoom: 15,
    center: coord
  });
  var marker = new google.maps.Marker({
    position: coord,
    map: map
  });
}
const getVenueById = async (id) => {
  // obtenemos los datos de la API
  const venues = await getVenues()

  // buscamos el objeto que tiene el id que recibimos por url
  return venues.find(venue => venue.id === id)
}

/**
 * Muestra los datos de un venue en el DOM (en la página venue.html)
 */
const showVenueDetails = async () => {

  // obtenemos el id de la url
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const id = urlParams.get("id")

  const venue = await getVenueById(id)

  // mostramos los datos del objeto en el DOM
  const venueContainer = document.getElementById("venue")
  venueContainer.innerHTML = `
    <div class="col-md-6">
      <img src="${venue.image}" alt="${venue.name}" class="encabezado">
    </div>
    <div class="col-md-6">
      <h2>${venue.name}</h2>
      <p>${venue.description}</p>
      <p>${venue.address}</p>
    </div>
  `
  showVenueMap(venue)
}



