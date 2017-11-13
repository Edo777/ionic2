import { Http } from '@angular/http';
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map'


@Injectable()
export class CarsService {

  constructor(private http:Http) {}
 
  getResults() {
    return this.http.get("assets/data.json")
      .map(result => result.json())  
  }
}