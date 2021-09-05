import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group({
    uId: ['',[Validators.required, Validators.pattern('[0-9]*')]],
    name: ['',[Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })

  constructor(private db: DataService, private fb: FormBuilder, private router:Router) { }

  ngOnInit(): void {
  }
  register() {
    if(this.registerForm.valid){
    let uId = this.registerForm.value.uId
    let name = this.registerForm.value.name
    let pswd = this.registerForm.value.pswd

    this.db.register(uId, name, pswd)
      .subscribe((result: any) => {
        if(result){
          alert(result.message)
          this.router.navigateByUrl('')
        }
       
      }, (result) => {
        alert(result.error.message)
      })
    }
  }
}
