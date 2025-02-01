const API_URL = "http://localhost:8080/games"; // URL del backend

// Función para obtener y mostrar los juegos en la página "ver_juegos.html"
async function verJuegos() {
    try {
        const respuesta = await fetch(API_URL);
        if (!respuesta.ok) {
            throw new Error("Error al obtener los juegos");
        }
        const juegos = await respuesta.json();

        const listaJuegos = document.getElementById("listaJuegos");
        listaJuegos.innerHTML = ""; // Limpiar contenido previo

        juegos.forEach(juego => {
            const item = document.createElement("li");
            const divTitle = document.createElement("div");
            divTitle.classList.add('width-50')
            divTitle.textContent = `${juego.title} - ${juego.genre} - ${juego.year}`;
            
            // Botón de editar
            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.onclick = () => editarJuego(juego.id_videogame);
            
            // Botón de borrar
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.onclick = () => borrarJuego(juego.id_videogame);
            
            item.appendChild(divTitle);
            item.appendChild(editButton);
            item.appendChild(deleteButton);
            listaJuegos.appendChild(item);
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

// Función para registrar un nuevo juego desde "register.html"
async function registrarJuego(event) {
    event.preventDefault(); // Evitar recarga de la página

    const title = document.getElementById("title").value;
    const genre = document.getElementById("genre").value;
    const year = document.getElementById("year").value;

    const nuevoJuego = { title, genre, year };

    try {
        const respuesta = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoJuego)
        });

        if (!respuesta.ok) {
            throw new Error("Error al registrar el juego");
        }

        alert("Juego registrado con éxito!");
        document.getElementById("formRegistro").reset(); // Limpiar formulario
        verJuegos(); // Recargar lista

    } catch (error) {
        console.error("Error:", error);
    }
}

// Función para eliminar un juego
async function borrarJuego(gameId) {
    try {
        const respuesta = await fetch(`${API_URL}/${gameId}`, {
            method: "DELETE"
        });

        if (!respuesta.ok) {
            throw new Error("Error al eliminar el juego");
        }

        alert("Juego eliminado correctamente");
        verJuegos(); // Recargar lista
    } catch (error) {
        console.error("Error:", error);
    }
}

// Función para editar un juego
async function editarJuego(gameId) {
    const nuevoTitulo = prompt("Introduce el nuevo título:");
    const nuevoGenero = prompt("Introduce el nuevo género:");
    const nuevoAnio = prompt("Introduce el nuevo año:");

    if (!nuevoTitulo || !nuevoGenero || !nuevoAnio) return;

    const datosActualizados = {
        title: nuevoTitulo,
        genre: nuevoGenero,
        year: nuevoAnio
    };

    try {
        const respuesta = await fetch(`${API_URL}/${gameId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datosActualizados)
        });

        if (!respuesta.ok) {
            throw new Error("Error al actualizar el juego");
        }

        alert("Juego actualizado con éxito!");
        verJuegos(); // Recargar lista
    } catch (error) {
        console.error("Error:", error);
    }
}

// Verifica en qué página está el usuario y ejecuta la función correspondiente
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("listaJuegos")) {
        verJuegos();
    }
    if (document.getElementById("formRegistro")) {
        document.getElementById("formRegistro").addEventListener("submit", registrarJuego);
    }
});