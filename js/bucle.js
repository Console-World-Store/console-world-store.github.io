const contenedor = document.getElementById('grid-consolas');
const contenedorFiltros = document.getElementById('contenedor-filtros');
let todosLosProductos = []; 

// Culqi Sandbox prueba pasarela de pagos
if (typeof Culqi !== 'undefined') {
  Culqi.publicKey = 'pk_test_woZYQU9v6lHbzflE';
}

// Crea las tarjetas automaticamente
function renderizarProductos(lista) {
  if (!contenedor) return;
  contenedor.innerHTML = ''; 

  if (lista.length === 0) {
    contenedor.innerHTML = '<p style="color: #64748b; grid-column: 1/-1;">No hay elementos disponibles en esta sección.</p>';
    return;
  }

  lista.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('tarjeta');

    card.innerHTML = `
      <img src="${item.imagen}" alt="${item.titulo}">
      <h3>${item.titulo}</h3>
      <p>${item.envio}</p>
      <span class="precio">${item.precioActual}</span>
      <a href="#" class="btn-tarjeta">Comprar</a>
    `;

    const btnComprar = card.querySelector('.btn-tarjeta');
    
    btnComprar.addEventListener('click', (e) => {
      e.preventDefault(); 

      
      const precioLimpio = parseFloat(item.precioActual.replace(/[^0-9.]/g, ''));
      
      const montoEnCentimos = Math.round(precioLimpio * 100);

      if (typeof Culqi !== 'undefined') {
    
        Culqi.settings({
          title: item.titulo,
          currency: 'PEN',
          amount: montoEnCentimos,
          description: `Compra de ${item.titulo} en Console World Store`
        });

        // Ventana de Compra Modo flotante
        Culqi.open();
      } else {
        alert("Hubo un error inesperado, Contacte con soporte");
      }
    });

    contenedor.appendChild(card);
  });
}

// Funcion de Culqi
window.culqi = function() {
  if (Culqi.token) {
    const token = Culqi.token.id;
    console.log("Compra realizada con Exito :", token);
    alert(`¡Pago realizado con éxito!`);
  } else {
    console.error("Error en Culqi:", Culqi.error);
    alert("Hubo un error en la simulación del pago: " + (Culqi.error ? Culqi.error.user_message : "Desconocido"));
  }
};

// Genera los botones de filtros automáticos
function generarFiltrosAutomaticos(productos) {
  if (!contenedorFiltros) return;

  const subcategorias = ['todas', ...new Set(productos.map(p => p.subcategoria))];

  contenedorFiltros.innerHTML = '';

  subcategorias.forEach(subcat => {
    const boton = document.createElement('button');
    boton.classList.add('btn-filtro');
    if (subcat === 'todas') boton.classList.add('activo');
    
    boton.textContent = subcat;

    boton.addEventListener('click', (e) => {
      document.querySelectorAll('.btn-filtro').forEach(btn => btn.classList.remove('activo'));
      e.target.classList.add('activo');

      if (subcat === 'todas') {
        renderizarProductos(todosLosProductos);
      } else {
        const filtrados = todosLosProductos.filter(p => p.subcategoria === subcat);
        renderizarProductos(filtrados);
      }
    });

    contenedorFiltros.appendChild(boton);
  });
}

// Carga inicial de datos
document.addEventListener('DOMContentLoaded', () => {
  fetch('../js/consolas.json')
    .then(response => {
      if (!response.ok) throw new Error('No se pudo encontrar el archivo consolas.json');
      return response.json();
    })
    .then(data => {
      todosLosProductos = data;
      renderizarProductos(todosLosProductos);
      generarFiltrosAutomaticos(todosLosProductos);
    })
    .catch(error => console.error('Error al cargar datos:', error));
});