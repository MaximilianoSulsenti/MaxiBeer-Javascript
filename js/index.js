let nombre = "Maxi";
let apellido = "Sulsenti"
let edad = 33;

// funcion para validar la mayoria de edad 
function ingresar(){
  let edad = prompt("ingrese su edad");    
  if (edad >= 18){
      console.log("puedes ingresar");
  }else{
      console.log("no puedes ingresar");
 }
}
 ingresar ()

// Bievenida al sitio ingresando al usuario
 function iniciar(){
    console.log ("Bienvenido a MaxiBeer")
    login ();
}
function login (){
    let usuario = prompt ("ingrese su usuario");
    let password = prompt("ingrese su contrasena");
    validar(usuario, password)
}
function validar(usuario, password){
 if (usuario === "maxi sulsenti" && password === "12345"){
    console.log("Hola , Bienvenido a MaxiBeer.." + usuario);
 }else{
    console.log("usuario o contrasena incorrecta")
    login();
 }
}
iniciar()

// Se declara un Array con objetos dentro para agregar a una posible lista de productos 
const cervezasArtesanales = [
  {
    nombre: "Lager",
    descripcion: "Cerveza Rubia suave .",
    precio: 2800
  },
  {
    nombre: "Stout",
    descripcion: "Es una cerveza oscura con sabores intensos, a menudo con notas de café y chocolate. .",
    precio: 2800
  },
  {
    nombre: "Golden Ale Dorada",
    descripcion: "Una cerveza ligera y refrescante, de color dorado brillante, con sutiles aromas frutales y un final limpio.",
    precio: 3000
  },
  {
    nombre: "Porter",
    descripcion: "Cerveza oscura, con sabores a chocolate y café. .",
    precio: 3000
  },
  {
    nombre: "Honey Beer",
    descripcion: "Elaborada con miel.",
    precio: 3000
  },
  {
    nombre: "IPA",
    descripcion: "Un estilo con mucho lúpulo, amargo y aromático.",
    precio: 3500
  },
  {
    nombre: "Red Ale Malta",
    descripcion: "Una cerveza rojiza con un marcado carácter a malta caramelizada.",
    precio: 3500
  },
  {
    nombre: "Blond Ale",
    descripcion: " Cerveza de color dorado, con sabores suaves y afrutados.",
    precio: 3500
  },
  {
    nombre: "APA",
    descripcion: "Es una cerveza refrescante, aromática y con un amargor balanceado.",
    precio: 3500
  },
];

console.table(cervezasArtesanales)

// creando un bucle con For que recorre todos los productos del Array
for (let i = 0; i < cervezasArtesanales.length; i++){
    console.log ("Agregar a mi carrito:" + [i]);
}

// Creando un bucle con while donde se puede hacer una lista de pedidos
let entrar = "";
while (entrar !== "salir"){
   entrar = prompt('escribe "salir" para terminar:');
    if (entrar !== "salir"){
   console.log("Agregar a mi lista de compras : "  + entrar);
}else{
    entrar = 'salir';
    console.log ("Lista finalizada");
}
}
