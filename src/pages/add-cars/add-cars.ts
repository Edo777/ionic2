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
   
    brands:any[];
    cars:any[] = [];
    dataJson:any[];
    addNewCar:any = {brand: '', model:'', number:''}
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
            this.addNewCar.brand = this.params.data["car"].brand;
            this.addNewCar.model = this.params.data["car"].model;
            this.addNewCar.number = this.params.data["car"].number;
        }
        this.initializeCars();
    }
    ngAfterViewInit() {
        //this.cars = this.mobiWash.getCars();
    }
    initializeCars() {
        this.ordersCtrl.getResults()
        .subscribe(data=>{
            this.dataJson = data;
        });
     }


    completeBrand(model:any[],val:string){
        this.closeSearchBrands = false;
        this.addNewCar.brand = val;
        this.models = model;
    }

    completeModel(val:string){
        this.closeSearchModels = false;
        this.addNewCar.model=val
    }

    search:SearchCars = {
        getModels:(ev: any) => {
            let val = ev.target.value;
            if (val && val.trim() != '' && this.models.length) {
                this.localModels = this.models.filter((item:any) => {
                    return (item.value.toLowerCase().startsWith(val.toLowerCase()));
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
                    return (item.value.toLowerCase().startsWith(val.toLowerCase()));
                })
            }else{
                this.brands = []
            }
         }
    }

    addCar(){
        this.viewCtrl.dismiss([this.addNewCar, this.isEdit]);
    }
    close(){
        this.viewCtrl.dismiss();
    }
    ngOnDestroy(){
         this.isEdit = false;
    }

}