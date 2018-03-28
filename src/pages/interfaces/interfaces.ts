export interface User {
    id : number,
    name : string,
    customer_phone : any,
    car : any[],
    address : any[],
    order: any[]
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
    make_id:any,
    model_id:any,
    car_number:any,
    service:any,
    type?:string
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

export interface SearchCars{
    getBrands:Function,
    getModels:Function
}
