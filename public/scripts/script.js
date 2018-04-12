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

//Instrucciones dependiendo el juego seleccionado
function selectGame(value){
  var contenido = document.getElementById('content');
  if (value === 1){
    console.log("Boton 1");
    contenido.innerHTML = "<p class=instruccion>Este juego consiste en un tipo de entrenamiento sencillo, donde solo utilizaremos un módulo. El módulo se encenderá de un <strong>único color</strong> y en cuanto encienda, usted debe reaccionar para desactivarlo. Esto sucederá dentro de un intervalo de <strong>1 minuto y medio</strong>, la  cantidad de veces que se encenderá el módulo variará entre <strong>10 a 25</strong> repeticiones. El tiempo a medir es el que transcurre desde que se activo la luz hasta desactivarla mediante un toque. Si tarda más de 3 segundos en módulo se desactivará automaticamente y esperará hasta su siguiente activación para ser apagado por el atleta.</p><button class=button_game>Continuar</button>";
  }
  else if (value === 2){
    console.log("Boton 2");
    contenido.innerHTML = "<p class=text2>Instrucciones 2</p><button class=button_game>Continuar</button>";

  }
  else if (value === 3){
    console.log("Boton 3");
    contenido.innerHTML = "<p class=text2>Instrucciones 3</p><button class=button_game>Continuar</button>";
  }
}
