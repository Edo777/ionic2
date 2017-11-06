import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';


@Component({
    selector:'history-page',
    templateUrl:'history.html',
})
export class HistoryPage{
    pageName:string;
    constructor(private navParams: NavParams){
        this.pageName = navParams.get('pageName')
    }
}