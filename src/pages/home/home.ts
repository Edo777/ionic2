import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { MenuComponent, OrdersHistory } from "../barrel";
import { MobiWash } from "../../services/barrel.service";
import { TranslateService } from "../../translate/translate.service";
import { ApiService } from "../../services/api.service";


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
  
  constructor(
    public navCtrl: NavController, 
    private mobiWash:MobiWash, 
    private serv:TranslateService,
    private api:ApiService,
    private toastCtrl:ToastController,
    private loadingCtrl:LoadingController
  ) {
    this.activeLng = this.serv.getActiveLng();
  }
  ngOnInit(){
     this.localActiveLng = this.activeLng.lng;
     this.activeLngText = this.activeLng.text;
     this.activeFlag = this.activeLng.flag;
     /*
     this.api.registration("Agahsi","1145747","AghHg","1145","eryhjklkcxghj").subscribe(
       data=>{
        console.log(data)
      },
       error=>{
          console.log(error)
       }
      )
      this.api.getAllcars().subscribe(data=>{
        console.log(data)
      })
      */
     //////////////////////////// maxinacia
     //this.createAccount()
  }
  ngDoCheck(){
    if(this.name != '' && this.phoneNumber != ''){
      this.isComplete = true;
    }else{
       this.isComplete = false;
    }
  }
  
  changeLng(){
        if(this.localActiveLng == "en"){
            this.activeLngText = "Անգլերեն"
            this.localActiveLng = "arm"
            this.activeFlag = 'assets/imgs/english.png'
        }else{
            this.activeLngText = "Հայերեն"
            this.localActiveLng = "en";
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
    let loading = this.loadingCtrl.create({
            content: this.serv.translateImportant("Խնդրում եմ սպասել․․․", 'Please wait...')
        });
      loading.present();
  this.api.registration(this.name,this.phoneNumber,this.email,this.refCode,"qwertyuoiuytred5343468757").subscribe( 
      
      (data)=>{
        
        console.log(data)
        if(data["status"]=="ok" || data["status"] == "success"){
          console.log(data)
          this.mobiWash.addUser();
          loading.dismiss();
          this.mobiWash.setActiveUser(data["data"].id)
          this.api.setId(data["data"].id);
          this.navCtrl.setRoot(MenuComponent);
        }else {
          loading.dismiss();
          let message = "you haven'n internet connection";
          this.showToast(message);
        }
    },
      (error)=>{
        this.showToast(error);
    })
    
    
    
    
    //this.navCtrl.setRoot(OrdersHistory);
  }

  showToast(err) {
    let toast = this.toastCtrl.create({
      message: `${err}`,
      duration: 2000,
      position: "top"
    });

    toast.present(toast);
  }


}