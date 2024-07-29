import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Map, MapStyle, Marker } from '@maptiler/sdk';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit{
  
  @Input() 
  lngLat?: [number, number];

  @ViewChild('mapa')
  mapContainer?: ElementRef<HTMLElement>;

  


  ngAfterViewInit(): void {

    
    if(!this.mapContainer?.nativeElement) throw 'Map can´t be null';

    if(!this.lngLat) throw 'LngLat can´t be null';

    const map = new Map({
      container: this.mapContainer?.nativeElement,
      style: MapStyle.SATELLITE,
      center: this.lngLat,
      zoom: 9,
      interactive: false
    });

    new Marker()
    .setLngLat(this.lngLat)
    .addTo(map)



  }

}
