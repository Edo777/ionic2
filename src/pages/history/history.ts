import { HistoryCars } from './../../services/history-cars.service';
import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';



@Component({
    selector:'history-page',
    templateUrl:'history.html',
    providers:[HistoryCars]
})
export class HistoryPage{
    pageName:string;
    oldcars:any[];
    constructor(private navParams: NavParams, private historyCars:HistoryCars){
        this.pageName = navParams.get('pageName')
        this.oldcars = this.historyCars.getOldCars();        
    }
    ngOnInit(){

    }       
    remove(i){
        this.historyCars.removeOrder(i);
        this.oldcars = this.historyCars.getOldCars();
    }
    ngAfterViewChecked(){
        this.oldcars = this.historyCars.getOldCars();
    }
}