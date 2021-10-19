// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
// @deno-types="https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import { createApp } from "https://deno.land/x/servest@v1.3.1/mod.ts";

const app = createApp();

const jsBundlePath="./public/init.js";

app.handle("/", async (req) => {
  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html; charset=UTF-8",
    }),
    body: ReactDOMServer.renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>Colores</title>
          <script  src="${jsBundlePath}"></script>
        </head>
        <body>
          <h1 style={{color:'green'}}>Ingrese un color!</h1>
          
          <form action="#">
             <input type="text" name="color" id="color"></input>
             <button type="button" name="enviar" id="bcolor">Enviar</button>
          </form>

        </body>
      </html>
    ),
  });
});


app.listen({ port: 3001 });