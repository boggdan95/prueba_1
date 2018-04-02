var nombre, apellido, edad;

function athlete(nombre,apellido,edad){
  this.nombre = nombre;
  this.apellido  = apellido;
  this.edad = edad;
}

function startTrainning() {

}


//Verificar campos de entrada del usuario
function fillForm() {
    var message = document.getElementById("message");
    nombre = document.getElementById("name").value;
    apellido = document.getElementById('lastName').value;
    edad = document.getElementById('age').value;
    var error_fill = 0;
    message.innerHTML = "";

    try {
        if(nombre === "" || apellido === "")  throw "sus datos, por favor";
        if(typeof nombre !== "string" || typeof apellido !== "string")  throw "su nombre y apellido";
        if(edad <= 0)    throw "una edad válida";
    }
    catch(err) {
        message.innerHTML = "Ingrese " + err;
        error_fill = 1;
    }
    finally {
        document.getElementById("name").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("age").value = "";
    }
    //envio datos al servidor
    if(error_fill === 0){
      //sendToServer();
      message.innerHTML = "Se ha enviado su información exitosamente"
    }


}
