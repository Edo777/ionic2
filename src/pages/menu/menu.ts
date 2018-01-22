import { Component, ViewChild } from "@angular/core";
import { NavController, Nav, NavParams, AlertController } from 'ionic-angular';
import { UserAccount, HomePage, HistoryPage, AboutUs, Addresses, OrdersPage, OrdersHistory, Settings, ServicesAndPrices } from '../barrel'
import { MobiWash, CarsService } from "../../services/barrel.service";
import { TranslateService } from "../../translate/translate.service";
import { CallNumber } from "@ionic-native/call-number";

interface Pages{
    pageName: string,
    component:any
}

@Component({
    selector:'menu-page',
    templateUrl:'menu.html',
    providers:[CallNumber]
})

export class MenuComponent{
    @ViewChild(Nav) nav:Nav;
    
    rootPage = UserAccount;
    activePage:any = UserAccount;
    activeLng:any;
    localActiveLng:string;
    activeLngText:string;
    activeFlag:string;
    id:number;
    
    pages:Pages[] = [
        { pageName:"create_order", component: OrdersPage},
        { pageName:"favorite_cars", component: HistoryPage},
        { pageName:"favorite_addresses", component: Addresses},
        { pageName:"my_orders", component: OrdersHistory},
        { pageName:"personal_inf", component: Settings},
        { pageName:"about_us", component: AboutUs},   
        { pageName:"services_and_prices", component: ServicesAndPrices},      
    ]
    constructor(
        public navCtrl:NavController, 
        public params:NavParams, 
        private mobiWash:MobiWash,
        private alertCtrl:AlertController,
        private serv:TranslateService,
        private callNumber: CallNumber
    ){
        
            this.activeLng = this.serv.getActiveLng();
       
    }
    ngOnInit(){
        
            this.localActiveLng = this.activeLng.lng;
            this.activeLngText = this.activeLng.text;
            this.activeFlag = this.activeLng.flag;
        
    }
    bgChange(page){
        return page.component == this.activePage;
        
    }
    openPage(page:Pages){
        this.activePage = page.component;
        this.nav.setRoot(page.component, {pageName:page.pageName});
    }
    //call admin
    callAdmin(){
        this.callNumber.callNumber("+37455950905", true)
            .then(() => console.log('Launched dialer!'))
            .catch(() => console.log('Error launching dialer'));
    }

    //language
    changeLng(){
        this.activeLngText = this.serv.translateImportant("Հայերեն", "English");
        if(this.localActiveLng == "en"){
            this.localActiveLng = "arm"
            this.activeFlag = 'assets/imgs/english.png'
        }else{
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
    outUser() {
        let a:any = {};
        a.exit = this.serv.translateImportant("Այո", "Yes");
        a.cancel = this.serv.translateImportant("Ոչ", "No");
        a.question = this.serv.translateImportant("Դուք վստա՞հ եք", "Are you sure?")
        let confirm = this.alertCtrl.create({
          enableBackdropDismiss:false,
          message: a.question,
          buttons: [
            {
                text: a.cancel,
                handler: () => {}
              },
            {
              text: a.exit,
              handler: () => {
                this.navCtrl.setRoot(HomePage);
                localStorage.removeItem("phone_number")
                localStorage.removeItem("id")
              }
            }
            
          ]
        });
        confirm.present();
    }
}