import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {  MenuComponent } from "../barrel";
import { MobiWash } from "../../services/barrel.service";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  isComplete:boolean = false;
  name:string = '';
  phoneNumber:string = '';
  email:string;
  
  constructor(public navCtrl: NavController, private mobiWash:MobiWash) {
     
  }
  
  ngDoCheck(){
    if(this.name != '' && this.phoneNumber != ''){
      this.isComplete = true;
    }else{
       this.isComplete = false;
    }
  }
  
  createAccount(){ 
    this.mobiWash.addUser(this.name, this.phoneNumber);
    this.navCtrl.setRoot(MenuComponent);
  }

}