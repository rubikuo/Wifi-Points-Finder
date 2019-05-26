import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-wifipoint',
  templateUrl: './wifipoint.component.html',
  styleUrls: ['./wifipoint.component.css']
})
export class WifipointComponent implements OnInit {
   searchterm = ''; // to catch the input value
   apiData: any [];

  constructor(private apidata: DataService) { }

  ngOnInit() {
  }

  getDataFromService() {
    this.apidata.getWifiApiData(this.searchterm) // to pass the input value as parameter here
    .subscribe((data: any) => {
      console.log(data);
      if (data.records.length === 0) {
        alert('Nothing found');
      } else {
      this.apiData = data.records;
      }
    });
  }



}
