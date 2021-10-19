import { createRouter,contentTypeFilter } from "https://deno.land/x/servest@v1.3.1/mod.ts";

import { getColors, addColors } from "../controller/color.ts";


function ColorRoutes(){

    const router = createRouter();

    router.get("/",getColors);

    router.post("/",addColors);

    return router;
}

export {ColorRoutes}

