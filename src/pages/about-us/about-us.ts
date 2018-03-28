import {Component} from '@angular/core';
import {NavParams} from "ionic-angular";

@Component({
  selector: 'about-us-page',
  templateUrl: 'about-us.html'
})

export class AboutUs {
  pageName: string;

  constructor(private navParams: NavParams) {
    this.pageName = this.navParams.get('pageName');
  }
}
