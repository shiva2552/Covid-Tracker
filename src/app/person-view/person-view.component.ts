import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonService } from '../person.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-person-view',
  templateUrl: './person-view.component.html',
  styleUrls: ['./person-view.component.css']
})
export class PersonViewComponent implements OnInit {
  person;
  @Output() view = new EventEmitter();
  constructor(private ar: ActivatedRoute, private ps: PersonService, private http:HttpClient) { }

  ngOnInit(): void {
    //this.person = this.ar.snapshot.paramMap.get('key');
    //this.person = this.ps.getPerson(this.ar.snapshot.paramMap.get('key'));
    //console.log(this.person)
    
    var path = 'https://218.selfip.net/apps/3Pn4VjT6Gn/collections/AsgCollection/documents/'+ this.ar.snapshot.paramMap.get('key') + '/'

    this.http.get<Object>(path).subscribe(
      (data)=>{
        //console.log(data);
        this.person = data;
        //console.log(this.person);
        this.view.emit(this.person.data)
        
      }

    )
    
  }

}
