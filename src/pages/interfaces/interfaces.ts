import { NativeGeocoderReverseResult } from "@ionic-native/native-geocoder";

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
    make_id:string,
    model_id:string,
    car_number:string,
    service:string,
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