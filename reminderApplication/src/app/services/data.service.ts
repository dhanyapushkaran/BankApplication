import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const options = {
  withCredentials: true
}
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  deleteEvent(i:any){
    const data={i}
        console.log(data);
        
    return this.http.post('http://localhost:3000/deleteEvent', data, options)
  }

  remind(todayDate:any){
    const data={todayDate}
        console.log(data);
        
    return this.http.post('http://localhost:3000/remind', data, options)
  }

  delete(acno:any){
    console.log(acno);
    
    return this.http.delete('http://localhost:3000/deleteAcc/'+acno, options)
  }

  login(uId: any, pswd: any) {
    const data = {
      uId, pswd
    }
    return this.http.post('http://localhost:3000/login', data, options)
  }
  register(uId: any, name: any, password: any) {
    const data = {
      uId, name, password
    }
    return this.http.post('http://localhost:3000/register', data)
  }

  saveEvent(date: any, event: any) {
    const data = {
      date, event
    }

    console.log(date, event);

    return this.http.post('http://localhost:3000/saveEvent', data, options)
  }
  viewEvents(uId:any) {
 const data={uId}
    return this.http.post('http://localhost:3000/viewEvents',data, options)
  }

  editEvent(i:any,date:any,event:any){
    const data= {i,date,event}
    console.log(data);
    
    return this.http.post('http://localhost:3000/editEvent',data, options)
  }
  

}
