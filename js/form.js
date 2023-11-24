const form = document.getElementById("contact_form")
const validateForm = (e) => {
    const err = []
    // Limpiamos los errores
    form.querySelectorAll(".is-invalid").forEach(el => el.classList.remove("is-invalid"))

    // validamos el nombre
    const name = document.getElementById("nombre_de_usuario")
    if(name.value.length < 3) {
        err.push("El nombre debe tener al menos 3 caracteres")
        name.classList.add("is-invalid")
    }
    if(name.length > 30) {
        err.push("El nombre debe tener menos de 30 caracteres")
        name.classList.add("is-invalid")
    }

    // validamos el email
    const email = document.getElementById("email")

    if(!validateEmail(email.value)) {
        err.push("El email no es válido")
        email.classList.add("is-invalid")
    }
    // validamos el mensaje
    const message = document.getElementById("mensaje")

    if(message.value.length < 10) {
        err.push("El mensaje debe tener al menos 10 caracteres")
        message.classList.add("is-invalid")
    }
    
    if (err.length > 0) {
        e.preventDefault()
        showErrors(err)
    } 
}

const showErrors = (err) => {
    const errorsList = document.getElementById("errors")
    errorsList.innerHTML = ""
    err.forEach(error => {
        const li = document.createElement("li")
        li.innerText = error
        errorsList.appendChild(li)
    })
}

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

form.addEventListener("submit", validateForm)
