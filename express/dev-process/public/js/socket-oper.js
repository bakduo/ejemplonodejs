//Patron modulo
const sc = (()=>{

        

        function getDataOneMessage(data){

            const comment = new normalizr.schema.Entity('comment',{});
            const author = new normalizr.schema.Entity('author',{comment},{idAttribute: 'email'});
            const mensaje = new normalizr.schema.Entity('mensaje',{
                assignee:author,
                comment
            });

            data = JSON.parse(data);
            
            const desnormalizado = new normalizr.denormalize(data.result, mensaje, data.entities);

            return JSON.stringify(desnormalizado, null, 2);
        }

        function getData(data){

            const comment = new normalizr.schema.Entity('comment',{});
            const author = new normalizr.schema.Entity('author',{comment},{idAttribute: 'email'});
            const mensaje = new normalizr.schema.Entity('mensaje',{
                assignee:author,
                comment
            });

            const posts = new normalizr.schema.Entity('posts',{
                assignee:[mensaje]
            });

            data = JSON.parse(data);
            
            const desnormalizado = new normalizr.denormalize(data.result, posts, data.entities);

            return JSON.stringify(desnormalizado, null, 3);
        }

        const socket = io();

        const textarea = document.getElementById("chatarea");
    
        socket.on('renderproductos',(data)=>{

            console.log("cargar productos");
            const template = `<center>
            <h1>List products</h1>
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
                        <td>{{this.name}}</td>
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
        <h1><center>No Products</center></h1>
        {{/if}}`

            let renderProductos = Handlebars.compile(template);
            
            document.getElementById('datos').innerHTML = renderProductos({
                productos:data,state:true,
            });
        
        });
        
    socket.on("getClient",(data)=>{

        socket.emit('getproductos',{});
        socket.emit('getmsg',{})
        
    });

    socket.on("connection",(data)=>{
        
        console.log("Conection client");

    })

    socket.on("reloadmsg",(data)=>{

        const datMessage = JSON.parse(getDataOneMessage(data));

        console.log(datMessage);

        const obj = JSON.parse(datMessage);

        const chat = "<b>"+ obj.entities.mensaje.mensaje.author.email +  "</b>: " + "<i>" + obj.entities.mensaje.mensaje.comment + "</i> " + "[" + data.tiempo + "]" ;

        textarea.innerHTML = textarea.innerHTML + "<br>" + chat;
    });

    socket.on("overflow",(data)=>{
        alert("MAx msg ...")
    });

    socket.on("rendermsg",(items)=>{

        const datMessageNorma = JSON.parse(getData(items));

        console.log(datMessageNorma.mensajes);

        datMessageNorma.mensajes.forEach(element => {
            console.log(element);
            const chat = "<b>"+ element.author.email +  "</b>: " + "<i>" + element.comment + "</i> " + "[" + element.tiempo + "]" ;
            textarea.innerHTML = textarea.innerHTML + "<br>" + chat;
        });

    })

    function sendMsg(msg,data){
        socket.emit(msg,data);
    }

    return {
        sendMsg
    };

})();