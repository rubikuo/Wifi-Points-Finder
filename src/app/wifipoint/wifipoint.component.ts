import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-wifipoint',
  templateUrl: './wifipoint.component.html',
  styleUrls: ['./wifipoint.component.css']
})
export class WifipointComponent implements OnInit {
hotspots: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

}
