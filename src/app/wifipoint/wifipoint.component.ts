import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { NgForm } from '@angular/forms';
import * as mapboxgl from 'mapbox-gl';
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-wifipoint',
  templateUrl: './wifipoint.component.html',
  styleUrls: ['./wifipoint.component.css']
})
export class WifipointComponent implements OnInit {
   searchterm = ''; // to catch the input value
   apiData: any [];
   map: any;
   marker: any;
  constructor(private apidata: DataService) { }

  ngOnInit() {
   
    mapboxgl.accessToken = 'pk.eyJ1IjoiaGlyc2NoYmF1bSIsImEiOiJjanRlNng2b3EwazMyNDVxaThnb2MxOGtoIn0.2ZK2MPVV9Zoq_-EBVrafLg'
    this.getLocation();
  }

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
      this.apiData.forEach(function(marker){
        var el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = 'url(https://image.flaticon.com/icons/svg/149/149060.svg)';
        
        // add marker to map
        new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo('map');
      });
      
    }
    });
  }

    getMarkersToTheMap() {
      //function here and this.blabla = data.records (from the API)
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

    /*geojson.features.forEach(marker) {
      // create a DOM element for the marker
      var el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundImage = 'url(https://placekitten.com/g/' + marker.properties.iconSize.join('/') + '/)';
      el.style.width = marker.properties.iconSize[0] + 'px';
      el.style.height = marker.properties.iconSize[1] + 'px';
       
      el.addEventListener('click', function() {
      window.alert(marker.properties.message);
      });
       
      // add marker to map
      new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .addTo('map');*/

}
