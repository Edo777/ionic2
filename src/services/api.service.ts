import { Injectable } from "@angular/core";
import { Http,Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
@Injectable()
export class ApiService{
    private costumer_id:any
    constructor(private http:Http){
        this.http.get("",{})
    }

    setId(id){
        this.costumer_id = id;
    }
    getId():string{
        return this.costumer_id
    }
    registration(name,phone,email,referal_code,device_token):Observable<any>{
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('name', name);
        urlSearchParams.append('phone', phone);
        urlSearchParams.append('email', email);
        urlSearchParams.append('referal_code', referal_code);
        urlSearchParams.append('device_token', device_token);
        let body = urlSearchParams.toString()
        var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post("http://mobiwash.am/login/registration",body,{headers:headers}).map(res=>res.json())
    }
    getAllcars():Observable<any>{
        return this.http.get("http://mobiwash.am/webservice/get_cardetails").map(res=>res.json())
    }
    sendOrder(order){
         return this.http.post("http://mobiwash.am/webservice/add_orders",order).map(res=>res.json())
    }
    getOrders(status){
        return this.http.post("http://mobiwash.am/webservice/get_orders",{customer_id:this.costumer_id,order_status:status}).map(res=>res.json())
    }
}