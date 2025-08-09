// Declaracion de constantes 
const btnModoOscuro = document.getElementById("btnModoOscuro");
const body = document.body;
const carritoButton= document.getElementById("carrito-button");
const contenedorProductos = document.getElementById("contenedor-productos");
const contadorCarrito= document.getElementById("contador-carrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// cargar productos del Json por medio de Fetch 
async function cargarProductos(){
    try{
       const respuesta = await fetch ("productos.json");
       const data = await respuesta.json();
       mostrarProductos(data);
    } catch(error){
       Swal.fire({
          icon: "info",
          title: "Error de carga de productos",
          text: `${err}`,
        });
    };
}

// se crean elementos en el DOM
function mostrarProductos(producto){
    contenedorProductos.innerHTML="";
    producto.forEach((beer)=>{
      const beerCard = document.createElement('div');
      beerCard.classList.add("beer-card");
      beerCard.innerHTML = `
       <img src="${beer.img}" alt="${beer.nombre}"/>
       <h2>${beer.nombre}</h2>
       <p>$ ${beer.precio}</p>
       <button data-id="${beer.id}" > Agregar </button>
        `;
        contenedorProductos.appendChild(beerCard);
    });

         document.querySelectorAll(".beer-card").forEach((button)=>{
         button.addEventListener("click",(evt)=>{
            const productoId = parseInt(evt.target.dataset.id)
            const productoToAdd = producto.find((item)=> item.id === productoId)
            if(productoId){
                addToCarrito(productoToAdd);
            }
        })
    })
    }
    
    // Declaracion de Funciones para Carrito de Compras
    function actualizarCarrito() {
    contadorCarrito.textContent = carrito.reduce(
        (acc, item)=> acc + item.quantity, 0)
    }
        
     function addToCarrito(beer) {
    const productoExistente = carrito.find((item)=> item.id === beer.id)

    if(productoExistente){
        productoExistente.quantity += 1;
    }else {
        carrito.push({...beer, quantity: 1})
    }
    localStorage.setItem("carrito", JSON.stringify(carrito))
    
    actualizarCarrito()
}
   
function showCarrito() {
    if(carrito.length === 0){
        Swal.fire({
            icon: 'info',
            title: 'Carrito vacío',
            text: 'Agregar productos al carrito',
        })
        return;
    }
 let carritoContent = '<ul class="carrito-lista">';
    let total = 0;

    carrito.forEach((item)=> {
        const itemTotal = item.precio * item.quantity + 0;
        total += itemTotal;
        carritoContent += `
        <li class="carrito-elementos">
                    <img src="${item.img}" alt="${item.nombre}" class="img-carrito">
                    <span class="item-carrito">${item.nombre} x ${item.quantity}</span>
                    <span>$${itemTotal.toFixed(2)} 
                    <button class="eliminar-de-carrito" data-id="${item.id}">X</button>
                    </span>
                </li>
            `;
    });
    carritoContent += `</ul>`;
        carritoContent += `<p class="total-carrito">Total: $${total.toFixed(2)}</p>`;

        const now = luxon.DateTime.local()
                    .setLocale('es')
                    .toLocaleString(luxon.DateTime.DATETIME_MED);
    carritoContent += `<p class="fecha-carrito">Fecha actual: ${now}</p>`

 Swal.fire({
        title: '<span class="textCarrito">Carrito de Compras</span>',
        html: carritoContent,
        width: 700,
        showCancelButton: true,
        confirmButtonText: 'Finalizar Compra',
        cancelButtonText: 'Continuar Compra',
        didOpen: () => {
            document.querySelectorAll(".eliminar-de-carrito").forEach((button)=>{
                button.addEventListener("click", (evt)=>{
                    // para eliminar producto del carrito
                    const productoToRemove = parseInt(evt.target.dataset.id)
                    removeFromCarrito(productoToRemove)
                    // para volver a abrir el carrito
                    showCarrito()
                })
            })
        }
    }).then((result)=> {
        if(result.isConfirmed){
            Swal.fire({
                icon: "success",
                title: 'Compra Confirmada',
                text: `Muchas Gracias por su Compra!`
            })
            // limpiar el carrito
            carrito = [];
            localStorage.removeItem("carrito");
            actualizarCarrito();
        }
    })
}
function removeFromCarrito(productoId){
    carrito = carrito.filter((item)=> item.id !== productoId)
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

carritoButton.addEventListener('click', showCarrito)
  
   // Se crea Boton para modo oscuro de Body
   btnModoOscuro.addEventListener("click", () => {
   body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("tema", "dark");
  } else {
    localStorage.setItem("tema", "light");
  }
});

// Inicialización
cargarProductos();
actualizarCarrito();

