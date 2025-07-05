//Array de productos disponibles
const cervezasArtesanales = [
  {
    nombre: "Lager",
    descripcion: "Cerveza Antares Lager Lata 473cc.",
    precio: 2800,
    url: "./assets/img/lager.webp",
  },
  {
    nombre: "Stout",
    descripcion: "Cerveza Lata Cream Stout Pampa Brewing x 473 cc.",
    precio: 2800,
    url: "./assets/img/stout.jpg",
  },
  {
    nombre: "Golden Ale ",
    descripcion: "Cerveza Brewing Golden Ale Pampa x 473 cc.",
    precio: 3000,
    url: "./assets/img/golden.jpg",
  },
  {
    nombre: "Porter",
    descripcion: "Cerveza Artesanal Ortuzar Porter 5.7%Vol x 473 cc.",
    precio: 3000,
    url: "./assets/img/porter.jpg",
  },
  {
    nombre: "Honey Beer",
    descripcion: "Cerveza Honey Beer elaborada con miel x 473cc ",
    precio: 3000,
    url: "./assets/img/honey.jpg",
  },
  {
    nombre: "Blond Ale",
    descripcion: " Cerveza Berlina Hoppy Blonde Ale x 473cc.",
    precio: 3500,
    url: "./assets/img/blondeale.jpg."
  },

  {
    nombre: "IPA",
    descripcion: "Cerveza Antares IPA 6.6%Vol x 473cc.",
    precio: 3500,
    url: "./assets/img/cerveza ipa.jpg",
  },
  {
    nombre: "Red Ale",
    descripcion: "Cerveza Rabieta Red Irish Ale Lata x 473 cc.",
    precio: 3500,
    url: "./assets/img/red ale.jpg",
  }
];

// Seleccionar el contenedor en el DOM
const contenedor = document.getElementById("contenedor-productos");
const carritoContenedor = document.getElementById("carrito-contenedor");

const carrito = [];


// Recorrer el array y renderizar
cervezasArtesanales.forEach((producto, index) => {
  const div = document.createElement("div");
  div.classList.add("producto");

  div.innerHTML = `
    <h2>${producto.nombre}</h2>
    <img src="${producto.url}" alt="${producto.nombre}" width="150" />
    <p>${producto.descripcion}</p>
    <p><strong>Precio:</strong> $${producto.precio}</p>
    <button class="botoncomprar" data-index="${index}">Comprar</button>
  `;

  contenedor.appendChild(div);
});

// Escuchar clicks en los botones
document.querySelectorAll('.botoncomprar').forEach(boton => {
  boton.addEventListener('click', (evt) => {
    const index = evt.target.dataset.index;
    const productoSeleccionado = cervezasArtesanales[index];
    carrito.push(productoSeleccionado);
    mostrarCarrito();
  });
});

// Mostrar carrito
function mostrarCarrito() {
  carritoContenedor.innerHTML = ""; // Limpiar antes

  carrito.forEach((item, i) => {
    const div = document.createElement("div");
    div.classList.add("carrito-item");
    div.innerHTML = `
      <p>${item.nombre} - $${item.precio}</p>
    `;
    carritoContenedor.appendChild(div);
  });

  const total = carrito.reduce((acc, item) => acc + item.precio, 0);
  const totalDiv = document.createElement("p");
  totalDiv.innerHTML = `<strong>Total: $${total}</strong>`;
  carritoContenedor.appendChild(totalDiv);
}