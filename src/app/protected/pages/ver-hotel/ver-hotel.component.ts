import { Component } from '@angular/core';
import { DataMaps } from '../../interfaces/maps';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelesService } from '../../services/hoteles.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ComunidadesService } from '../../services/comunidades.service';
import { Comunidades } from '../../interfaces/comunidades';
import { Hoteles } from '../../interfaces/hoteles';
import { environment } from 'src/environments/environment';

const url = environment.urlApi;
const rutaPublic = environment.rutaPublic;

@Component({
  selector: 'app-ver-hotel',
  templateUrl: './ver-hotel.component.html',
  styleUrls: ['./ver-hotel.component.scss']
})
export class VerHotelComponent {
  datosCoordenada: string = '';

  urlPublic = url + rutaPublic;
  
   hotel!: Hoteles;
  id_hotel=0;
  comunidades: Comunidades[] = [];
  comunidad!: Comunidades;
  coordenadas!: DataMaps;
  loading:boolean = true;
  miFormulario: FormGroup = this.fb.group({
      nombre:             [''],
      descripcion:        [''],
      direccion:          [''],
      estrellas:          [''],
      telefono:           [''],
      garaje:             [''],
      alimentacion:       [''],
      aire_acondicionado: [''],
      comunidad:          [''],
      ubicacion:          [''],
      multimedia:         [''],
  });

  constructor(
      private comunidadesService: ComunidadesService,
      private fb: FormBuilder,
      private hotelesService: HotelesService,
      private route:ActivatedRoute,
      private router:Router
  ) {}

  ngOnInit() {
      this.getComunidades();
  }

  getComunidades() {
      this.comunidadesService.getComunidades().subscribe((comunidades) => {
          // console.log(roles);
          this.comunidades = comunidades;
          this.getHoteles();
      });
  }
  getHoteles(){
    this.route.paramMap.subscribe(params => {
      this.id_hotel = +params.get('id_hotel')!; // Convertir a número
      //console.log('ID Comunidad:', this.id_comunidad);
      this.hotelesService.verHotel(this.id_hotel).subscribe((resp) => {
        console.log('hotel', resp);
        this.hotel = resp.data;
        this.cargarDatos();
      }); 
    });
  }
  coordenadasMapa(coordenadas: DataMaps) {
    console.log('retorno datos mapa', coordenadas);
    this.miFormulario.patchValue({ubicacion : JSON.stringify(coordenadas)});
    this.datosCoordenada = 'Longitud: ' + coordenadas.longitud + ', Latitud: ' + coordenadas.latitud;
  }

  cargarDatos() {
    this.miFormulario.disable();
    this.coordenadas = {
      longitud: this.hotel.longitud,
      latitud: this.hotel.latitud
    }
      
          this.miFormulario.controls['nombre'].setValue(this.hotel.nombre);
          this.miFormulario.controls['descripcion'].setValue(this.hotel.descripcion);
          this.miFormulario.controls['direccion'].setValue(this.hotel.direccion);
          this.miFormulario.controls['estrellas'].setValue(this.hotel.estrellas);
          this.miFormulario.controls['telefono'].setValue(this.hotel.telefono);
          this.miFormulario.controls['garaje'].setValue(this.hotel.garaje);
          this.miFormulario.controls['alimentacion'].setValue(this.hotel.alimentacion);
          this.miFormulario.controls['aire_acondicionado'].setValue(this.hotel.aire_acondicionado);
          this.miFormulario.controls['comunidad'].setValue(this.buscarComunidad());
          this.miFormulario.controls['ubicacion'].setValue(JSON.stringify(this.coordenadas));
          this.miFormulario.controls['multimedia'].setValue(this.hotel.multimedias.length);
          this.datosCoordenada = 'Longitud: ' + this.hotel.longitud + ', Latitud: ' + this.hotel.latitud;

    

    this.loading = false;
      
  }

  buscarComunidad() {
      return this.comunidades.find((comunidad) => comunidad.id_comunidad == this.hotel.id_comunidad);
  }

  volver() {
    this.router.navigate(['/index/hoteles']);
  }

}
