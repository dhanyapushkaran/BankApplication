import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm= this.fb.group({
    uId:[''],
    pswd:['']
  })

  constructor(private fb:FormBuilder, private ds:DataService, private router: Router) { }

  ngOnInit(): void {
  }
 login(){
   let uId= this.loginForm.value.uId
   let pswd=this.loginForm.value.pswd
   
   this.ds.login(uId,pswd).subscribe((result:any)=>{
     if(result){
       console.log(result);
       alert(result.message)
      localStorage.setItem("currentAcc", result.currentAcc)
      localStorage.setItem("userName", result.userName)
       this.router.navigateByUrl('dashboard')
     }
   },result=>{
     alert(result.error.message)
  })
   
 }

}
