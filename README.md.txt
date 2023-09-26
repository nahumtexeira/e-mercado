Entrega 4

1. En la misma página realizada en la entrega anterior con respecto a la información de un producto: 
mostrar también productos relacionados, incluídos su nombre e imagen. Al pulsar sobre uno de los productos 
relacionados se debe actualizar la página y mostrar la información del producto seleccionado.

- Trabajamos en la página product-info.js a la cual le agregamos una constante (containerRelatedProducts) con
un querySelector que asocia a un DIV creado en el HTML.
- Realizamos una función showRelatedProducts(infoCard) a la cuál la asociaumos al Fetch que ya teníamos para que
muestre los datos.
- La función lo que hace es recorrer un forEach creando un DIV por cada producto asociado.
--------------------
2. Convertir el nombre de usuario que se encuentra en la barra de navegación en un menú desplegable* (manteniendo
el nombre de usuario cómo botón) y agregar allí al menos las siguientes opciones:
Mi carrito y que al seleccionarla redirija a esa pantalla (trabajaremos sobre esta página en una futura entrega).
Mi perfil y que al seleccionarla redirija a esa pantalla (trabajaremos sobre esta página en una futura entrega).
Cerrar sesión, que deberá redirigir a la pantalla de inicio de sesión, borrando el usuario autenticado.

- Realizamos en el HTML un "Dropdown Menu" con una lista desordenada que muestre el nombre de usuario, un enlace
a "Mi cuenta" otro a "Mi carrito" y uno para cerrar sesión.
- También realizamos un "Dropdown Menu" para mostrar todas las categorías de forma dinámica. En este caso Trabajamos
sobre el Js de 