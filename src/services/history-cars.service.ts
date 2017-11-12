import { Injectable } from '@angular/core';


@Injectable()
export class HistoryCars{

    oldcars:string[] = []
    
      constructor() {
    
      }
      private carsInit(){
        this.oldcars = JSON.parse(localStorage.getItem('oldcars'));
      }
      removeOrder(i){
        let oldcars:string[] = JSON.parse(localStorage.getItem('oldcars'));
        oldcars.splice(i, 1);
        localStorage.setItem('oldcars', JSON.stringify(oldcars));
        this.carsInit();
      }
      getOldCars(){
        this.carsInit();
        return this.oldcars;
      }

}