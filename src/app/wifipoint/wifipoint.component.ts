import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { NgForm } from '@angular/forms';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-wifipoint',
  templateUrl: './wifipoint.component.html',
  styleUrls: ['./wifipoint.component.css']
})
export class WifipointComponent implements OnInit {
   searchterm = ''; // to catch the input value
   apiData: any [];
   map: any;
  constructor(private apidata: DataService) { }

  ngOnInit() {
    this.getAllWifidata(); // to show all the wifi hotspot in the map
    mapboxgl.accessToken = 'pk.eyJ1IjoiaGlyc2NoYmF1bSIsImEiOiJjanRlNng2b3EwazMyNDVxaThnb2MxOGtoIn0.2ZK2MPVV9Zoq_-EBVrafLg'
    this.getLocation();

  }

 // to catch all the wifi hotspot coordinates and show on the map
 getAllWifidata() {
  this.apidata.getAllWifiApiData()
  .subscribe((wifidata: any) => {
    console.log(wifidata);
    this.apiData = wifidata.records;
    console.log(wifidata.records[0].geometry.coordinates);
    this.showMap(wifidata.records[0].geometry.coordinates[1], wifidata.records[0].geometry.coordinates[0]);
  });

 }

 // to search with street name and return wifi hotspots in the map
  getDataFromService() {
    this.apidata.getWifiApiData(this.searchterm) // to pass the input value as parameter here
    .subscribe((data: any) => {
      console.log(data);
      if (data.records.length === 0) {
        alert('Nothing found');
      } else {
      this.apiData = data.records;
      console.log(data.records[0].geometry.coordinates);
      this.showMap(data.records[0].geometry.coordinates[1], data.records[0].geometry.coordinates[0]);
      }
    });
  }
    getWifisToTheMap() {

    }

    getLocation() {
      navigator.geolocation.getCurrentPosition(pos => {
        // function
        this.showMap(pos.coords.latitude, pos.coords.longitude);
      });
    }

    showMap(latitude, longitude) {
      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [longitude, latitude],
        zoom: 13
        });
    }

}
