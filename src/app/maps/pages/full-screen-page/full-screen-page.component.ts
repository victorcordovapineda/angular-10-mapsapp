import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Map, MapStyle } from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';


@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css',
  host: {'some-binding': 'some-value'},
})
export class FullScreenPageComponent implements AfterViewInit, OnDestroy{

  map: Map | undefined;

  @ViewChild('map') divMap?: ElementRef<HTMLElement>;


  ngAfterViewInit(): void {

    if(!this.divMap) return;

    const initialState = { lng: -70.64827, lat: -33.45694, zoom: 14 };

    this.map = new Map({
      container: this.divMap?.nativeElement,
      style: MapStyle.TOPO,
      center: [initialState.lng, initialState.lat],
      zoom: 9
    });
  }


  ngOnDestroy(): void {
    this.map?.remove();
  }
}
