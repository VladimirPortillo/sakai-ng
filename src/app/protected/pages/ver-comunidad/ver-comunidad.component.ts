import { Component } from '@angular/core';
import { Comunidades, Multimedia } from '../../interfaces/comunidades';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComunidadesService } from '../../services/comunidades.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataMaps } from '../../interfaces/maps';
import { environment } from 'src/environments/environment';
import { UploadEvent } from '../../interfaces/imagenes';

const url = environment.urlApi;
const rutaPublic = environment.rutaPublic;

@Component({
  selector: 'app-ver-comunidad',
  templateUrl: './ver-comunidad.component.html',
  styleUrls: ['./ver-comunidad.component.scss']
})
export class VerComunidadComponent {

  comunidad!: Comunidades;
  id_comunidad = 0;
  loading: boolean=true;
  datosCoordenada: string = '';
  coordenadas!: DataMaps;
  urlPublic = url + rutaPublic;

  miFormulario: FormGroup = this.fb.group({
    nombre:       [''],
    descripcion:  [''],
    superficie:   [''],
    poblacion:    [''],
    ubicacion:    [''] ,

  });

  constructor(
    private fb: FormBuilder,
    private comunidadesService: ComunidadesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getComunidad();
  }
  getComunidad() {
    this.route.paramMap.subscribe(params => {
      this.id_comunidad = +params.get('id_comunidad')!; 
      this.comunidadesService.verComunidad(this.id_comunidad).subscribe((resp) => {
        console.log('comunidad:', resp);
        this.comunidad = resp.data;
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
      longitud: this.comunidad.longitud,
      latitud: this.comunidad.latitud
    }

    this.miFormulario.controls['nombre'].setValue(this.comunidad.nombre);
    this.miFormulario.controls['descripcion'].setValue(this.comunidad.descripcion);
    this.miFormulario.controls['superficie'].setValue(this.comunidad.superficie);
    this.miFormulario.controls['poblacion'].setValue(this.comunidad.poblacion);
    this.miFormulario.controls['ubicacion'].setValue(JSON.stringify(this.coordenadas));
    this.datosCoordenada = 'Longitud: ' + this.comunidad.longitud + ', Latitud: ' + this.comunidad.latitud;
    this.loading = false;
  }
  volver() {
    this.router.navigate(['/index/comunidades']);
  }
  
}
