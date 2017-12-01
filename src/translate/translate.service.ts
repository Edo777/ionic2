import { Injectable } from "@angular/core";
import { DICTIONARY } from "./dictionary";

@Injectable()
export class TranslateService{
    dictionary:any = DICTIONARY;
    _activeLng:any = {
        lng:"arm",
        text:"Հայերեն",
        flag:'assets/imgs/drosh.jpg'
    }
    constructor(){}
    public getActiveLng(){
        return this._activeLng;
    }
    public setActiveLng(lng){
        this._activeLng = lng;
    }
    translate(key:string){
        return DICTIONARY[this._activeLng.lng][key];
    }

}