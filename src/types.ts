export type PizzaType={
    id:number,
    imageUrl:string,
    name:string,
    types:number[],
    sizes:number[],
    price:number,
    category:number,
    rating:number
}
export type TaddPiza={
    imageUrl:string,
    name:string,
    types:number[],
    sizes:number[],
    price:number,
    category:number,
}

export type TpizzaItemCart={
    imageUrl:string,
    type:string,
    size:number,
    name:string,
    id:number,
    price:number,

}

export type TpizzaCart={
    items:TpizzaItemCart
    totalPrice:number 
       
}



