import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  @Input() item: string | undefined
  constructor( private ds:DataService, private router:Router) { }

  ngOnInit(): void {
  }
  delete(){
    this.ds.delete(this.item).subscribe((result:any)=>{
      alert(result.message)
      this.router.navigateByUrl("")
    })
    
  }
  cancel() {

  }
}
