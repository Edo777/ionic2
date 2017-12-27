import { Injectable } from "@angular/core";
import { Http,Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
@Injectable()
export class ApiService{
    private customer_id:any
    private phone_number:any; 
    constructor(private http:Http){
        this.http.get("",{})
    }

    setId(id){
        this.customer_id = id;
    }
    getId():string{
        return this.customer_id
    }
    setPhoneNumber(phone_number){
        this.phone_number = phone_number;
    }
    getPhoneNumber(){
        return this.phone_number;
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
    updateOrder(order, status){
        return this.http.post("http://mobiwash.am/webservice/update_order_status",{"order_id" : order.id, "order_status":status}).map(res=>res.json());
    }
    getOrders(status){
        return this.http.post("http://mobiwash.am/webservice/get_orders",{customer_id:this.customer_id,order_status:status}).map(res=>res.json())
    }
    getCustomerDetails(id?){
        return this.http.post("http://www.mobiwash.am/webservice/get_customer_details", {customer_id: this.customer_id}).map(res=>res.json())
    }
    updateCustomerName(n, mail){
        return this.http.post("http://mobiwash.am/webservice/edit_user_details",{customer_id: this.customer_id, "name":`${n}`, email:mail}).map(res=>res.json())
    }
}