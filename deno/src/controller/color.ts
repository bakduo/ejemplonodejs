
let colores:any[] = [];

const getColors = async (req:any) => {
  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "application/json",
    }),
    body: JSON.stringify({status:true,colors:colores}),
  });
};

const addColors = async (req:any) => {
  
  const bodyJson = (await req.json());

  if (!bodyJson) {
      await req.respond({
        status: 500,
        message: "No data",
    });
  }

  const color: any = await req.json();
  colores.push(color)
  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "application/json",
    }),
    body: JSON.stringify({status:true,color:bodyJson.color}),
  });

};

export {
    getColors,
    addColors
}