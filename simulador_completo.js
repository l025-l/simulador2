
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
  document.getElementById("credito").classList.remove("activa");       
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

  if (clienteSeleccionado == null) {
        let nuevoCliente = {
            cedula: cedula,
            nombre: nombre,
            apellido: apellido,
            ingresos: ingresos,
            egresos: egresos
        };
        clientes.push(nuevoCliente);
    }else {
        clienteSeleccionado.nombre = nombre;
        clienteSeleccionado.apellido = apellido;
        clienteSeleccionado.ingresos = ingresos;
        clienteSeleccionado.egresos = egresos;
    }
  pintarClientes();
  limpiar();
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

function buscarCliente(cedula) {
  let clienteEncontrado = null;
    for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].cedula === cedula) {
            clienteEncontrado = clientes[i];
            break;
        }
    }
    return clienteEncontrado;
}

function seleccionarCliente(cedula) {
  let cliente = buscarCliente(cedula);
  if (cliente != null) {
    clienteSeleccionado = cliente;
    mostrarTextoEnCaja("txtCedula", cliente.cedula);
    mostrarTextoEnCaja("txtNombre", cliente.nombre);
    mostrarTextoEnCaja("txtApellido", cliente.apellido);
    mostrarTextoEnCaja("txtIngresos", cliente.ingresos);
    mostrarTextoEnCaja("txtEgresos", cliente.egresos);
  }
}

function limpiar() {
  mostrarTextoEnCaja("txtCedula", "");
  mostrarTextoEnCaja("txtNombre", "");
  mostrarTextoEnCaja("txtApellido", "");
  mostrarTextoEnCaja("txtIngresos", "");
  mostrarTextoEnCaja("txtEgresos", "");
}

function buscarClienteCredito() {
  let buscarCedula = recuperaraTexto("buscarCedulaCredito");
  let cliente = buscarCliente(buscarCedula);
  let datosClienteCredito = document.getElementById("datosClienteCredito");
  if (cliente != null) {
    clienteSeleccionado = cliente;
    datosClienteCredito.innerHTML =
      "<h3>Datos del Cliente</h3>" +
      "<p><strong>Cédula: </strong>" + cliente.cedula + "</p>" +
      "<p><strong>Nombre: </strong>" + cliente.nombre + "</p>" +
      "<p><strong>Apellido: </strong>" + cliente.apellido + "</p>" +
      "<p><strong>Ingresos: </strong>" + cliente.ingresos + "</p>" +
      "<p><strong>Egresos: </strong>" + cliente.egresos + "</p>";
  }else {
    clienteSeleccionado = null;
    datosClienteCredito.innerHTML = "<p>Cliente no encontrado.</p>";
  }

}

function calcularCredito() {
  if (clienteSeleccionado == null) {
    alert("Por favor, busque un cliente primero.");
        return;
  }
  montoCalculado = recuperarFloat("montoCredito");
  plazoCalculado = recuperarInt("plazoCredito");

  let capacidadPago = clienteSeleccionado.ingresos - clienteSeleccionado.egresos;

  let interes = montoCalculado * (tasaInteres / 100) * (plazoCalculado / 12);
  let totalAPagar = montoCalculado + interes;
  cuotaCalculada = totalAPagar / plazoCalculado;

  let resultadoDiv = document.getElementById("resultadoCredito");
  let botonSolicitar = document.getElementById("btnSolicitarCredito");
  let mensajeResultado = "";

  if (cuotaCalculada <= capacidadPago) {
    mensajeResultado = "APROBADO";
    resultadoDiv.className = "aprobado"; 
    botonSolicitar.disabled = false;
    creditoAprobado = true; 
 }else {
    mensajeResultado = "RECHAZADO";
    resultadoDiv.className = "rechazado"; 
    botonSolicitar.disabled = true;
    creditoAprobado = false; 
 }
 resultadoDiv.innerHTML = `
    Capacidad de pago: ${capacidadPago.toFixed(2)}<br>
    Total a pagar: ${totalAPagar.toFixed(2)}<br>
    Cuota mensual: ${cuotaCalculada.toFixed(2)}<br>
    RESULTADO: ${mensajeResultado}
    `;
}

function solicitarCredito() {
  if (creditoAprobado == true && clienteSeleccionado != null) {
    let nuevoCredito = {
        cedula: clienteSeleccionado.cedula,
        nombre: clienteSeleccionado.nombre,
        apellido: clienteSeleccionado.apellido,
        monto: montoCalculado,
        tasa: tasaInteres + "%",
        plazo: plazoCalculado + " meses",
        cuota: cuotaCalculada.toFixed(2)
    }
  creditos.push(nuevoCredito);
  alert("¡Crédito solicitado y guardado con éxito!");
  document.getElementById("montoCredito").value = "";
  document.getElementById("plazoCredito").value = "";
  document.getElementById("resultadoCredito").innerHTML = "";
  document.getElementById("resultadoCredito").className = "";
  document.getElementById("btnSolicitarCredito").disabled = true;
  }
}