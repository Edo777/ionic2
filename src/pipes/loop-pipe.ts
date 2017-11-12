import { Pipe, PipeTransform } from '@angular/core';
import { CarOrder } from '../pages/interfaces/interfaces';


@Pipe({
    name:'sort',
    pure:false
})

export class FilterPipe implements PipeTransform{
    transform(order:any[]){
        for(let i = 0; i < order.length; i++){
            for(let j = 0; j < order.length-1; j++){
                if(order[j].brand[0] > order[j+1].brand[0]){
                    let ord = order[j];
                    order[j] = order[j+1];
                    order[j+1] = ord;
                }
            }
        }
        return order;
    }
}