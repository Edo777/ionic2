import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from "../translate/translate.service";


@Pipe({
    name:'translate',
    pure:false
})

export class Translate implements PipeTransform{
    constructor(private translateSrv:TranslateService){}
    transform(key:string){
        return this.translateSrv.translate(key);
    }
}
