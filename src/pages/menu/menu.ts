import { Component, ViewChild } from "@angular/core";
import { NavController, Nav, NavParams, AlertController } from 'ionic-angular';
import { UserAccount, HomePage, HistoryPage, AboutUs, Addresses, OrdersPage, OrdersHistory } from '../barrel'
import { MobiWash } from "../../services/barrel.service";

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
    activeLng:string = 'Հայերեն';
    activeFlag:string = '/assets/imgs/drosh.jpg'
    id:number;
    pages:Pages[] = [
        { pageName:'Պատվերի գրանցում', component: OrdersPage},
        { pageName:'Իմ մեքենաները', component: HistoryPage},
        { pageName:'Իմ հասցեները', component: Addresses},
        { pageName:'Իմ պատվերները', component: OrdersHistory},
        { pageName:'Մեր մասին', component: AboutUs},          
    ]
    constructor(
        private navCtrl:NavController, 
        public params:NavParams, 
        private mobiWash:MobiWash,
        private alertCtrl:AlertController
    ){
        
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
        if(this.activeLng == 'Հայերեն'){
            this.activeLng = 'English'
            this.activeFlag = '/assets/imgs/english.png'
        }else{
            this.activeLng = 'Հայերեն';
            this.activeFlag = '/assets/imgs/drosh.jpg';
        }
    }
    outUser() {
        let confirm = this.alertCtrl.create({
          enableBackdropDismiss:false,
          title: 'MobiWash',
          message: 'Ընտրեք ի՞նչ եք ցանկանում ',
          buttons: [
            {
              text: 'Ջնջել',
              handler: () => {
                this.mobiWash.removeUser();
                this.navCtrl.setRoot(HomePage);
              }
            },
            {
              text: 'Դուրս գալ',
              handler: () => {
                this.navCtrl.setRoot(HomePage);
              }
            },
            {
                text: 'Մնալ',
                handler: () => {}
              }
          ]
        });
        confirm.present();
    }
}