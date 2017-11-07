import { Pipe, PipeTransform } from '@angular/core';
import { CarOrder } from '../pages/interfaces/interfaces';


@Pipe({
    name:'filter',
    pure:false
})

export class FilterPipe implements PipeTransform{
    transform(order:CarOrder[]){
        return order.filter((ord) => ord.bool)
    }
}