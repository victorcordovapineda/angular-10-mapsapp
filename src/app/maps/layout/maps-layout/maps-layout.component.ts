import { Component, OnInit } from '@angular/core';
import { config } from '@maptiler/sdk';
import { environment } from '../../../../environments/environment';

@Component({
  templateUrl: './maps-layout.component.html',
  styleUrl: './maps-layout.component.css'
})
export class MapsLayoutComponent implements OnInit{
  ngOnInit(): void {
    config.apiKey = environment.mapbox_key;
  }

}
