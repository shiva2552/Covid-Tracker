import { Injectable ,OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  people;

  constructor(private http:HttpClient) { }

  get(){
    this.http.get<Object>('https://218.selfip.net/apps/3Pn4VjT6Gn/collections/AsgCollection/documents/').subscribe(
      (data)=>{
        //console.log(data);
        this.people = data;
        //console.log(this.people);
      }
    )
    return this.people;
  }

  add(newPerson,time){
    this.http.post('https://218.selfip.net/apps/3Pn4VjT6Gn/collections/AsgCollection/documents/', {
      "key": time,
      "data": newPerson
    }).subscribe((data=>{
      //console.log(data);
    }))
    //console.log("Added")
    
  }
  delete(deletePerson){
    //console.log(deletePerson.key)
    var path = 'https://218.selfip.net/apps/3Pn4VjT6Gn/collections/AsgCollection/documents/'+ deletePerson.key + '/'
    //console.log(path)
    
    this.http.delete<Object>(path).subscribe(
      (data)=>{
        //console.log(data);
  
        //console.log("delete 200 ok")
      }
    )
  }

  getPerson(keyVal){
    var path = 'https://218.selfip.net/apps/3Pn4VjT6Gn/collections/AsgCollection/documents/'+ keyVal + '/'
    this.http.get<Object>(path).subscribe(
      (data)=>{
        //console.log(data);
        this.people = data;
        console.log(this.people);
        
      }
    )
    return this.people
    
  }

}
