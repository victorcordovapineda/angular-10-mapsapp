import { Component, ElementRef, ViewChild } from '@angular/core';
import { Map, MapStyle } from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import * as maptilersdk from '@maptiler/sdk';


@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css',
  host: {'some-binding': 'some-value2'},
})
export class ZoomRangePageComponent {


  @ViewChild('map') divMap?: ElementRef<HTMLElement>;

  public zoom: number = 10;
  public map?: Map;


  ngAfterViewInit(): void {


    if(!this.divMap) return;

    const initialState = { lng: -70.64827, lat: -33.45694, zoom: 14 };

      this.map = new Map({
      container: this.divMap?.nativeElement,
      style: MapStyle.TOPO,
      center: [initialState.lng, initialState.lat],
      zoom: this.zoom
    });

    this.mapListeners();

  }

  mapListeners(){

    if(!this.map) throw 'Mapa no inicializado';

    this.map.on('zoom', (ev)=>{

      this.zoom = this.map!.getZoom().valueOf();

    });

  }

  zoomIn(){
    this.map?.zoomIn();
  }
  zoomOut(){
    this.map?.zoomOut();
  }

}
