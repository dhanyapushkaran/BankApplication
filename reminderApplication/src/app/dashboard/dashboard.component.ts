import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  uid: any
  eventForm = this.fb.group({
    date: [''],
    event: ['']
  })

  userName: any
  date: any = new Date()
  dateOnly: any
  todayEvents:any

  constructor(private db: DataService, private fb: FormBuilder) {
    this.userName = localStorage.getItem("userName")
    //this.dateOnly = this.date.toLocaleDateString()
    this.dateOnly = new Date().toISOString().slice(0, 10);
   
    this.db.remind(this.dateOnly)
      .subscribe((result: any) => {
        console.log(result);
        this.todayEvents=result.TodayEvents
        console.log(result.TodayEvents);

      }, (result) => {
        alert(result.error.message)
      })
   
  }

  ngOnInit(): void {
  }

  delete() {
    this.uid = localStorage.getItem("currentAcc")
  }
  saveEvent() {
    if (this.eventForm.valid) {
      var date = this.eventForm.value.date
      var event = this.eventForm.value.event
      let uId = localStorage.getItem("currentAcc")
      // console.log(uId);

      this.db.saveEvent(date, event)
        .subscribe((result: any) => {
          alert(result.message)
          console.log(result.events);

        }, (result) => {
          alert(result.error.message)
        })
    }
  }
}
