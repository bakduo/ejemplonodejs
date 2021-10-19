import {app,PORT} from "../src/app.ts";

const server = await app.listen({port:PORT});

console.log("app listening on port " + PORT);