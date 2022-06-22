import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class ClientService {

    constructor(private http : HttpClient) { }  

    listAll(data:any) {
        return this.http.post<any>("https://agency-coda.uc.r.appspot.com/client/list", data);
        }    
}