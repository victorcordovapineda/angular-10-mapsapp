import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, MapStyle, Marker } from '@maptiler/sdk';


interface MarkerAndColor{
  marker: Marker,
  color: string
}

interface PlainMarker{
  color: string,
  lngLat: number[]
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css',
  host: { 'some-binding': 'some-value3' },
})
export class MarkersPageComponent {


  @ViewChild('map') divMap?: ElementRef<HTMLElement>;

  public zoom: number = 1;
  public map?: Map;
  public currentLngLat = new LngLat(12.550343, 55.665957);
  public markers: MarkerAndColor[] = [];


  ngAfterViewInit(): void {


    if (!this.divMap) return;

    const initialState = { lng: -70.64827, lat: -33.45694, zoom: 14 };

    this.map = new Map({
      container: this.divMap?.nativeElement,
      style: MapStyle.SATELLITE,
      center: this.currentLngLat,
      zoom: this.zoom,

    });

    this.readFromLocalStotage();



    // const markPersonal = document.createElement('div');
    // markPersonal.innerHTML = ('Victor Cordova');

    // const marker = new Marker({
    //   color: 'red',
    //   element: markPersonal
    // })
    //   .setLngLat([12.550343, 55.665957])
    //   .addTo(this.map);

  }

  createMarker() {
    if (!this.map) return;
    const color = '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
    const lngLat = this.map.getCenter();
    this.addMarker(lngLat, color);
  }

  addMarker(lngLat: LngLat, color: string) {
    if (!this.map) return;

    const marker = new Marker({
      color: color,
      draggable: true,
    }).setLngLat(lngLat).addTo(this.map);

    //inserta el marcador al arreglo
    this.markers.push({marker, color});
    this.saveToLocalStorage();

    marker.on('dragend', ()=> {
      this.saveToLocalStorage();
    })
  }

  deleteMarker(index: number) {
   this.markers[index].marker.remove();
   this.markers.splice(index, 1);
  }

  flyTo(marker: Marker){
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    });
  }

  saveToLocalStorage(){
    const plainMarkers: PlainMarker[] = this.markers.map( ({ color, marker })=>{
      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    })
    console.log(plainMarkers);
    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));
  }

  readFromLocalStotage(){

    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString); //! Ojo¡

    plainMarkers.forEach( ({ lngLat, color }) => {

      const [lng, lat] = lngLat;
      const coords = new LngLat(lng, lat);
      this.addMarker(coords, color);

    })

  }




    
}