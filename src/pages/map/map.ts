import {Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, NgZone, Input} from '@angular/core';
import {
  GoogleMaps,
} from '@ionic-native/google-maps';
import {ViewController, NavController} from "ionic-angular";
import {NativeGeocoder, NativeGeocoderReverseResult} from "@ionic-native/native-geocoder";
import {Geolocation} from '@ionic-native/geolocation';
import {Keyboard} from "@ionic-native/keyboard";
import {TranslateService} from '../../translate/translate.service';

declare var google;

@Component({
  selector: 'map',
  templateUrl: 'map.html',
  styles:
    [`
      #map {
        height: 250px;
        width: 100%;
      }

      .controls {
        background-color: #fff;
        border-radius: 2px;
        border: 1px solid transparent;
        box-shadow: 0 2px 32px #adbd84;
        color: #adbd84;
        box-sizing: border-box;
        font-size: 15px;
        font-weight: 300;
        height: 29px;
        margin-left: 1px;
        margin-top: 10px;
        outline: none;
        padding: 0 11px 0 13px;
        text-overflow: ellipsis;
        width: 99%;
        z-index: 999999999
      }
    `],
  providers: [Geolocation, GoogleMaps]
})
export class MapGoogle implements OnInit {

  constructor(private viewCtrl: ViewController,
              private googleMaps: GoogleMaps,
              public geolocation: Geolocation,
              private nativeGeocoder: NativeGeocoder,
              private nav: NavController,
              private ngZone: NgZone,
              private keyBoard: Keyboard,
              private serv: TranslateService) {

  }

  newAddress: any = {
    address: "",
    long: 0,
    lat: 0
  };
  map: any;
  marker: any;
  placeholderText: string;
  @ViewChild('map') mapElement: ElementRef;
  @Output() close = new EventEmitter<any>()
  @Input() address: any;
  @Input() isNew: boolean;
  @ViewChild("infowindowContent") infowindowContent: ElementRef;


  ngOnInit() {
    this.loadMap();
    this.placeholderText = this.serv.translateImportant("Փնտրել․․․", "Search...");
    if (this.isNew == false) {
      this.ngZone.run(() => {
        if (this.address) {
          this.newAddress = this.address;
          this.setNewMarker(this.address.lat, this.address.long);
          this.emitForAddressChange()
        } else {
          this.setNewMarker(40.177200, 44.503490);
          this.emitForAddressChange()
        }

      })

    } else {
      this.setNewMarker(40.177200, 44.503490);
      this.getCurrentPosition();
      this.emitForAddressChange()
    }


    //keyboard close
    this.keyboardEnterButton();
  }

  getCurrentPosition() {
    this.geolocation.getCurrentPosition().then((position) => {
      this.newAddress.long = position.coords.longitude;
      this.newAddress.lat = position.coords.latitude;
      this.nativeGeocoder.reverseGeocode(position.coords.latitude, position.coords.longitude)
        .then((result: NativeGeocoderReverseResult) => {
          let locality = result.locality || '';
          let subLocality = result.subLocality || '';
          let thoroughfare = result.thoroughfare || '';

          this.ngZone.run(() => {
            this.newAddress.address = locality + ' ' + subLocality + ' ' + thoroughfare;
            this.setNewMarker(position.coords.latitude, position.coords.longitude);
            this.emitForAddressChange()
          })

        })
        .catch((error: any) => console.log(error));
      this.emitForAddressChange()

    }).catch((err) => {
      console.log(err)
    })
  }

  keyboardEnterButton() {
    var elems = document.getElementsByTagName('ion-input');
    for (let i = 0; i < elems.length; i++) {
      elems[i].addEventListener('keypress', (event: any) => {
        if (event.key == "Enter") {
          this.keyBoard.close()
        }
      })
    }

  }

  ngOnChanges() {
    if (this.address) {
      this.ngZone.run(() => {
        this.newAddress = this.address;
        if (this.address.lat != 0 && this.address.long != 0) {

          this.setNewMarker(this.address.lat, this.address.long);
          this.emitForAddressChange()
        }

      })

    }

  }

  loadMap() {

    let latLng = new google.maps.LatLng(40.177200, 44.503490);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      streetViewControl: false,
      zoomControl: false,
      scaleControl: false,
      mapTypeControl: false,

      fullscreenControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    //set the search area
    this.getSearch(this)
    var centerControlDiv = document.createElement('div');
    /////////////////////////
    var centerControl = new this.CenterControl(centerControlDiv, this);

    this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(centerControlDiv);

    ////////////////////////////
    this.getLatLng();
    this.marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP
    });

  }

  getLatLng() {
    this.map.addListener('click', (event) => {
      let latitude = event.latLng.lat();
      let longitude = event.latLng.lng();
      this.getMyPosition(latitude, longitude);

    });

  }


  getMyPosition(lat, long) {
    this.marker.setPosition({
      lat: lat,
      lng: long
    });
    this.mapAnimate(lat, long);
    this.nativeGeocoder.reverseGeocode(lat, long)
      .then((result: NativeGeocoderReverseResult) => {
        let locality = result.locality || '';
        let subLocality = result.subLocality || '';
        let thoroughfare = result.thoroughfare;
        this.ngZone.run(() => {

          this.newAddress.address = locality + ' ' + subLocality + ' ' + thoroughfare;
          this.newAddress.lat = lat;
          this.newAddress.long = long;
          this.emitForAddressChange()
        })

      })
      .catch((error: any) => console.log(error));

  }

  /////////////////////////////
  private setNewMarker(lat, long) {
    if (!this.marker) return;
    this.marker.setPosition({
      lat: lat,
      lng: long
    });
    this.mapAnimate(lat, long)
  }

  private mapAnimate(lat, long) {
    window.setTimeout(() => {
      this.map.panTo(new google.maps.LatLng(lat, long));
    }, 100);
  }

  ////////////////////

  CenterControl(centerControlDiv, thisComponent: any) {
    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.backgroundImage = "url('assets/imgs/location.png')";
    controlUI.style.backgroundSize = "cover";
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.marginBottom = '0px';
    controlUI.style.width = "28px";
    controlUI.style.height = "28px"
    controlUI.style.marginRight = '10px';
    centerControlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlUI.appendChild(controlText);

    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener('click', () => {
      thisComponent.getCurrentPosition();
    });

  }

  //////////////////////////
  emitForAddressChange() {
    this.close.emit(this.newAddress);
  }

  changeInput() {
    this.close.emit(this.newAddress);
  }

  /////////
  //FOR  SEARCH PLACES
  getSearch(_this) {
    var input = document.getElementById('pac-input');

    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', this.map);

    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var infowindow = new google.maps.InfoWindow();

    autocomplete.addListener('place_changed', function () {
      infowindow.close();
      var place = autocomplete.getPlace();
      if (!place.geometry) {
        return;
      }

      if (place.geometry.viewport) {
        _this.map.fitBounds(place.geometry.viewport);
      } else {
        this.map.setCenter(place.geometry.location);
        this.map.setZoom(17);
      }

      // Set the position of the marker using the place ID and location.

      _this.setNewMarker(place.geometry.location.lat(), place.geometry.location.lng())
      _this.marker.setVisible(true);

      _this.newAddress.address = place.name + ' ' + place.formatted_address;
      _this.newAddress.long = place.geometry.location.lng();
      _this.newAddress.lat = place.geometry.location.lat();
      //infowindowContent.children['place-id'].textContent = place.place_id;
      infowindow.open(this.map, this.marker);
    });
  }

}
