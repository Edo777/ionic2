import { Injectable } from "@angular/core";
import { Http,Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
@Injectable()
export class ApiService{
    constructor(private http:Http){
        this.http.get("",{})
    }

    registration(name,phone,email,referal_code,device_token):Observable<any>{
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('name', name);
        urlSearchParams.append('phone', phone);
        urlSearchParams.append('email', email);
    //    urlSearchParams.append('referal_code', referal_code);
        urlSearchParams.append('device_token', device_token);
        let body = urlSearchParams.toString()
        var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post("http://mobiwash.am/login/registration",body,{headers:headers}).map(res=>res.json())
    }
    getAllcars():Observable<any>{
        return this.http.get("http://mobiwash.am/webservice/get_cardetails").map(res=>res.json())
    }
}