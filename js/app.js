const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const ListaCursos = document.querySelector('#lista-cursos')

let articulosCarrito = []

registrarEventListeners ()

function registrarEventListeners () {
    //Cuando agregas un curso presionado "Agregar al Carrito"
    ListaCursos.addEventListener('click', agregarCurso)

    //Elimina articulos del carrito
    carrito.addEventListener('click', borarCurso )

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', limpiarCarrito)

    // Muestra cursos de localStorage
    document.addEventListener('DOMContentLoaded', () =>{
        articulosCarrito = JSON.parse(localStorage.getItem('carrito'))

        carritoHTML()
    })

}



function agregarCurso(evento) {
    evento.preventDefault()


    if (evento.target.classList.contains('agregar-carrito')){
        const cursoElejido = evento.target.parentElement.parentElement
       datosCurso(cursoElejido)
       
    }
    
}
// Elimina curso del carrito
function borarCurso(evento) {
    if(evento.target.classList.contains('borrar-curso')){
        const cursoElejidoId = evento.target.getAttribute('data-id')

        articulosCarrito = articulosCarrito.filter( cursoElejido => cursoElejido.id !== cursoElejidoId)
    }
    carritoHTML()
}


//Lee el contenido del HTML al que le damos click y extrae la información del curso

function datosCurso(cursoElejido) {
    

    //Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: cursoElejido.querySelector('img').src,
        titulo: cursoElejido.querySelector('h4').textContent,
        precio: cursoElejido.querySelector('span').textContent,
        id: cursoElejido.querySelector('a').getAttribute('data-id'),
        cantidad : 1
        
    }

    // Revisa si el articulo ya existe en el carrito

    const articuloExiste = articulosCarrito.some ( cursoElejido => cursoElejido.id == infoCurso.id)
    if(articuloExiste){
        const curosElejidos = articulosCarrito.map( cursoElejido => {

            if (cursoElejido.id == infoCurso.id)  {
             cursoElejido.cantidad++
                return cursoElejido
            } else {
                return cursoElejido
            }
        })
        articulosCarrito = [...curosElejidos]

    }else{
        articulosCarrito = [...articulosCarrito , infoCurso]
    }

    
    carritoHTML()
}

function limpiarCarrito () {
    articulosCarrito = []    
}

// Muestra el carrito de compras en el HTML

function carritoHTML () {

    // Limpiar el HTML
    limpiarHTML()

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach( cursoElejido =>{
        const row = document.createElement('tr')
        row.innerHTML = `

            <td>
               <img src = ${cursoElejido.imagen} width = 120 >
            </td>

            <td>
                ${cursoElejido.titulo}
            </td>

            <td>
                ${cursoElejido.precio}
            </td>

            <td>
                ${cursoElejido.cantidad} 
            </td>

            <td>
               <a href = "#" class = "borrar-curso" data-id= ${cursoElejido.id}  > x </a>
            </td>
        ` 

        //  Agrega el HTML del carrito en el tbody   
        contenedorCarrito.appendChild(row)     
                
    })
    
    sincronizarStorage()
    // Agrega productos al storage
    function sincronizarStorage (){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito))
   }


    
}

// Elimina los cursos del tbody

function limpiarHTML() {
    contenedorCarrito.innerHTML = ''
}