


let pantalla = document.querySelector("canvas");
let botonNuevoJuego = document.getElementById("btn-nuevo-juego").style.display = "none"
let btnSalirDesaparecer = document.getElementById("btn-salir").style.display = "none"
let divAgregarPalabra = document.getElementById("agregar-palabra").style.display = 'none';
let btnNuevoJuego = document.getElementById("btn-nuevo-juego");
let btnSalir = document.getElementById("btn-salir");
let btnCancelar = document.getElementById("btn-cancelar");


var palabras = ['NOTEBOOK', 'CURSO', 'HTML', 'CSS', 'CANVAS', 'DESAFIO'];
var tablero = document.getElementById('horca').getContext('2d');
var palabraSecreta = "";
var letras = [];
var palabraCorrecta = "";
var errores = 8;
let letrasIncorrectas = [];
let numeroDeErrores = 8;
let letraElegida = [];



document.getElementById("iniciar-juego").onclick = () => {
  iniciarJuego();
}

document.getElementById("btn-guardar").onclick = () => {
  guardarPalabra();
}




btnNuevoJuego.addEventListener("click", function () {
  //location.reload();
  palabraSecreta = "";
  letras = [];
  palabraCorrecta = "";
  errores = 8;
  letrasIncorrectas = [];
  numeroDeErrores = 8;
  letraElegida = [];

  iniciarJuego();


});





btnSalir.addEventListener("click", function () {
  location.reload();
});

btnCancelar.addEventListener("click", function () {
  location.reload();
});


function escojerPalabraSecreta() {
  let palabra = palabras[Math.floor(Math.random() * palabras.length)];
  palabraSecreta = palabra;
  return palabra;
}


function verificarLetraClicada(key) {
  if (letras.length < 1 || letras.indexOf(key) < 0) {
    letras.push(key);
    return false;
    
  }
  else {
    letras.push(key);
    return true;
  }
}

function agregarLetraCorrecta(i) {
  palabraCorrecta += palabraSecreta[i].toUpperCase();
}

function agregarLetraIncorrecta(letter) {
  if (palabraSecreta.indexOf(letter) <= 0) {
    errores -= 1;
  }
}


function verificarFinJuego(letra) {

 if(letraElegida.length < palabraSecreta.length) { 

    letrasIncorrectas.push(letra);

    if (letrasIncorrectas.length > numeroDeErrores) {
      perdiste();
    }
    else if(letraElegida.length < palabraSecreta.length) {
      agregarLetraIncorrecta(letra);
      mostrarLetraIncorrecta(letra, errores);
    }
  }

 } 


function verificarVencedor(letra) {
  letraElegida.push(letra.toUpperCase());
  if (letraElegida.length == palabraSecreta.length) {
    ganaste();
  }

}


function verificarLetra(keyCode) {
  if (typeof keyCode === "number" && keyCode >= 65 && keyCode <= 90) {
    return true;
  } else {
    return false;
  }
}


function pantallaAgregarPalabra() {
  document.getElementById("div-desaparece").style.display = 'none';
  document.getElementById("agregar-palabra").style.display = "block";

}


function guardarPalabra() {
  
  let nuevaPalabra = document.getElementById('input-nueva-palabra').value;

  if(nuevaPalabra !== ""){
    palabras.push(nuevaPalabra.toUpperCase());
    alert('La palabra fue agregada.');
    
    document.getElementById("agregar-palabra").style.display = "none";
    iniciarJuego();
  }
  else{
    alert("Por favor, escriba una palabra.");
  }

}

function iniciarJuego() {

  document.getElementById("div-desaparece").style.display = 'none';

  dibujarTablero(); 
  escojerPalabraSecreta();
  dibujarLineas();

  document.getElementById("btn-nuevo-juego").style.display = "block";
  document.getElementById("btn-salir").style.display = "block";

  document.onkeydown = (e) => {
    let letra = e.key.toUpperCase();
    if (letrasIncorrectas.length <= numeroDeErrores) {
      if (!verificarLetraClicada(e.key) && verificarLetra(e.keyCode)) {
        if (palabraSecreta.includes(letra)) {
          agregarLetraCorrecta(palabraSecreta.indexOf(letra));

          for (let i = 0; i < palabraSecreta.length; i++) {
            if (palabraSecreta[i] === letra) {
              mostrarLetraCorrecta(i);
              verificarVencedor(letra);

            }
          }

        }
        else {
          if (!verificarLetraClicada(e.key) && !verificarVencedor(letra)) return
          dibujarAhorcado(errores);
          verificarFinJuego(letra);
        }
      }
    }
    else {
      alert('Se acabaron tus posibilidades.')
    }

  };
}



