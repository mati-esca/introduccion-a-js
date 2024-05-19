let indiceMiembro = 0;

const $agregarIntegrante = document.querySelector('#agregar-integrante');
$agregarIntegrante.onclick = function(event) {

    indiceMiembro = indiceMiembro + 1;

    const $label = document.createElement('label');
    const $input = document.createElement('input');
    $label.textContent = `Salario del integrante #${indiceMiembro}:`;
    $input.setAttribute('type', 'number');

    document.querySelector('#integrantes').appendChild($label);
    document.querySelector('#integrantes').appendChild($input);
    mostrarBotonCalculo();
    event.preventDefault();
}
document.querySelector('#calcular').onclick = function(event) {
    
    let errores = obtenerErrores();
    console.log(errores);
    if ((manejarErrores(errores)) === 0){
        document.querySelector('#analisis').className = '';
        document.querySelector('#mayor-salario').textContent = obtenerMayorSalario(obtenerSalarios());
        document.querySelector('#menor-salario').textContent = obtenerMenorSalario(obtenerSalarios());
        document.querySelector('#promedio-anual').textContent = obtenerPromedioSalariosAnual(obtenerSalarios());
        document.querySelector('#promedio-mensual').textContent = obtenerPromedioSalariosMensual(obtenerSalarios());
    } else {
        manejarErrores(errores);
    }
    
    event.preventDefault();
}

const $quitarIntegrante = document.querySelector('#quitar-integrante');
$quitarIntegrante.onclick = function(event) {
    
    let $integrantesInput = document.querySelectorAll('#integrantes input');
    let $integrantesLabel = document.querySelectorAll('#integrantes label');

    $integrantesInput[$integrantesInput.length-1].remove();
    $integrantesLabel[$integrantesLabel.length-1].remove();
    indiceMiembro = indiceMiembro - 1;
    if (indiceMiembro === 0){
        ocultarBotonCalculo();
        document.querySelector('#analisis').className = 'oculto';
    }
    

    event.preventDefault();
}

function mostrarBotonCalculo(){
    document.querySelector('#calcular').className ='';
}

function ocultarBotonCalculo() {
    document.querySelector('#calcular').className = 'oculto';
}


function obtenerSalarios() {
    const $salariosIntegrantes = document.querySelectorAll('#integrantes input');
    const salarios = [];
    for(let i=0;i<$salariosIntegrantes.length;i++) {
        if($salariosIntegrantes[i].value !== '') {
            salarios.push(Number($salariosIntegrantes[i].value));
        }
    }
    return salarios;
}

function obtenerMayorSalario(numeros) {
    let mayorSalario = numeros[0];
    for(let i=0;i<numeros.length;i++) {
        if(numeros[i] > mayorSalario) {
            mayorSalario = numeros[i];
        } 
    }
    return mayorSalario;
}

function obtenerMenorSalario(numeros) {
    let menorSalario = numeros[0];
    for(let i=0;i<numeros.length;i++) {
        if(numeros[i] < menorSalario) {
            menorSalario = numeros[i];
        } 
    }
    return menorSalario;
}

function obtenerPromedioSalariosAnual(numeros) {
    let sumaSalarios = 0;
    for(let i =0;i<numeros.length;i++){
        sumaSalarios =+ numeros[i];
    }
    const promedioSalariosAnual = sumaSalarios / (numeros.length-1);
    return promedioSalariosAnual;
}

function obtenerPromedioSalariosMensual(numeros) {
    const MESES_DEL_ANIO = 12;
    let sumaSalariosMensual = 0;
    let salarioMensual;
    for(let i=0;i<numeros.length;i++){
        salarioMensual = numeros[i]/MESES_DEL_ANIO;
        sumaSalariosMensual =+ salarioMensual;
    }
    const promedioSalariosMensual = sumaSalariosMensual / (numeros.length-1);
    return promedioSalariosMensual;
}
function validarSalario(salario){
    if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(salario)) {
        return 'El salario debe ser un número';
    } else {
        return '';
    }
}
function borrarErrores() {
    const $erroresLi = document.querySelectorAll('#errores li');
    for(let i=0;i<$erroresLi.length;i++) {
      $erroresLi[i].remove();
    }
}
function obtenerErrores() {
    const $integrantes = document.querySelectorAll('#integrantes input');
    const errores = {};
    for (let i=0;i<$integrantes.length;i++) {
      errores[`error-salario-${i+1}`] = validarSalario($integrantes[i].value);
    }
    return errores;
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