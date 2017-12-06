import { Component, ViewChild } from "@angular/core";
import { NavController, Nav, NavParams, AlertController } from 'ionic-angular';
import { UserAccount, HomePage, HistoryPage, AboutUs, Addresses, OrdersPage, OrdersHistory, Settings } from '../barrel'
import { MobiWash, CarsService } from "../../services/barrel.service";
import { TranslateService } from "../../translate/translate.service";

interface Pages{
    pageName: string,
    component:any
}

@Component({
    selector:'menu-page',
    templateUrl:'menu.html',
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
        { pageName:'Պատվերի գրանցում', component: OrdersPage},
        { pageName:'Իմ մեքենաները', component: HistoryPage},
        { pageName:'Իմ հասցեները', component: Addresses},
        { pageName:'Իմ պատվերները', component: OrdersHistory},
        { pageName:'Կարգավորումներ', component: Settings},
        { pageName:'Մեր մասին', component: AboutUs},          
    ]
    constructor(
        private navCtrl:NavController, 
        public params:NavParams, 
        private mobiWash:MobiWash,
        private alertCtrl:AlertController,
        private serv:TranslateService
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

    //language
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
    outUser() {
        let a:any = {};
        a.exit = this.serv.translateImportant("Դուրս գալ", "Exit");
        a.delete = this.serv.translateImportant("Ջնջել", "Delete");
        a.cancel = this.serv.translateImportant("Մնալ", "Cancel");
        a.question = this.serv.translateImportant("Ընտրեք ի՞նչ եք ցանկանում", "What you need?")
        let confirm = this.alertCtrl.create({
          enableBackdropDismiss:false,
          title: 'MobiWash',
          message: a.question,
          buttons: [
            {
              text: a.delete,
              handler: () => {
                this.mobiWash.removeUser();
                this.navCtrl.setRoot(HomePage);
              }
            },
            {
              text: a.exit,
              handler: () => {
                this.navCtrl.setRoot(HomePage);
              }
            },
            {
                text: a.cancel,
                handler: () => {}
              }
          ]
        });
        confirm.present();
    }
}