import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ComunidadesService } from '../../services/comunidades.service';
import { RestaurantesService } from '../../services/restaurantes.service';
import { Comunidades } from '../../interfaces/comunidades';
import { Restaurantes } from '../../interfaces/restaurantes';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataMaps } from '../../interfaces/maps';
import { environment } from 'src/environments/environment';

const url = environment.urlApi;
const rutaPublic = environment.rutaPublic;

@Component({
  selector: 'app-ver-restaurante',
  templateUrl: './ver-restaurante.component.html',
  styleUrls: ['./ver-restaurante.component.scss']
})
export class VerRestauranteComponent {
  
   restaurante!: Restaurantes;
  

  comunidades: Comunidades[] = [];
  comunidad!: Comunidades;
  id_restaurante=0;
  datosCoordenada: string = '';
  coordenadas!: DataMaps;
  urlPublic = url + rutaPublic;
  loading:boolean = true;
  miFormulario: FormGroup = this.fb.group({
      nombre:       [''],
      descripcion:  [''],
      direccion:    [''],
      categoria:    [''],
      telefono:     [''],
      delivery:     [''],
      comunidad:    [''],
      ubicacion:    [''],
  });

  constructor(
      private comunidadesService: ComunidadesService,
      private fb: FormBuilder,
      private restaurantesService: RestaurantesService,
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
          this.getRestaurantes();
      });
  }
  getRestaurantes(){
    this.route.paramMap.subscribe(params => {
      this.id_restaurante = +params.get('id_restaurante')!; // Convertir a número
      this.restaurantesService.verRestaurante(this.id_restaurante).subscribe((resp) => {
        console.log('restaurante resp:',resp);
        this.restaurante = resp.data;
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
        longitud: this.restaurante.longitud,
        latitud: this.restaurante.latitud
      }
      
          this.miFormulario.controls['nombre'].setValue(this.restaurante.nombre);
          this.miFormulario.controls['descripcion'].setValue(this.restaurante.descripcion);
          this.miFormulario.controls['direccion'].setValue(this.restaurante.direccion);
          this.miFormulario.controls['categoria'].setValue(this.restaurante.categoria);
          this.miFormulario.controls['telefono'].setValue(this.restaurante.telefono);
          this.miFormulario.controls['delivery'].setValue(this.restaurante.delivery);
          this.miFormulario.controls['comunidad'].setValue(this.buscarComunidad());
          this.miFormulario.controls['ubicacion'].setValue(JSON.stringify(this.coordenadas));
    this.datosCoordenada = 'Longitud: ' + this.restaurante.longitud + ', Latitud: ' + this.restaurante.latitud;
    this.loading = false;
      
  }

  buscarComunidad() {
      return this.comunidades.find((comunidad) => comunidad.id_comunidad == this.restaurante.id_comunidad);
  }

  volver() {
    this.router.navigate(['/index/restaurantes']);
  }
}
