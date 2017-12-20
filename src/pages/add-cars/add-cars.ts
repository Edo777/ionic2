import {Component} from '@angular/core';
import { MobiWash, CarsService } from "../../services/barrel.service";
import { SearchCars } from "../interfaces/interfaces";
import { ViewController, NavParams } from "ionic-angular";

@Component({
    selector:'add-cars',
    templateUrl:'add-cars.html'
})
export class AddCars{
   
    //models
    localModels: any[];
    models: any[];

    closeSearchBrands: boolean = true;
    closeSearchModels:boolean = true;
    private brandName; modelName; carNumber;
    brands:any[];
    cars:any[] = [];
    dataJson:any[];
    addNewCar:any = {make_id: '', model_id:'', car_number:''}
    isEdit:boolean;
    isAddNewCar:boolean = false;
    
      constructor(
        private viewCtrl:ViewController,
        private mobiWash:MobiWash,
        private ordersCtrl:CarsService,
        private params:NavParams
    ){}      
        ngOnInit(){
       
        this.cars = this.mobiWash.getCars();
        if(this.params.data["car"]){
            this.isEdit = true;
            this.brandName = this.params.data["car"].make_id;
            this.modelName = this.params.data["car"].model_id;
            this.carNumber = this.params.data["car"].car_number;
        }
        this.initializeCars();
    }
    ngAfterViewInit() {
        //this.cars = this.mobiWash.getCars();
    }
    initializeCars() {
        this.dataJson = this.ordersCtrl.getResults()
     }


    completeBrand(model:any[],val:string){
        this.closeSearchBrands = false;
        this.brandName = val;
        this.models = model;
    }

    completeModel(val:string){
        this.closeSearchModels = false;
        this.modelName = val
    }

    search:SearchCars = {
        getModels:(ev: any) => {
            let val = ev.target.value;
            if (val && val.trim() != '' && this.models.length) {
                this.localModels = this.models.filter((item:any) => {
                    return (item.name.toLowerCase().startsWith(val.toLowerCase()));
                })
            }else{
                this.localModels = []
            }
        },
        getBrands:(ev: any) => {
            this.initializeCars();
            let val = ev.target.value;
            if (val && val.trim() != '') {
                this.brands = this.dataJson.filter((item) => {
                    return (item.name.toLowerCase().startsWith(val.toLowerCase()));
                })
            }else{
                this.brands = []
            }
         }
    }

    

    addCar(){
            this.addNewCar.make_id = this.brandName;
            this.addNewCar.model_id = this.modelName;
            this.addNewCar.car_number = this.carNumber;
            this.addNewCar.type = "new";

            for(let i of this.dataJson){
                if(i.name.toLowerCase() == this.addNewCar.make_id.toLowerCase()){
                    for(let j of i.models){
                        if(j.name.toLowerCase() == this.addNewCar.model_id.toLowerCase()){
                            this.addNewCar.make_id = i.id;
                            this.addNewCar.model_id = j.id;
                            this.addNewCar.car_number = this.carNumber;
                            delete this.addNewCar.type
                            break;
                        }
                    }
                }
            }
            console.log(this.addNewCar)
            this.viewCtrl.dismiss([this.addNewCar, this.isEdit, ]);
        
        
    }
    close(){
        this.viewCtrl.dismiss();
    }
    ngOnDestroy(){
         this.isEdit = false;
    }

}