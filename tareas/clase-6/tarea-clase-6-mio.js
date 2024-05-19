/*
TAREA: Empezar preguntando cuánta gente hay en el grupo familiar.
Crear tantos inputs+labels como gente haya para completar la edad de cada integrante.
Al hacer click en "calcular", mostrar en un elemento pre-existente la mayor edad,
la menor edad y el promedio del grupo familiar.

Punto bonus: Crear un botón para "empezar de nuevo" que empiece el proceso nuevamente,
 borrando los inputs ya creados (investigar cómo en MDN).
*/

document.querySelector('#siguiente-paso').onclick = function(event) {
  const $cantidadIntegrantes = document.querySelector('#cantidad-integrantes');
  const cantidadIntegrantes = Number($cantidadIntegrantes.value);
  const errorCantidadIntegrantes = validarCantidadIntegrantes(cantidadIntegrantes);
  const errores = {
    'cantidad-integrantes': errorCantidadIntegrantes
  }
  if (manejarErrores(errores) === 0) {
    borrarIntegrantesAnteriores();
    crearIntegrantes(cantidadIntegrantes);
  } else {
    manejarErrores(errores)
  }

  event.preventDefault();
};

document.querySelector('#calcular').onclick = function(event) {
  
  let errores = obtenerErrores();
  console.log(errores);
  if ((manejarErrores(errores)) === 0) {
    const edades = obtenerEdadesIntegrantes();
  
    mostrarEdad('mayor', obtenerMayorNumero(edades));
    mostrarEdad('menor', obtenerMenorNumero(edades));
    mostrarEdad('promedio', obtenerPromedio(edades));
    mostrarResultados();
  } else {
    document.querySelector('#analisis').className = 'oculto';
    manejarErrores(errores);
  }

  event.preventDefault();
};

document.querySelector('#resetear').onclick = resetear;

function borrarIntegrantesAnteriores() {
  const $integrantes = document.querySelectorAll('.integrante');
  for (let i = 0; i < $integrantes.length; i++) {
    $integrantes[i].remove();
  }
}

function crearIntegrantes(cantidadIntegrantes) {

  if (cantidadIntegrantes > 0) {
    mostrarBotonCalculo();
  } else {
    resetear();
  }

  for (let i = 0; i < cantidadIntegrantes; i++) {
    crearIntegrante(i);
  }
}

function crearIntegrante(indice) {
  const $div = document.createElement('div');
  $div.className = 'integrante';

  const $label = document.createElement('label');
  $label.textContent = 'Edad del integrante #: ' + (indice + 1);
  const $input = document.createElement('input');
  $input.type = 'number';

  $div.appendChild($label);
  $div.appendChild($input);

  const $integrantes = document.querySelector('#integrantes');
  $integrantes.appendChild($div);
}

function resetear() {
  borrarIntegrantesAnteriores();
  ocultarBotonCalculo();
  ocultarResultados();
  borrarErrores();
}

function ocultarBotonCalculo() {
  document.querySelector('#calcular').className = 'oculto';
}

function mostrarBotonCalculo() {
  document.querySelector('#calcular').className = '';
}

function ocultarResultados() {
  document.querySelector('#analisis').className = 'oculto';
}

function mostrarResultados() {
  document.querySelector('#analisis').className = '';
}

function mostrarEdad(tipo, valor) {
  document.querySelector(`#${tipo}-edad`).textContent = valor;
}

function obtenerEdadesIntegrantes() {
  const $integrantes = document.querySelectorAll('.integrante input');
  const edades = [];
  for (let i = 0; i < $integrantes.length; i++) {
    if ($integrantes[i].value !== '') {
      edades.push(Number($integrantes[i].value));
    }
    
  }
  return edades;
}

function validarCantidadIntegrantes(cantidadIntegrantes) {
  if(!/^[0-9]+$/i.test(cantidadIntegrantes)) {
    return 'Este campo solo acepta números naturales';
  } else if (cantidadIntegrantes === 0) {
    return 'Debe agregar un numero de integrantes';
  } else {
    return '';
  }
}

function validarEdad(edad) {
  if(edad === '') {
    return 'El campo edad no debe estar vacío';
  } else if (edad > 120){
    return 'La edad no puede ser mayor a 120';
  } else if (!/^[0-9]+$/i.test(edad)){
    return 'El campo solo acepta números';
  } else {
    return '';
  }
}

function obtenerErrores() {
  const $integrantes = document.querySelectorAll('#integrantes input');
  const errores = {};
  for (let i=0;i<$integrantes.length;i++) {
    errores[`error-edad-${i+1}`] = validarEdad($integrantes[i].value);
  }
  return errores;
}
function borrarErrores() {
  const $erroresLi = document.querySelectorAll('#errores li');
  for(let i=0;i<$erroresLi.length;i++) {
    $erroresLi[i].remove();
  }
}
function manejarErrores(errores) {
  const $errores = document.querySelector('#errores');
  borrarErrores();
  let cantidadErrores = 0;
  const keys = Object.keys(errores);

  keys.forEach(function(key){
    const error = errores[key];

    if (error) {
      cantidadErrores++;
      const $error = document.createElement('li');
      $error.innerText = error;
      $errores.className = '';
      $errores.appendChild($error);
    }
    })
    return cantidadErrores;
}


/*
TAREA:
Crear una interfaz que permita agregar ó quitar (botones agregar y quitar) inputs+labels para completar el salario anual de cada integrante de la familia que trabaje.
Al hacer click en "calcular", mostrar en un elemento pre-existente el mayor salario anual, menor salario anual, salario anual promedio y salario mensual promedio.

Punto bonus: si hay inputs vacíos, ignorarlos en el cálculo (no contarlos como 0).
*/
