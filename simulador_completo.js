
  let clientes = [];
  let creditos = [];

  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;

  
//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios

function ocultarSecciones() {
  document.getElementById("parametros").classList.remove("activa");
  document.getElementById("clientes").classList.remove("activa");       
} 

function mostrarSeccion(id) {
  ocultarSecciones();
  document.getElementById(id).classList.add("activa");
}

function guardarTasa() {
  let valor = recuperarInt("tasaInteres");
  if (valor >=10 && valor <= 20) {
    tasaInteres = valor;
    mostrarTexto("mensajeTasa", "Tasa configurada correctamente: " + tasaInteres + "%");
  }else {
    mostrarTexto("mensajeTasa", "La tasa debe estar entre 10% y 20%");
  }
}

function guardarCliente() {
  let cedula = recuperaraTexto("txtCedula");
  let nombre = recuperaraTexto("txtNombre");
  let apellido = recuperaraTexto("txtApellido");
  let ingresos = recuperarFloat("txtIngresos");
  let egresos = recuperarFloat("txtEgresos");

  let nuevoCliente = {
    cedula: cedula,
    nombre: nombre,
    apellido: apellido,
    ingresos: ingresos,
    egresos: egresos
  }

  clientes.push(nuevoCliente);
  pintarClientes();
}

function pintarClientes() {
  let contenido = "";
  let tabla = document.getElementById("tablaClientes");
  for (let i = 0; i< clientes.length; i++){
    let cliente = clientes[i];
    contenido += "<tr>";
    contenido += "<td>"+ cliente.cedula +"</td>";
    contenido += "<td>"+ cliente.nombre +"</td>";
    contenido += "<td>"+ cliente.apellido +"</td>";
    contenido += "<td>"+ cliente.ingresos +"</td>";
    contenido += "<td>"+ cliente.egresos +"</td>";

    contenido += `<td><button onclick="seleccionarCliente('` + cliente.cedula + `')">Actualizar</button></td>`;
    contenido += "</tr>";
  }
  tabla.innerHTML = contenido;
}