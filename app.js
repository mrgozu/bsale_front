//  solicitudes http
const obtenerDatos = async ()=>{
    try {
        const resp  = await fetch('https://bsaleserver.herokuapp.com/completa');
        if (!resp.ok) throw ('no se pudo cargar los datos');
        
        return  await resp.json();
       
    } catch (error) {
        console.log('Error '+error);
    }

}
// visualizacion de la pagina 
const body = document.body;
let card;
const crearHtml = () =>{
    const html = `   
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-5">
    <div class="container">
        <a class="navbar-brand mx-5" href="#">BsaleTest</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse w-100" id="navbarSupportedContent">
            <form class="form-inline my-2 my-lg-0 w-100" id='buscador'>
                <input class="form-control mr-sm-2 w-75" type="search" placeholder="Search" aria-label="Search" />
                <button class="btn " type="button">
                    <i class="fas fa-search"></i>
                </button>
            </form>
        </div>
        <button class="btn " type="button" id='carro'>
        <i class="fas fa-shopping-cart"></i>
        </button>
    </div>
</nav>
<div class="container">
    <div class="row row-cols-1 row-cols-md-3" id="cardProducto">
            
      </div>

</div>`;
    const divHome = document.createElement('div');
    divHome.innerHTML = html;
    body.append(divHome);
}

// eventos (obtener id, btn, etc)
const eventos = ()=>{
    card  = document.getElementById('cardProducto');
    buscador = document.getElementById('buscador');
    carrito = document.getElementById('carro');
}

//  Card en que se mostraran los productos, recibe listado de productos
const mostrarProducto =    (producto)=>{
        const divCard = document.createElement('div');
        divCard.innerHTML = `
        <div class='card'>
        <img src="${producto.url_image||'./assets/img/image-not-found.png'}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${producto.name}</h5>
            <p class="card-text">${producto.discountPrice}</p>
        </div>
        </div>`;
        divCard.classList.add('col')
        card.append(divCard);
    
}
// Muestra todos los productos
const obtenerListaProductos = async()=>{
    const productos = await obtenerDatos();
 
    productos.forEach((data)=>{
        console.log(data);
            mostrarProducto(data);
        
    });
}

//  construccion html
const init  = () =>{
    crearHtml();
    obtenerListaProductos();
    eventos();
    
}





// ejecuciones
init();


