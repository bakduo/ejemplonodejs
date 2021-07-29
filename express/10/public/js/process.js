
//Patron modulo
(()=>{

    //TODO FIX
    let clientId = "";
    const MSG_SIZE=100;
    const datos = document.getElementById("producto");
    const boton = document.getElementById("boton1");
    const textarea = document.getElementById("chatarea");
    const textarea2 = document.getElementById("msgtext1");
    const email = document.getElementById("usermail");
    const boton2 = document.getElementById("boton2");
    /**Append data**/
    const nombre = document.getElementById("nombre");
    const apellido = document.getElementById("apellido");
    const alias = document.getElementById("alias");
    const avatar = document.getElementById("avatar");
    const edad = document.getElementById("edad");
    const updatedata = document.getElementById("sizenorma");

    
    boton.addEventListener('click',procesar);
    boton2.addEventListener("click",appendMessage);

    function validateEmail(email) {
        const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return res.test(String(email).toLowerCase());
      }

    function escapeHTML(str) {
        str = str + "''";
        var out = "''";
        for(var i=0; i<str.length; i++) {
            if(str[i] === '<') {
                out += '&lt;';
            } else if(str[i] === '>') {
                out += '&gt;';
            } else if(str[i] === "'") {
                out += '&#39;';
            } else if(str[i] === '"') {
                out += '&quot;';
            } else {
                out += str[i];
            }
        }
        return out;
   }
   
    function appendMessage(){

        const texto = textarea2.value;
        const tiempo = new Date();
        const parser =  tiempo.getDay() +  "/" + tiempo.getMonth() + "/" + tiempo.getFullYear() + " " + tiempo.getHours() + ":" + tiempo.getMinutes() + ":" + tiempo.getSeconds();
        const securemsg = escapeHTML(texto);

        /**Datos Normilizer*/
        const comment = new normalizr.schema.Entity('comment',{});
        const author = new normalizr.schema.Entity('author',{comment},{idAttribute: 'email'});
        const mensajeNorma = new normalizr.schema.Entity('mensaje',{
            assignee:author,
            comment
        });


        if (validateEmail(email.value)){
            if (securemsg.length < MSG_SIZE){
                const chat = "<b>"+ email.value +  "</b>: " + "<i>" + securemsg + "</i> " + "[" + parser + "]" ;
                textarea.innerHTML = textarea.innerHTML + "<br>" + chat;
                /*
                {
                mensaje: {
                    id: 'mensaje',
                    author: {
                    email: 'mail del usuario',
                    nombre: 'nombre del usuario',
                    apellido: 'apellido del usuario',
                    edad: 'edad del usuario',
                    alias: 'alias del usuario',
                    avatar: 'url avatar (foto, logo) del usuario'
                    },
                    comment: 'mensaje del usuario'
                }
                }
                */

                const originalData = {
                    id:'mensaje',
                        author: {
                                email: email.value,
                                nombre: nombre.value ,
                                apellido: apellido.value ,
                                edad: edad.value ,
                                alias: alias.value ,
                                avatar: avatar.value
                        },
                        comment: securemsg
                }
        
                const normalizedMessageData = normalizr.normalize(originalData, mensajeNorma);
                const denormalize = normalizr.denormalize(normalizedMessageData.result,originalData,normalizedMessageData.entities);
                const totalNorma = JSON.stringify(normalizedMessageData).length;
                const totalOrig = JSON.stringify(originalData).length;
                const totalDeno = JSON.stringify(denormalize).length;
                console.log(`Size normalize orig: ${totalOrig} norma: ${totalNorma} deno: ${totalDeno}`);
                const primerdif = (totalNorma-totalOrig) / 100.0;
                const calculate = (Math.floor(totalNorma*primerdif) - 100);
                updatedata.innerHTML = `Size normalize orig: ${totalOrig} norma: ${totalNorma} deno: ${totalDeno} overhead: ${calculate}%`;

                
                
                const msg = {
                    normalizer: normalizedMessageData,
                    tiempo:parser,
                }
                sc.sendMsg("appendmsg",msg);
            }else{
                alert("Very long message...")
            }
        }else{
            alert("Email not valid");
        }
    }

    function procesar(){
        
        const name =  datos.elements.namedItem("name").value || null  ; 
        const precio = datos.elements.namedItem("price").value || null; 
        const thumbail = datos.elements.namedItem("thumbail").value || null;

        let valid = false;

        if (name && precio && thumbail){
            const ok1 = (typeof name === 'string');
            const ok2 = (typeof thumbail === 'string')
            const ok3 = isNaN(precio)
            valid = ((ok1 && ok2) && !ok3)
        }
        
        if (valid){

            const producto = {
                name:name,
                price: precio,
                thumbail: thumbail,
            }
    
            sc.sendMsg('procesar',producto);
            
        }else{
            alert("Invalid DATA");
        }

        //clean formulario
        datos.reset();

    }

    document.addEventListener('DOMContentLoaded',()=>{
        
    })

})();