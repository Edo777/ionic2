import { Pipe, PipeTransform } from "@angular/core";
import { CarsService } from "../services/barrel.service";


@Pipe({
    name:'formatter',
})

export class CarFormatter implements PipeTransform{
    constructor(public carsService:CarsService){}
    transform(data,type){
        console.log(data)
        let result;
        switch(type){
            case "make_id":
                let maker = this.carsService.getCarName(data.make_id)
                result = data.type == "new" ? data.make_id : maker
            break;
             case "model_id":
                let model = this.carsService.getCarModel(data.make_id, data.model_id)
                result = data.type == "new" ? data.model_id : model
            break;
            default : result = "empty";
                
        }
        return result
    }
}