import { Component } from "@angular/core";
import { NavParams, ViewController } from "ionic-angular";

@Component({
    selector:"order-info",
    templateUrl:"order-info.html"
})
export class OrderInfo{
    private info:any;
    constructor(
        private params:NavParams,
        private viewCtrl:ViewController
    ){}

    ngOnInit(){
        this.info = this.params.data["info"];
        console.log(this.info);
    }

    close(){
        this.viewCtrl.dismiss();
    }
}