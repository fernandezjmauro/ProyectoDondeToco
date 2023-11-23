let formulario = document.getElementsByName("formulario")

let validarNombre = function (e) {
  if ((formulario.nombre.value == "")) {
      alert("Faltan completar espacios del formulario")
      e.preventDefault()
      }
  }

let validar = function (e) {  // "e" es el evento recibido del form (https://developer.mozilla.org/es/docs/Web/API/Event/preventDefault)
  validarNombre(e)
  }


function iniciarMap(){
    var coord = {lat:-34.6027394 ,lng: -58.420759};
    var map = new google.maps.Map(document.getElementById('map'),{
      zoom: 10,
      center: coord
    });
    var marker = new google.maps.Marker({
      position: coord,
      map: map
    });
}

formulario.addEventListener("submit", validar)

function iniciarMap2(){
  var coord = {lat:-34.596046 ,lng: -58.393559};
  var map = new google.maps.Map(document.getElementById('map'),{
    zoom: 10,
    center: coord
  });
  var marker = new google.maps.Marker({
    position: coord,
    map: map
  });
}