import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {  MenuComponent } from "../barrel";

   
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

  
  constructor(public navCtrl: NavController) {

  }
  isCompleteName(){
    this.classOptionsForName = {
      'color-red': !this.classOptionCtrlForName,
      'color-green': this.classOptionCtrlForName
    }
    if(this.name.length >=1 && this.name.length<=2){
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
    if(!isNaN(Number(this.phoneNumber)) && this.phoneNumber.length === 1){
      this.classOptionCtrlForNumber = true;
    }else{
      this.classOptionCtrlForNumber = false;
    }   
  }
  createAccount(){
    
    if(this.classOptionCtrlForNumber){
      let userInfo = {
        name: this.name,
        phoneNumber:this.phoneNumber
      }
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      this.navCtrl.setRoot(MenuComponent);
    }
   
 
  }

}
