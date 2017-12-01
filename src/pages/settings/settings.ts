import { Component } from "@angular/core";
import { NavParams } from "ionic-angular";

@Component({
    selector:'settings',
    templateUrl:'settings.html'
})

export class Settings{
    pageName:string;
    constructor(private navParams: NavParams){
        this.pageName = this.navParams.get('pageName');
    }
}