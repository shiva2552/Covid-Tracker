///<reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PersonService } from './person.service';
import { HttpClient } from '@angular/common/http';
//import * as L from 'leaflet';


@Component({
  selector: 'app-root-person',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Covid Tracker';
  people;
  location;
  start ="";
  end="";
  @ViewChild('gmap') gmapElement;
  map: google.maps.Map;


  constructor(private ps:PersonService, private http:HttpClient){

  }


  ngOnInit(){
    //this.people = this.ps.get();
    this.http.get<Object>('https://218.selfip.net/apps/3Pn4VjT6Gn/collections/AsgCollection/documents/').subscribe(
      (data)=>{
        //console.log(data);
        this.people = data;
        //console.log(this.people);
        //console.log("ini")
        //console.log(this.people[0].data)
        //console.log("lon lon lon")
        this.countLocation(this.people)
        this.mapping();

      }
    )

  }

  countLocation(person){
    this.location = []
    for(let i in person){
      var flag = true;
      //console.log("i val",i)
      for (let j in this.location){
        //console.log("j val",j)
        //console.log(this.location)
        if(this.location[j].place == person[i].data.place){
          //console.log("adding count")
          this.location[j].count = this.location[j].count + 1
          flag = false
        }  
      }
      if(flag){
        var obj = {place:person[i].data.place, count:1, lat:person[i].data.latitude, lon:person[i].data.longitude}
        this.location.push(obj);
        //console.log("adding new location")
      }
      
    }
    //console.log("location")
    //console.log(this.location)
  }

  gettingCount(){

  }

  mapping(){
    this.ngAfterViewInit()
    //console.log("YYYYYYYAAAASSSSSS")
    for(let i in this.location){
      //console.log(this.people[i].data)
      //console.log(i)
      let latLng = {lat: Number(this.location[i].lat), lng: Number(this.location[i].lon)};
      const marker = new google.maps.Marker({
        position:latLng,
        
        //label: {fontWeight: 'bold', fontSize: '12px', text:'permanent text'}
        
        title: this.location[i].place + "\n" + this.location[i].count + " cases reported"

      });
      marker.setMap(this.map)
    }
  }

  onPersonView(person){
    this.ngAfterViewInit()
    //console.log("YYYYYYYAAAASSSSSS")
    
    //console.log(this.people[i].data)
    //console.log(i)
    let latLng = {lat: Number(person.latitude), lng: Number(person.longitude)};
    const marker = new google.maps.Marker({
      position:latLng,
        
      //label: {fontWeight: 'bold', fontSize: '12px', text:'permanent text'}
      title: person.place

      });
      marker.setMap(this.map)
    
  }
  
  onPersonDeleted(deletePerson){
    //this.people = this.ps.get();
    var path = 'https://218.selfip.net/apps/3Pn4VjT6Gn/collections/AsgCollection/documents/'+ deletePerson.key + '/'
    //console.log(path)
    
    this.http.delete<Object>(path).subscribe(
      (data)=>{
        this.ngOnInit();
        //console.log("delete 200 ok")
      }
    )
  
  }

  onPersonSubmit(){
    //this.people = this.ps.get();
    this.http.get<Object>('https://218.selfip.net/apps/3Pn4VjT6Gn/collections/AsgCollection/documents/').subscribe(
      (data)=>{
        //console.log(data);
        this.people = data;
        //console.log(this.people);
        //console.log("beh")
        this.countLocation(this.people)
        this.mapping();
      }
    )
    //console.log(this.people)
    //console.log("i dont know")
    document.getElementById('formP').style.visibility= "hidden";
  }

/* style for submit form*/
  FormShow($event){
    //console.log("SHOW SHOW SHOW")
    document.getElementById('formP').style.visibility= "visible";
    
  }

/* sort  column section */
  SortPlace($event){
    this.people.sort((a,b) => a.data.place.localeCompare(b.data.place));
  }
  SortTime($event){
    this.people.sort((a,b) => a.data.time.localeCompare(b.data.time));
    this.people.sort((a,b) => a.data.date.localeCompare(b.data.date));  
  }
  SortName($event){
    this.people.sort((a,b) => a.data.name.localeCompare(b.data.name));
  }

/* map initiate */
  ngAfterViewInit(){
    var mapProp = {
      center: new google.maps.LatLng(49.2,-123),
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom:10,

    };
   //console.log("map map map")
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    
     /* console.log(this.people)
      for(let lat in this.people.data.latitude){
        let latLng = {lat: Number(lat), lng: Number(this.people.data.longitude)};
        const marker = new google.maps.Marker({
          position:latLng,
          
          //label: {fontWeight: 'bold', fontSize: '12px', text:'permanent text'}
          title: this.people.data.place

        });
        marker.setMap(this.map)
      }
      */
    
      
  }
  

}



