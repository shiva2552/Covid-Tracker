import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  @Input() person_input;
  @Output() delete = new EventEmitter();
  @Output() view = new EventEmitter();

  constructor(private ps:PersonService) { }

  ngOnInit(): void {
  }

  onDelete(evt){
    //console.log("deleting person");
    //console.log(evt);
    //this.ps.delete(this.person_input)
    var msg:boolean = confirm("Are you sure, you want to delete this Report?!");
    if(msg == true){
      this.delete.emit(this.person_input);
    }  
  }
 
  //isSuper
}
