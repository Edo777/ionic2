import { Injectable } from "@angular/core";
import { DICTIONARY } from "./dictionary";

@Injectable()
export class TranslateService{
    dictionary:any = DICTIONARY;
    _activeLng:any = {
        lng:"arm",
        text:"English",
        flag:'assets/imgs/english.png'
    }
    constructor(){
        
    }
    public getActiveLng(){
        return this._activeLng;
    }
    public setActiveLng(lng){
        this._activeLng = lng;
    }
    translate(key:string){
        return DICTIONARY[this._activeLng.lng][key];
    }
    translateImportant(key1, key2){
        if(this._activeLng.lng == "arm"){
            return key1
        }else{
            return key2;
        }
    }

}