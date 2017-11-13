import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {  MenuComponent } from "../barrel";
import { MobiWash } from "../../services/barrel.service";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  classOptionCtrlForName:boolean = false;
  classOptionsForName:any;
  classOptionCtrlForNumber:boolean = false;
  classOptionsForNumber:any;

  name:string = '';
  phoneNumber:string;

  
  constructor(public navCtrl: NavController, private mobiWash:MobiWash) {
     
  }
  
    
  
  isCompleteName(){
    this.classOptionsForName = {
      'color-red': !this.classOptionCtrlForName,
      'color-green': this.classOptionCtrlForName
    }
    if(this.name.length >=1 && this.name.length<=6){
      this.classOptionCtrlForName = true;
    }else{
      this.classOptionCtrlForName = false;
    }
  }
  isCompletePhone(){
    this.classOptionsForNumber = {
      'color-red': !this.classOptionCtrlForNumber,
      'color-green': this.classOptionCtrlForNumber
    }
    if(this.phoneNumber.length === 3){
      this.classOptionCtrlForNumber = true;
    }else{
      this.classOptionCtrlForNumber = false;
    }   
  }
  createAccount(){
    
    this.mobiWash.addUser(this.name, this.phoneNumber);
    this.navCtrl.setRoot(MenuComponent);
    /*
    if(this.classOptionCtrlForNumber){
      let userInfo = {
        name: this.name,
        phoneNumber:this.phoneNumber
      }
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      
    }
   
  */
  }

}
