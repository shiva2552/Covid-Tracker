import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PersonService } from '../person.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {
  form;
  @Input() location_input;
  @Output() submit = new EventEmitter();
  //check = true;

  constructor(private ps:PersonService,private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.compose(
        [
          Validators.required,
          Validators.minLength(3)
        ]
      )),
      phone: new FormControl('',Validators.compose(
        [
          Validators.required,
          Validators.pattern(/^-?(0|[1-9]\d*)?$/),
          Validators.maxLength(11)
        ]
    )),
      place: new FormControl('', Validators.required),
      longitude: new FormControl('', Validators.required),
      latitude: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      comment: new FormControl(''),
    })
  }
  /*checkedBox(event){
    if ( event.checked ) {
      this.check = true;
    }
  }*/
  onSubmit(newPerson){
    //console.log("*********")
    //console.log(this.location_input)
    //newPerson.time = (new Date()).getTime();
    /*if(this.check){
      // change to lacation
    }*/
    //console.log(newPerson);
    this.submit.emit();
    this.ps.add(newPerson, (new Date()).getTime());
    //this.submit.emit(newPerson);
    // are you sure you want to delete this person?
    this.router.navigate(['/'])
  }

}

