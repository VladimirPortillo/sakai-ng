import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataMaps } from '../../interfaces/maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
    
  @Input() coordenadas!: DataMaps;

  display: any;
  center: google.maps.LatLngLiteral = {
      lat: -17.91748,
      lng: -64.52712
  };
  zoom = 14;
  mapMarker: boolean = false;
  marker!: { position: google.maps.LatLngLiteral };

  ngOnInit() {
    console.log('Coordenada desde mapa', this.coordenadas);
    if(this.coordenadas.latitud !== null && this.coordenadas.longitud !== null) {
      this.marker = {position: { lat: this.coordenadas.latitud, lng: this.coordenadas.longitud }};
      this.mapMarker = true
    }
  }
  
  //editmapMarker: boolean = true;

  //marker!: { position: google.maps.LatLngLiteral } = {position: { coordenadas.latitud, coordenadas.longitud }};

  //coordenadas!: DataMaps;

  @Output() onReturnData: EventEmitter<DataMaps> = new EventEmitter();

  // Método para agregar un marcador en el mapa y obtener la latitud y longitud
  addMarker(event: google.maps.MapMouseEvent) {
    this.mapMarker = true
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      this.coordenadas = {
        longitud: lng,
        latitud: lat
      };

      //console.log('coordenadas en mapa:', this.coordenadas);
      

      this.marker = {position: { lat, lng }} // este solo muestra uno y si marca otro lo reemplaza con el actual

      this.onReturnData.emit(this.coordenadas);
    }
  }
}
