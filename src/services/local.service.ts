import { Injectable } from "@angular/core";

@Injectable()

export class Local{
    set(name:string, value:any){
        localStorage.setItem(name, JSON.stringify(value));
    }
    get(name){
        return JSON.parse(localStorage.getItem(name));
    }
    remove(name:string){
        localStorage.removeItem(name);
    }
}