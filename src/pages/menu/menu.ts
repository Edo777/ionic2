import { Component, ViewChild } from "@angular/core";
import { NavController, Nav, NavParams } from 'ionic-angular';
import { UserAccount, HomePage, HistoryPage, AboutUs } from '../barrel'
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
    id:number;
    pages:Pages[] = [
        { pageName:'Պատվերի գրանցում', component: UserAccount},
        { pageName:'Իմ մեքենաները', component: HistoryPage},
        { pageName:'Մեր մասին', component: AboutUs},                
        { pageName:'Դուրս գալ', component: HomePage}
    ]
    constructor(private navCtrl:NavController, public params:NavParams, private mobiWash:MobiWash){
        
    }
    bgChange(page){
        return page.component == this.activePage;
    }
    openPage(page:Pages){
        if(page.component === HomePage){
            this.mobiWash.removeUser();
            this.navCtrl.setRoot(HomePage);
            
            return;
        }
        this.activePage = page.component;
        this.nav.setRoot(page.component, {pageName:page.pageName});
    }
}