import { Component } from '@angular/core';
import { AtractivosService } from '../../services/atractivos.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ComunidadesService } from '../../services/comunidades.service';
import { Comunidades } from '../../interfaces/comunidades';
import { Atractivos_turisticos } from '../../interfaces/atractivos';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DataMaps } from '../../interfaces/maps';
import { environment } from 'src/environments/environment';

const url = environment.urlApi;
const rutaPublic = environment.rutaPublic;

@Component({
  selector: 'app-ver-atractivo',
  templateUrl: './ver-atractivo.component.html',
  styleUrls: ['./ver-atractivo.component.scss']
})
export class VerAtractivoComponent {
  
  atractivo!: Atractivos_turisticos;
  comunidades: Comunidades[] = [];
  comunidad!: Comunidades;
  id_atractivo=0;
  datosCoordenada: string = '';
  coordenadas!: DataMaps;
  urlPublic = url + rutaPublic;
  loading:boolean = true;


  miFormulario: FormGroup = this.fb.group({
      nombre:       [''],
      descripcion:  [''],
      direccion:    [''],
      comunidad:  [''],
      ubicacion:    [''] ,
  });

  constructor(
      private comunidadesService: ComunidadesService,
      private fb: FormBuilder,
      private atractivosService: AtractivosService,
      private router:Router,
      private route:ActivatedRoute
  ) {}

  ngOnInit() {
      this.getComunidades();
  }

  getComunidades() {
      this.comunidadesService.getComunidades().subscribe((comunidades) => {
          // console.log(roles);
          this.comunidades = comunidades;
          this.getAtractivo();
      });
  }

  getAtractivo(){
    this.route.paramMap.subscribe(params => {
      this.id_atractivo = +params.get('id_atractivo')!;
      console.log('id atractivo=',this.id_atractivo);
      this.atractivosService.verAtractivo(this.id_atractivo).subscribe((resp) => {
        console.log('atractivo:', resp.data);
        this.atractivo = resp.data;
        this.cargarDatos();
      })
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
        longitud: this.atractivo.longitud,
        latitud: this.atractivo.latitud
      }
  
          this.miFormulario.controls['nombre'].setValue(this.atractivo.nombre);
          this.miFormulario.controls['descripcion'].setValue(this.atractivo.descripcion);
          this.miFormulario.controls['direccion'].setValue(this.atractivo.direccion);
          this.miFormulario.controls['comunidad'].setValue(this.buscarComunidad());
          this.miFormulario.controls['ubicacion'].setValue(JSON.stringify(this.coordenadas));
    this.datosCoordenada = 'Longitud: ' + this.atractivo.longitud + ', Latitud: ' + this.atractivo.latitud;
    this.loading = false;
  
  }

  buscarComunidad() {
      return this.comunidades.find((comunidad) => comunidad.id_comunidad == this.atractivo.id_comunidad);
  }
  volver() {
    this.router.navigate(['/index/atractivos']);
  }
  
}
