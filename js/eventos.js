/* Filtrar eventos */
const botonesFiltro = document.querySelectorAll(".filtro");
const tarjetasEventos = document.querySelectorAll(".evento-proximo");
const mensaje = document.getElementById("mensaje-sin-eventos");

botonesFiltro.forEach(function (boton) {
    boton.addEventListener("click", function () {

        const filtro = boton.dataset.filtro;
        let eventosVisibles = 0;

        botonesFiltro.forEach(function (elemento) {
            elemento.classList.remove("activo");
        });

        boton.classList.add("activo");

        tarjetasEventos.forEach(function (tarjeta) {
            const categoria = tarjeta.dataset.categoria;

            if (filtro === "todos" || filtro === categoria) {
                tarjeta.style.display = "flex";
                eventosVisibles++;
            } else {
                tarjeta.style.display = "none";
            }
        });

        if (eventosVisibles === 0) {
            mensaje.style.display = "block";
        } else {
            mensaje.style.display = "none";
        }
    });
});


/* Abrir y cerrar el calendario */
const calendario = document.getElementById("calendario-eventos");
const abrir = document.getElementById("abrir-calendario");
const cerrar = document.getElementById("cerrar-calendario");
const aceptar = document.getElementById("aceptar-calendario");

abrir.addEventListener("click", function () {
    calendario.showModal();
});

cerrar.addEventListener("click", function () {
    calendario.close();
});

aceptar.addEventListener("click", function () {
    calendario.close();
});