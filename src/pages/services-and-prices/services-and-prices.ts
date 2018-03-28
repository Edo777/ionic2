import {Component} from "@angular/core";
import {NavParams} from "ionic-angular";

@Component({
  selector: 'services-and-prices',
  templateUrl: 'services-and-prices.html'
})

export class ServicesAndPrices {
  pageName: string;
  washInfo = [
    ['wash_type_1', 1999, 2999, 3999],
    ['wash_type_2', 1499, 1999, 2999],
    ['wash_type_3', 999, 1499, 1999],
    ['nano_cleaning', 1499, 1499, 1499]
  ]
  priceInfo = [
    ['wash_type_1', 1999 + 1499 - 499, 2999 + 1499 - 499, 3999 + 1499 - 499],
    ['wash_type_2', 1499 + 1499 - 499, 1999 + 1499 - 499, 2999 + 1499 - 499],
    ['wash_type_3', 999 + 1499 - 499, 1499 + 1499 - 499, 1999 + 1499 - 499],
  ]
  carUrls = [];

  constructor(private navParams: NavParams) {
  }

  ngOnInit() {
    this.pageName = this.navParams.get('pageName');
    this.carUrls = [
      [
        'assets/imgs/1.jpg',
        'assets/imgs/2.jpg',
        'assets/imgs/3.jpg'
      ],
      [
        'assets/imgs/11.jpg',
        'assets/imgs/22.jpg',
        'assets/imgs/33.jpg'
      ]
    ]
  }

  small(url) {
    return ('assets/imgs/1.jpg' == url) || (url == 'assets/imgs/11.jpg');
  }

  middle(url) {
    return ('assets/imgs/2.jpg' == url) || (url == 'assets/imgs/22.jpg');
  }

  big(url) {
    return ('assets/imgs/3.jpg' == url) || (url == 'assets/imgs/33.jpg');
  }
}
