import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  events: any
  userName: any
  date = ""
  event = ""
  i: any
  option: boolean = true
  constructor(private db: DataService) {

    this.userName = localStorage.getItem("userName")
    let uId = localStorage.getItem("currentAcc")
    this.db.viewEvents(uId)
      .subscribe((result: any) => {
        this.events = result.events
        console.log(this.events);

      }, result => {
        alert(result.error.message)
      })
  }

  ngOnInit(): void {
  }

  deleteEvent(i: any) {
    this.db.deleteEvent(i)
      .subscribe((result: any) => {
        alert(result.message)
        console.log(result.events);
        window.location.reload()

      }, result => {
        alert(result.error.message)
      })
  }

  edit(i: any) {
    this.i = i

  }
  editEvent(i: any) {
    console.log(i);
    console.log(this.date);
    this.db.editEvent(i, this.date, this.event)
      .subscribe((result: any) => {
        alert(result.message)
        window.location.reload()
        console.log(result.events);

      }, result => {
        alert(result.error.message)
      })
  }

  sortEvent() {
    console.log(this.option);

    if (this.option) {

      let newEvents = this.events.sort((a: any, b: any) => a.event < b.event ? 1 : -1)
      console.log(newEvents);
      this.events = newEvents
    }
    else {
          
      let newEvents= this.events.sort((a: any, b: any) => a.event > b.event ? 1 : -1)
      console.log(newEvents);
      this.events = newEvents
    }
    this.option = !this.option
  }

  sortDate() {
    if (this.option) {
      let newEvents = this.events.sort((a: any, b: any) => a.date < b.date ? 1 : -1)
      console.log(newEvents);
      this.events = newEvents
    }
    else {
          
      let newEvents= this.events.sort((a: any, b: any) => a.date > b.date ? 1 : -1)
      console.log(newEvents);
      this.events = newEvents
    }
    this.option = !this.option
  
  }
}

