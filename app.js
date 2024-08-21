
const url = "https://script.google.com/macros/s/AKfycbwhjjMDucxpUcCqLMyGWzYtk4n9w8zUda4U2k0YSzw__BK8nqAqUgddexnnj_6Uv4Af3A/exec";

// Generar la tabla de horarios dinámicamente
function generarTabla() {
    const tabla = document.getElementById("horarioTabla");

    // Días de la semana
    const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
    
    // Horarios disponibles
    const horarios = ["6 AM - 8 AM", "8 AM - 10 AM", "10 AM - 12 PM", "12 PM - 2 PM", "2 PM - 4 PM", "4 PM - 6 PM"];

    // Crear la fila de encabezado con los días
    const encabezado = document.createElement("tr");
    encabezado.appendChild(document.createElement("th")); // Celda vacía en la esquina superior izquierda
    dias.forEach(dia => {
        const th = document.createElement("th");
        th.textContent = dia;
        encabezado.appendChild(th);
    });
    tabla.appendChild(encabezado);

    // Crear las filas de horarios
    horarios.forEach(horario => {
        const fila = document.createElement("tr");
        
        // Celda de horario en la primera columna
        const celdaHorario = document.createElement("th");
        celdaHorario.textContent = horario;
        fila.appendChild(celdaHorario);

        // Crear celdas para cada día de la semana
        dias.forEach(dia => {
            const celda = document.createElement("td");
            celda.textContent = "Disponible";
            celda.className = "disponible"; // Inicialmente, todos los horarios están disponibles
            celda.addEventListener("click", () => reservarHorario(dia, horario, celda));
            fila.appendChild(celda);
        });

        tabla.appendChild(fila);
    });
}

// Función para manejar las reservas
function reservarHorario(dia, horario, celda) {
    const nombre = prompt("Por favor, ingrese su nombre para reservar:");
    if (nombre) {
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ fecha: dia, horario: horario, nombre: nombre })
        })
        .then(response => response.text())
        .then(data => {
            alert("Reserva guardada correctamente");
            celda.className = "reservado"; // Cambiar el color de la celda a amarillo
            celda.textContent = "Reservado"; // Cambiar el texto de la celda
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Ocurrió un error al guardar la reserva");
        });
    }
}

// Generar la tabla al cargar la página
document.addEventListener("DOMContentLoaded", generarTabla);
