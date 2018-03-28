import {Component} from '@angular/core';
import {MobiWash, CarsService} from "../../services/barrel.service";
import {SearchCars} from "../interfaces/interfaces";
import {ViewController, NavParams, Keyboard} from "ionic-angular";

@Component({
  selector: 'add-cars',
  templateUrl: 'add-cars.html'
})
export class AddCars {

  //models
  localModels: any[];
  models: any[];

  closeSearchBrands: boolean = true;
  closeSearchModels: boolean = true;
  private brandName;
  modelName;
  carNumber;
  brands: any[];
  cars: any[] = [];
  dataJson: any[];
  addNewCar: any = {make_id: '', model_id: '', car_number: ''}
  isEdit: boolean;
  isAddNewCar: boolean = false;

  constructor(private viewCtrl: ViewController,
              private mobiWash: MobiWash,
              private ordersCtrl: CarsService,
              private params: NavParams,
              private keyBoard: Keyboard) {
  }

  ngOnInit() {

    this.cars = this.mobiWash.getCars();
    //get data ->
    this.initializeCars();
    this.isHasDataWhenModalOpen()
    this.keyboardEnterButton()
  }


  keyboardEnterButton() {
    var elems = document.getElementsByTagName('ion-input');
    for (let i = 0; i < elems.length; i++) {
      elems[i].addEventListener('keypress', (event: any) => {
        if (event.key == "Enter") {
          this.keyBoard.close()
        }
      })
    }

  }

  ngAfterViewInit() {
    //this.cars = this.mobiWash.getCars();
  }

  initializeCars() {
    this.dataJson = this.ordersCtrl.getResults()
  }


  completeBrand(model: any[], val: string) {
    this.closeSearchBrands = false;
    this.brandName = val;
    this.models = model;
  }

  completeModel(val: string) {
    this.closeSearchModels = false;
    this.modelName = val
  }

  search: SearchCars = {
    getModels: (ev: any) => {
      let val = ev.target.value;
      if (val && val.trim() != '' && this.models) {
        this.localModels = this.models.filter((item: any) => {
          return (item.name.toLowerCase().startsWith(val.toLowerCase()));
        })
      } else {
        this.localModels = []
      }
    },
    getBrands: (ev: any) => {
      this.initializeCars();
      let val = ev.target.value;
      if (val && val.trim() != '') {
        this.brands = this.dataJson.filter((item) => {
          return (item.name.toLowerCase().startsWith(val.toLowerCase()));
        })
      } else {
        this.brands = []
      }
    }
  }


  addCar() {
    this.addNewCar.make_id = this.brandName;
    this.addNewCar.model_id = this.modelName;
    this.addNewCar.car_number = this.carNumber;
    this.addNewCar.type = "new";

    for (let i of this.dataJson) {
      if (i.name.toLowerCase() == this.addNewCar.make_id.toLowerCase()) {
        for (let j of i.models) {
          if (j.name.toLowerCase() == this.addNewCar.model_id.toLowerCase()) {
            this.addNewCar.make_id = i.id;
            this.addNewCar.model_id = j.id;
            this.addNewCar.car_number = this.carNumber;
            delete this.addNewCar.type
            break;
          }
        }
      }
    }
    this.viewCtrl.dismiss([this.addNewCar, this.isEdit,]);


  }

  isComplete() {
    if (this.brandName && this.modelName && this.carNumber) {
      return false;
    }
    return true;
  }

  isHasDataWhenModalOpen() {
    if (this.params.data["car"]) {
      this.isEdit = true;
      let car = this.params.data["car"];
      this.carNumber = this.params.data["car"].car_number;
      if (car.type) {
        let brand = this.dataJson.find((element) => car.make_id.toLowerCase() == element.name.toLowerCase());
        if (brand) {
          this.models = brand.models;
        }
        this.brandName = car.make_id;
        this.modelName = car.model_id;
      } else {
        let brand = this.dataJson.find((element) => car.make_id == element.id);

        let model = brand.models.find((element) => car.model_id == element.id);

        this.models = brand.models;
        this.brandName = brand.name;
        this.modelName = model.name;
      }

    }
  }

  close() {
    this.viewCtrl.dismiss();
  }

  ngOnDestroy() {
    this.isEdit = false;
  }

}
