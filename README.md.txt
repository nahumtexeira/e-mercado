Entrega 4

1. Productos relacionados.
- Trabajamos en la página product-info.js a la cual le agregamos una constante (containerRelatedProducts) con
un querySelector que asocia a un DIV creado en el HTML.
- Realizamos una función "showRelatedProducts" a la cuál la asociamos al Fetch que ya teníamos para que
muestre los datos. La función lo que hace es recorrer un forEach creando un DIV por cada producto asociado.
- Luego utilizamos la función "setProdID" para que guarde lo seleccionado en el localStorage, y la aplicamos
en el atributo "onclick" de la DIV "productRelatedInfo".
--------------------
2. Menú desplegable para info de "Mi Cuenta"
- Realizamos en el HTML un "Dropdown Menu" con una lista desordenada que muestre el nombre de usuario, un enlace
a "Mi cuenta" otro a "Mi carrito" y uno para cerrar sesión.
- También realizamos un "Dropdown Menu" para mostrar todas las categorías de forma dinámica. En este caso trabajamos
sobre el Js de init.js. Establecimos una constante para traer los datos del json y un Fetch para mostrar esos datos en el menú.
- Luego dentro de un forEach creamos los elemementos "li" y "a" como constantes, y en la etiqueta a utilizamos "text content"
para que traiga el nombre de la categoría y lo muestre y el atributo href para que dicha categoría redirija a la página products.html.
- Para finalizar, mediante la función "setCatID" hicimos que guarde la elección de la categoría mediante un evento onclick en el
localStorage.
--------------------
3. Modo día/noche.
- Implementado en la página product-info.html. Incorporamos un botón utilizando los íconos de font-awesome al cual le pusimos un ID "switch".
Creamos un archico dark_web para el Js y para el CSS, y tenerlos separados. En el Js mediante getElementbyID trajimos al botón y lo asociamos
a una constante. Realizamos un evento de "addEventListener" que al dar clic en el botón realice la acción de alternar entre el CSS común
y el CSS para el modo oscuro. la función "classList.toggle" agrega una clase a un elmeneto si no está presente y la elimina si ya está presente.
En este caso alterna entre las clases estándar y las de "body.dark". El código "switchButton.classList.toggle('active');" lo que hace es cambiar
el estilo visual del botón "switch".
--------------------
DESAFIATE
- Decidimos en lugar de usar un carrousel utilizar una galería de imágenes donde se muestra como imagen principal la perteneciente al ID 0
en la función "showProduct" y utilizamos la función "changeMainImage" para alternar entre las imágenes secundarias. La función toma como
parámetro el primer elemento del array (la imagen incial ID 0) y a través de un "for" itera sobre todas las imagenes del producto. Una 
vez que se hace clic en una imagen secundaria activa la función y reemplaza la principal.
- Para sumar al concepto decicimos mediante CSS incoroporar un Zoom a la imágen principal. Sobre la clase "mainImage" aplicamos una transición
del estilo de transformación con una suavidad de 0.2s y luego aplicamos una pseudoclase del estilo hover que al pasar el mouse sobre el elemento
aplique una transformación de tamaño a una escala de 1.5, osea que aumente un 50% del tamaño de la imagen.