//---------------------CANVAS---------------------------------



function dibujarTablero() {
  tablero.lineWidth=8;
  tablero.lineCap="round";
  tablero.lineJoin="round";
  tablero.fillStyle= "#F3F5FC";
  tablero.strokeStyle = "#0A3871";
  tablero.fillRect(0,0,1200,800);
  tablero.beginPath();
  tablero.moveTo(650,500);
  tablero.lineTo(900,500);
  tablero.stroke();
  tablero.closePath();
}

function dibujarLineas() {
  tablero.lineWidth=6;
  tablero.lineCap="round";
  tablero.lineJoin="round";
  tablero.strokeStyle = "#0A3871";
  tablero.beginPath();

  let ancho = 600/palabraSecreta.length;
  for (let i = 0; i < palabraSecreta.length; i++){
    tablero.moveTo(500 + (ancho*i),640);
    tablero.lineTo(550 + (ancho*i),640);
  }
  tablero.stroke();
  tablero.closePath();
}

function mostrarLetraCorrecta(index) {
  tablero.font = 'bold 52px Inter';
  tablero.lineWidth=6;
  tablero.lineCap="round";
  tablero.lineJoin="round";
  tablero.fillStyle= "#0A3871";
  let ancho = 600/palabraSecreta.length;
  tablero.fillText(palabraSecreta[index],505+(ancho*index),620);
  tablero.stroke();
}

function mostrarLetraIncorrecta(letra, errorsLeft) {
  tablero.lineWidth=6;
  tablero.font = 'bold 40px Inter';
  tablero.lineCap="round";
  tablero.lineJoin="round";
  tablero.fillStyle="#0A3871";
  tablero.fillText(letra,535+(40*(10-errorsLeft)),710,40);
}

function dibujarAhorcado(puntaje) {
  tablero.lineWidth=8;
  tablero.lineCap="round";
  tablero.lineJoin="round";
  tablero.strokeStyle = "#0A3871";

  if(puntaje===8){
    tablero.moveTo(700,500);
    tablero.lineTo(700,100);
  }

  if(puntaje===7){
    tablero.moveTo(850,100);
    tablero.lineTo(700,100);
  }

  if(puntaje===6){
    tablero.moveTo(850,100);
    tablero.lineTo(850,171);
  }

  if(puntaje===5){//circulo cabeza
    tablero.moveTo(900,230);
    tablero.arc(850,230,50,0,Math.PI*2);
  }

  if(puntaje===4){
    tablero.moveTo(850,389);
    tablero.lineTo(850,289);
  }

  if(puntaje===3){
    tablero.moveTo(850,389);
    tablero.lineTo(800,450);
  }

  if(puntaje===2){
    tablero.moveTo(850,389);
    tablero.lineTo(890,450);
  }

  if(puntaje===1){
    tablero.moveTo(850,330);
    tablero.lineTo(800,389);
  }

  if(puntaje===0){
    tablero.moveTo(850,330);
    tablero.lineTo(890,389);
  }

  tablero.stroke();
  tablero.closePath();
}

function perdiste() {
  tablero.font = 'bold 42px Inter';
  tablero.lineWidth=6;
  tablero.lineCap="round";
  tablero.lineJoin="round";
  tablero.fillStyle="red";
  tablero.fillText("El juego finalizó!!",890,320);
}

function ganaste() {
  tablero.font = 'bold 42px Inter';
  tablero.lineWidth=6;
  tablero.lineCap="round";
  tablero.lineJoin="round";
  tablero.fillStyle="green";
  tablero.fillText("Has Ganado,",950,320);
  tablero.fillText("Felicidades!!",930,360);
}   

function recargar(){
  location.reload(); 
}