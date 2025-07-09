document.addEventListener('DOMContentLoaded', () => {

    const cervezas = [
        {
            nombre: "Lager",
            descripcion: "Cerveza Antares Lager Lata 473cc",
            precio: 2800,
            url: "./assets/img/lager.webp",
        },
        {
            nombre: "Stout",
            descripcion: "Cerveza Lata Cream Stout Pampa Bre",
            precio: 2800,
            url: "./assets/img/stout.jpg",
        },
        {
            nombre: "Golden Ale",
            descripcion: "Cerveza Brewing Golden Ale Pampa",
            precio: 3000,
            url: "./assets/img/golden.jpg",
        },
        {
            nombre: "Porter",
            descripcion: "Cerveza Artesanal Ortuzar Porter 5",
            precio: 3000,
            url: "./assets/img/porter.jpg",
        },
        {
            nombre: "Honey Beer",
            descripcion: "Cerveza Honey Beer elaborada con mi",
            precio: 3000,
            url: "./assets/img/honey.jpg",
        },
        {
            nombre: "Red Ale",
            descripcion: "Cerveza Roja Artesanal",
            precio: 3500,
            url: "./assets/img/red ale.jpg",
        },
        {
            nombre: "IPA",
            descripcion: "Cerveza India Pale Ale",
            precio: 3500,
            url: "./assets/img/Cerveza ipa.jpg",
        },
        {
            nombre: "Blond Ale",
            descripcion: "Cerveza Rubia Clara",
            precio: 3500,
            url: "./assets/img/blondeale.jpg", 
        },
    ];

    const contenedor = document.getElementById("contenedor-productos");
    const carritoContadorNav = document.querySelector('.carrito-contador-nav');
    const spanProductosDiferentes = document.querySelector('.productos-diferentes');
    const spanTotalItems = document.querySelector('.total-items');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    const confirmarCompraBtn = document.getElementById('confirmar-compra');
    const resumenCarritoDiv = document.getElementById('resumen-carrito');

    // Referencia al contenedor principal del carrito y al icono que lo abre
    const contenidoCarritoDiv = document.getElementById('contenido-carrito');
    const carritoIconLink = document.querySelector('.item-nav.carrito'); // Selecciona el enlace completo del icono


    let carrito = [];

    // --- Funciones para el Carrito ---
    function actualizarDisplayCarrito() {
        let totalItems = 0;
        let productosDiferentes = 0;

        if (carrito.length > 0) {
            productosDiferentes = carrito.length;
            totalItems = carrito.reduce((sum, producto) => sum + producto.cantidad, 0);
        }

        carritoContadorNav.textContent = totalItems;
        spanProductosDiferentes.textContent = productosDiferentes;
        spanTotalItems.textContent = totalItems;

        resumenCarritoDiv.innerHTML = '';

        if (carrito.length === 0) {
            resumenCarritoDiv.textContent = 'El carrito está vacío.';
        } else {
            const ul = document.createElement('ul');
            carrito.forEach(producto => {
                const li = document.createElement('li');
                li.textContent = `${producto.nombre} (Cantidad: ${producto.cantidad}) - Precio Unit: $${producto.precio}`;
                ul.appendChild(li);
            });
            resumenCarritoDiv.appendChild(ul);
        }
    }

    function agregarProductoAlCarrito(producto) {
        const productoExistenteIndex = carrito.findIndex(item => item.id === producto.nombre);

        if (productoExistenteIndex > -1) {
            carrito[productoExistenteIndex].cantidad++;
        } else {
            carrito.push({
                id: producto.nombre,
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: 1
            });
        }
        actualizarDisplayCarrito();
        console.log("Carrito actual:", carrito);
    }

    // --- Renderizado de Productos ---
    if (contenedor) {
        cervezas.forEach((producto, index) => {
            const div = document.createElement("div");
            div.classList.add("producto");

            div.innerHTML = `
                <h2>${producto.nombre}</h2>
                <img src="${producto.url}" alt="${producto.nombre}" width="150">
                <p>${producto.descripcion}</p>
                <p><strong>Precio:</strong> $${producto.precio}</p>
                <button class="botoncomprar" data-index="${index}">Comprar</button>
            `;
            contenedor.appendChild(div);
        });
    } else {
        console.error("El elemento con ID 'contenedor-productos' no fue encontrado en el DOM.");
    }

    // --- Event Listeners ---

    // Toggle para mostrar/ocultar el contenido del carrito
    if (carritoIconLink) {
        carritoIconLink.addEventListener('click', (e) => {
            e.preventDefault(); // Evita que el enlace recargue la página
            contenidoCarritoDiv.classList.toggle('carrito-visible');
            contenidoCarritoDiv.classList.toggle('carrito-oculto');
        });

        // Opcional: Cerrar el carrito si se hace clic fuera de él
        document.addEventListener('click', (e) => {
            // Si el clic no fue dentro del contenido del carrito y no fue en el icono del carrito
            if (!contenidoCarritoDiv.contains(e.target) && !carritoIconLink.contains(e.target)) {
                if (contenidoCarritoDiv.classList.contains('carrito-visible')) {
                    contenidoCarritoDiv.classList.remove('carrito-visible');
                    contenidoCarritoDiv.classList.add('carrito-oculto');
                }
            }
        });
    }


    if (contenedor) {
        contenedor.addEventListener('click', function(e) {
            if (e.target.classList.contains('botoncomprar')) {
                const index = parseInt(e.target.dataset.index);
                const productoSeleccionado = cervezas[index];
                agregarProductoAlCarrito(productoSeleccionado);
            }
        });
    }

    if (vaciarCarritoBtn) {
        vaciarCarritoBtn.addEventListener('click', () => {
            carrito = [];
            actualizarDisplayCarrito();
            alert('El carrito ha sido vaciado.');
            // Opcional: Cerrar el panel del carrito después de vaciar
            contenidoCarritoDiv.classList.remove('carrito-visible');
            contenidoCarritoDiv.classList.add('carrito-oculto');
        });
    }

    if (confirmarCompraBtn) {
        confirmarCompraBtn.addEventListener('click', () => {
            if (carrito.length === 0) {
                alert('El carrito está vacío. Añade productos antes de confirmar la compra.');
                return;
            }

            const confirmar = confirm('¿Estás seguro de que quieres confirmar la compra?');
            if (confirmar) {
                alert('Compra confirmada. ¡Gracias por tu pedido!');
                carrito = [];
                actualizarDisplayCarrito();
                // Opcional: Cerrar el panel del carrito después de confirmar
                contenidoCarritoDiv.classList.remove('carrito-visible');
                contenidoCarritoDiv.classList.add('carrito-oculto');
            }
        });
    }

    // Cargar el carrito desde localStorage al inicio y actualizar el display
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarDisplayCarrito();
    }

    // Guarda el carrito en localStorage cada vez que haya un cambio
    function guardarCarritoEnLocalStorage() {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    // Modifica las funciones que alteran el carrito para guardar los cambios
    const originalActualizarDisplayCarrito = actualizarDisplayCarrito;
    actualizarDisplayCarrito = function() {
        originalActualizarDisplayCarrito();
        guardarCarritoEnLocalStorage();
    };

});