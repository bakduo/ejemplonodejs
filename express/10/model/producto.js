export class Producto {
  
   constructor(){
      this.title='';
      this.id=-1;
      this.thumbail='';
      this.price=0.0;
  }

  setTitle(t){
    this.title = t;
  }
  setId(i){
    this.id=i;
  }
  setThumbail(t){
    this.thumbail = t;
  }
  setPrice(p){
    this.price = p;
  }

  toJson(){
    //return JSON.stringify(this);
    return {title:this.title,price:this.price,thumbail:this.thumbail,id:this.id};
  }

}
