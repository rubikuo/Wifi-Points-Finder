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
  searchterm: ''; // to catch the input value
  apiData: any[];
  map: any;
  marker: any;
  point: any;
  address: any;
  constructor(private apidata: DataService) { }

  ngOnInit() {
    // this.getLocation();
    mapboxgl.accessToken = 'pk.eyJ1IjoiaGlyc2NoYmF1bSIsImEiOiJjanRlNng2b3EwazMyNDVxaThnb2MxOGtoIn0.2ZK2MPVV9Zoq_-EBVrafLg';
    navigator.geolocation.getCurrentPosition(pos => {
      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [pos.coords.longitude, pos.coords.latitude],
        zoom: 15
      });
      const userElement = document.createElement('i');
      userElement.className = 'marker user-location fas fa-walking fa-2x';
      // userElement.style.zIndex = '1';
      new mapboxgl.Marker(userElement)
        .setLngLat([pos.coords.longitude, pos.coords.latitude])
        .addTo(this.map);

      this.getAllWifidata(); // to show all the wifi hotspot in the map

    });

  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(pos => {
      // function
      this.showMap(pos.coords.latitude, pos.coords.longitude);
      console.log(pos.coords.latitude, pos.coords.longitude);
      const userElement = document.createElement('i');
      userElement.className = 'marker user-location fas fa-walking fa-2x';
      // userElement.style.zIndex = '1';
      new mapboxgl.Marker(userElement)
        .setLngLat([pos.coords.longitude, pos.coords.latitude])
        .addTo(this.map);

    });

  }

  // to fetch all wifi hotspot in api data
  getAllWifidata() {
    this.apidata.getAllWifiApiData()
      .subscribe((wifidata: any) => {
        // console.log(wifidata);
        this.apiData = wifidata.records;
        // console.log(wifidata.records[0].geometry.coordinates);
        this.showMap(wifidata.records[0].geometry.coordinates[1], wifidata.records[0].geometry.coordinates[0]);
        this.apiData.forEach((marker) => {
          // console.log(marker.fields.adress);
          this.address = marker.fields.adress;
          const location = [marker.geometry.coordinates, marker.geometry.coordinates];
          // console.log(location);
          location.forEach(point => {
            this.point = point;
            // console.log(this.point);
          });
          const el = document.createElement('i'); // create element for the fontawesome icon in html
          el.className = 'marker';
          el.className = 'fas fa-map-marker-alt fa-2x'; //  class name for the fontawesome icon
          // el.style.backgroundImage = 'url("https://image.flaticon.com/icons/svg/149/149060.svg")';
          el.style.color = '#0725d3e0';
          el.style.textShadow = '1px 1px 2px #ffff';

          // console.log(marker.fields.adress); // to get wifi hotspot address
          const popup = new mapboxgl.Popup({ offset: 25 })
            .setText(this.address);
          // still need to be fixed because it doesnt show address (which may need to be looped through)
          // add marker to map
          new mapboxgl.Marker(el)
            .setLngLat(this.point)
            .setPopup(popup) // to show the address info when mouse clicks on the marker
            .addTo(this.map);
        });
      });

  }

  // to search Wifi Hotspot
  searchWifiHotSpot() {
    this.apidata.searchWifiApiData(this.searchterm) // to pass the input value as parameter here
      .subscribe((data: any) => {
        // console.log(data);
        if (data.records.length === 0) {
          alert('Nothing found');
        } else {
          this.apiData = data.records;

          // console.log(data.records[0].geometry.coordinates);
          this.showMap(data.records[0].geometry.coordinates[1], data.records[0].geometry.coordinates[0]);

          // to loop through the coordinates in wifiapidata?
          this.apiData.forEach((marker) => {
            // console.log(marker.fields.adress);
            this.address = marker.fields.adress;
            const location = [marker.geometry.coordinates, marker.geometry.coordinates];
            // console.log(location);
            location.forEach(point => {
              this.point = point;
              // console.log(this.point);
            });
            const el = document.createElement('i'); // create element for the fontawesome icon in html
            el.className = 'marker';
            el.className = 'fas fa-map-marker-alt fa-2x'; //  class name for the fontawesome icon
            // el.style.backgroundImage = 'url("https://image.flaticon.com/icons/svg/149/149060.svg")';
            el.style.color = '#4d1adae0';
            el.style.textShadow = '1px 1px 2px #ffff';


            // console.log(marker.fields.adress); // to get wifi hotspot address

            const popup = new mapboxgl.Popup({ offset: 25 })
              .setText(this.address);
            // still need to be fixed because it doesnt show address (which may need to be looped through)


            // add marker to map
            new mapboxgl.Marker(el)
              .setLngLat(this.point)
              .setPopup(popup) // to show the address info when mouse clicks on the marker
              .addTo(this.map);
          });

        }
      });
  }

  // still need to be fixed ( want to show user's current places with marker and all the wifi hotspot markers when user lands the page)

  showMap(latitude: number, longitude: number) {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [longitude, latitude],
      zoom: 15
    });

  }
}
