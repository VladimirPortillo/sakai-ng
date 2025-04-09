import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComunidadesService } from '../../services/comunidades.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestaurantesService } from '../../services/restaurantes.service';
import { Restaurantes } from '../../interfaces/restaurantes';
import { Comunidades, Multimedia } from '../../interfaces/comunidades';
import { DataMaps } from '../../interfaces/maps';
import { environment } from 'src/environments/environment';
import { UploadEvent } from '../../interfaces/imagenes';

const url = environment.urlApi;
const rutaPublic = environment.rutaPublic;

@Component({
  selector: 'app-editar-restaurante',
  templateUrl: './editar-restaurante.component.html',
  styleUrls: ['./editar-restaurante.component.scss']
})
export class EditarRestauranteComponent {

   restaurante!: Restaurantes;
   datosCoordenada: string = '';
   coordenadas!: DataMaps;
  id_restaurante=0;
  urlPublic = url + rutaPublic;
  comunidades: Comunidades[] = [];
  comunidad!: Comunidades;
  loading: boolean = true;
  miFormulario: FormGroup = this.fb.group({
      nombre: [
          '',
          [
              Validators.required,
              Validators.minLength(3) /* , Validators.maxLength(10) */,
          ],
      ],
      descripcion: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      delivery: ['', [Validators.required]],
      comunidad: ['', [Validators.required]],
      ubicacion: ['', [Validators.required]],
      multimedia: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
  });

  constructor(
      private comunidadesService: ComunidadesService,
      private fb: FormBuilder,
      private restaurantesService: RestaurantesService,
      private router:Router,
      private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getComunidades();
  }
  getComunidades(){
    this.comunidadesService.getComunidades().subscribe((comunidades) => {
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
    console.log("entro a cargar datos:",this.restaurante);
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
          this.miFormulario.controls['multimedia'].setValue(this.restaurante.multimedias.length);
          this.datosCoordenada = 'Longitud: ' + this.restaurante.longitud + ', Latitud: ' + this.restaurante.latitud;

          this.restaurante.multimedias?.map(m => m.eliminar = false);
          this.loading = false;
  }

  buscarComunidad() {
      return this.comunidades.find((comunidad) => comunidad.id_comunidad == this.restaurante.id_comunidad);
  }

  campoEsValido(campo: string) {
      return (
          this.miFormulario.controls[campo].errors &&
          this.miFormulario.controls[campo].touched
      );
  }

  campoErrorMsg(campo: string) {
      console.log('ERRORS', this.miFormulario.controls[campo]?.errors);
      if (this.miFormulario.controls[campo]?.errors?.['required']) {
          return `Este campo es requerido.`;
      }
      if (this.miFormulario.controls[campo]?.errors?.['minlength']) {
          const value =
              this.miFormulario.controls[campo]?.errors?.['minlength']
                  .requiredLength;
          return `Este campo debe tener mínimo ${value} caracteres.`;
      }
      if (this.miFormulario.controls[campo]?.errors?.['maxlength']) {
          const value =
              this.miFormulario.controls[campo]?.errors?.['maxlength']
                  .requiredLength;
          return `Este campo debe tener máximo ${value} caracteres.`;
      }
      if (this.miFormulario.controls[campo]?.errors?.['min']) {
        return `Debe subir al menos 1 archivo y maximo 5 archivos.`;
      }
      if (this.miFormulario.controls[campo]?.errors?.['max']) {
        return `Debe subir al menos 1 archivo y maximo 5 archivos.`;
      }
      return;
  }



  guardar() {
    const cantMulti = this.restaurante.multimedias.filter(m => m.eliminar === false).length + this.filesMulti.length
    this.miFormulario.patchValue({multimedia : cantMulti});
      console.log('miFormulario', this.miFormulario.value);
      if (this.miFormulario.invalid) {
          this.miFormulario.markAllAsTouched();
          return;
      }
    
      this.editarRestaurante();
  }

  editarRestaurante() {
    const coordenadas: DataMaps = JSON.parse(this.miFormulario.value.ubicacion);
      this.restaurante.nombre = this.miFormulario.value.nombre;
      this.restaurante.descripcion = this.miFormulario.value.descripcion;
      this.restaurante.direccion = this.miFormulario.value.direccion;
      this.restaurante.categoria = this.miFormulario.value.categoria;
      this.restaurante.telefono = this.miFormulario.value.telefono;
      this.restaurante.delivery = this.miFormulario.value.delivery;
      this.restaurante.longitud = coordenadas.longitud;
      this.restaurante.latitud = coordenadas.latitud;
      this.restaurante.estado = 1;
      this.restaurante.id_comunidad = this.miFormulario.value.comunidad.id_comunidad;
      console.log('modal_restaurante:', this.restaurante);

      this.restaurantesService.editarRestauranteCompleto(this.restaurante, this.filesMulti).subscribe(resp => {
        console.log('Editar restaurante', resp);
        if(resp.ok) {
          this.miFormulario.reset();
          this.datosCoordenada = '';
          this.filesMulti = [];
          this.router.navigate(['/index/restaurantes']);
        }
      });
  }
  
  volver() {
    this.router.navigate(['/index/restaurantes']);
  }
    //cargar imagenes
    autoUpload: boolean = true;
    uploadedFiles: any[] = [];
    onUpload(event: UploadEvent) {
      console.log('entra a onupload');
      for (const file of event.files) {
        this.uploadedFiles.push(file);
      }
      console.log('image', this.uploadedFiles);
    }
  
    filesMulti: File[] = [];
  
    onSelectFiles(event: any) {
      this.filesMulti = event.currentFiles;
      this.miFormulario.patchValue({multimedia : this.filesMulti.length});    
    }
  
  
    elimarImage(multimediaEliminado: Multimedia) {
  
      console.log('imagen eliminada => ', multimediaEliminado);
  
      this.restaurante.multimedias?.map(m => {
        if(m.id_multimedia === multimediaEliminado.id_multimedia) {
          m.eliminar = true;
        }
      });
  
      console.log('eliminar multimedia comunidad', this.comunidad);    
  
    }
  
}
