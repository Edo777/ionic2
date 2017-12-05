import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuComponent, OrdersHistory } from "../barrel";
import { MobiWash } from "../../services/barrel.service";
import { TranslateService } from "../../translate/translate.service";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    
   activeLng:any;
   localActiveLng:string;
   activeLngText:string;
   activeFlag:string;

  isComplete:boolean = false;
  name:string = '';
  phoneNumber:string = '';
  refCode=""
  email:string;
  
  constructor(public navCtrl: NavController, private mobiWash:MobiWash, private serv:TranslateService) {
    this.activeLng = this.serv.getActiveLng();
  }
  ngOnInit(){
     this.localActiveLng = this.activeLng.lng;
     this.activeLngText = this.activeLng.text;
     this.activeFlag = this.activeLng.flag;
     //////////////////////////// maxinacia
    // this.createAccount()
  }
  ngDoCheck(){
    if(this.name != '' && this.phoneNumber != ''){
      this.isComplete = true;
    }else{
       this.isComplete = false;
    }
  }
  
  changeLng(){
        if(this.localActiveLng == "arm"){
            this.activeLngText = "Անգլերեն"
            this.localActiveLng = "en"
            this.activeFlag = 'assets/imgs/english.png'
        }else{
            this.activeLngText = "Հայերեն"
            this.localActiveLng = "arm";
            this.activeFlag = 'assets/imgs/drosh.jpg';
        }
        let getter = {
          lng:this.localActiveLng,
          text:this.activeLngText,
          flag:this.activeFlag
        }
        this.serv.setActiveLng(getter);
    }

  createAccount(){ 
    this.mobiWash.addUser(this.name, this.phoneNumber);
    this.navCtrl.setRoot(MenuComponent);
    //this.navCtrl.setRoot(OrdersHistory);
  }

}