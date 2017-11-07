import { AutoCompleteService } from 'ionic2-auto-complete';
import { Http } from '@angular/http';
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map'


@Injectable()
export class CompleteTestService {
  labelAttribute = "name";

  constructor(private http:Http) {

  }
  getResults() {
    return this.http.get("assets/data.json")
      .map(result =>result.json())  
  }
}