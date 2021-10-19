
import { createApp} from "https://deno.land/x/servest@v1.3.1/mod.ts";

import { ColorRoutes } from "./routes/color.ts";

const app = createApp();

const PORT = 3000;

app.route("/",ColorRoutes());

export {app,PORT}