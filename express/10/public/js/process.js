
//Patron modulo
(()=>{

    const socket = io();
    const datos = document.getElementById("producto");
    const boton = document.getElementById("boton1");
    boton.addEventListener('click',procesar);

    function procesar(){
        
        const title =  datos.elements.namedItem("title").value; 
        const precio = datos.elements.namedItem("price").value; 
        const thumbail = datos.elements.namedItem("thumbail").value;

        const producto = {
            title:title,
            price: precio,
            thumbail: thumbail
        }

        socket.emit('procesar',producto);

        //clean formulario
        datos.reset();

    }

    socket.on('renderproductos',(data)=>{

        console.log("cargar productos");
        const template = `<center>
        <h1>Listado de productos</h1>
    </center>

    {{#if state }}
       <table class="table">
        <thead class="table-dark">
            <tr>
            
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Foto</th>

            </tr>
        </thead>
        <tbody>
            
    
            {{#if productos}}
                {{#each productos}}
                    <tr>
                    <td>{{this.title}}</td>
                    <td>{{this.price}}</td>
                    <td>
                        <img alt="image" src="{{this.thumbail}}"
                            width="50" height="50" />
                        </td>
                    </tr>
                {{/each}}
            {{/if}}

        </tbody>
    </table>

    {{else}}
    <table class="table">
        <thead class="table-dark">
            <tr>
            
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Foto</th>

            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
     <h1><center>No se encontrarón productos</center></h1>
    {{/if}}`

        let renderProductos = Handlebars.compile(template);
        
        document.getElementById('datos').innerHTML = renderProductos({
            productos:data,state:true,
        });
       
    });
    

})();