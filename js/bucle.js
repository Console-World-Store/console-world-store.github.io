const contenedor = document.getElementById('grid-consolas');
const contenedorFiltros = document.getElementById('contenedor-filtros');
let todosLosProductos = []; 

// Crea las tarjetas
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

    contenedor.appendChild(card);
  });
}

// Genera los botones
function generarFiltrosAutomaticos(productos) {
  if (!contenedorFiltros) return;

  // Extrae los productos de consolas
  const subcategorias = ['todas', ...new Set(productos.map(p => p.subcategoria))];

  contenedorFiltros.innerHTML = '';

  subcategorias.forEach(subcat => {
    const boton = document.createElement('button');
    boton.classList.add('btn-filtro');
    if (subcat === 'todas') boton.classList.add('activo');
    
    boton.textContent = subcat;

    // Vuelve a los botones activos
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

//  Carga inicial de datos
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