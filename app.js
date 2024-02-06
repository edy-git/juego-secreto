
let numeroSecreto = 0;
let intentos = 0;
let listaNumeroSorteado = [];
let numeroMaximo = 0;
let juegosMaximos = 0;
function asignarTextoElemento(elemento, texto)
{
  let elementoHTML = document.querySelector(elemento);
  elementoHTML.innerHTML = texto;
  return;
}

function verificarIntento()
{
  let numeroUsuario = parseInt(document.getElementById('valorUsuario').value);

  if(numeroUsuario === numeroSecreto)
  {
    asignarTextoElemento('p',`Acertaste el numero en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
    document.getElementById('reiniciar').removeAttribute('disabled');
    document.getElementById("intentar").style.visibility = "hidden"; // hide
  }
  else
  {
    if (numeroUsuario > numeroSecreto)
    {
        asignarTextoElemento('p','El numero secreto es menor');
    }
    else
    {
        asignarTextoElemento('p','El numero secreto es mayor');
    }
    intentos++;
    limpiarCaja();
  }
  return;
}

function limpiarCaja()
{
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecretro()
{
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    //Si ya sorteamos todos lo numeros
    if (listaNumeroSorteado.length == juegosMaximos)
    {
      asignarTextoElemento("p","Alcanzaste el numero maximo de juegos posibles");
      document.getElementById("intentar").style.visibility = "hidden"; // hide
      document.getElementById("valorUsuario").style.visibility = "hidden"; // hide
    }
    else
    {
      //Si el numero generado esta incluido en la lista
      if (listaNumeroSorteado.includes(numeroGenerado))
      {
        return generarNumeroSecretro();
      }
      else
      {
        listaNumeroSorteado.push(numeroGenerado);
        return numeroGenerado;
      }
    }
}

function valoresIniciales()
{
  limpiarCaja();
  let num = numeroMaximo;
  document.getElementById("intentar").style.visibility = "visible";
  document.getElementById("reiniciar").style.visibility = "visible";
  document.getElementById("iniciar").style.visibility = "hidden"; // hide
  document.getElementById("valorUsuarioNum").style.visibility = "hidden"; // hide
  document.getElementById("textoRango").style.visibility = "hidden"; // hide

  asignarTextoElemento("h1", "Juego del numero secreto");
  asignarTextoElemento("p", `Indica un numero del 1 al ${num} para adivinar`);
  numeroSecreto = generarNumeroSecretro();
  intentos = 1;
}

function iniciarJuego()
{
  asignarTextoElemento("h1", "Juego del numero secreto");
  asignarTextoElemento("p","Indica el numero de veces que quieres jugar este juego");
  asignarTextoElemento("p1","Indica el rango que buscaras");
  document.getElementById("intentar").style.visibility = "hidden"; // hide
  document.getElementById("reiniciar").style.visibility = "hidden"; // hide
  document.getElementById("iniciar").style.visibility = "visible";
  juegosMaximos = parseInt(document.getElementById("valorUsuario").value);
  numeroMaximo = parseInt(document.getElementById("valorUsuarioNum").value);

  if (numeroMaximo <= 1)
  {
    asignarTextoElemento("h1", "Juego del numero secreto");
    asignarTextoElemento(
      "p",
      "El numero de rango que ingreso es invalido, digite un numero mayor a 1"
    );
    document.getElementById("reiniciar").style.visibility = "visible";
    document.getElementById("iniciar").style.visibility = "hidden"; // hide

  }
  else if (numeroMaximo > 1)
  {
    valoresIniciales();
  }
  return;
}

function reiniciarJuego()
{
  //Limpiar caja
    limpiarCaja();

  //Iniciar mensajes de titulo y parrafo
  //Generar el numero aleatorio
  //Inicializar el numero de juego
    valoresIniciales();

  //Deshabilitar el boton de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled','true');
}
iniciarJuego();
