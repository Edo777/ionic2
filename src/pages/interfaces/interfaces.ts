export interface User{
    id : number,
    name : string,
    telNumber : any,
    car : any[],
    address : any[] 
}

export interface CarOrder{
    input:string,
    model:string,
    numbers:number,
    address:string,
    sedan:string,
    bool:boolean, 
}

export interface NewOrder{
    brand:string,
    model:string,
    address?:string,
}

export interface Brand {
    completeBrand:Function,
    setBrand:Function,
    getBrands:Function,
}

export interface Model{
    completeModel:Function,
    setModel:Function,
    getModels:Function,
}

export interface LocalGetSet {
    get:Function;
    set:Function
}
