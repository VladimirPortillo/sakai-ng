import { Component, Input, OnInit } from '@angular/core';
import { UploadEvent } from '../../interfaces/imagenes';
import { ComunidadesService } from '../../services/comunidades.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comunidades, Multimedia } from '../../interfaces/comunidades';
import { Router } from '@angular/router';
import { DataMaps } from '../../interfaces/maps';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

const url = environment.urlApi;
const rutaPublic = environment.rutaPublic;

@Component({
  selector: 'app-editar-comunidad',
  templateUrl: './editar-comunidad.component.html',
  styleUrls: ['./editar-comunidad.component.scss']
})
export class EditarComunidadComponent implements OnInit {

  datosCoordenada: string = '';

  urlPublic = url + rutaPublic;

  comunidad!: Comunidades;
  id_comunidad:number=0;
  coordenadas!: DataMaps;
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
      superficie: ['', [Validators.required]],
      poblacion: ['', [Validators.required]],
      ubicacion: ['', [Validators.required]],
      multimedia: ['', [Validators.required, Validators.min(1), Validators.max(5)]],

  });

  constructor(
      private fb: FormBuilder,
      private comunidadesService: ComunidadesService,
      private router:Router,
      private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id_comunidad = +params.get('id_comunidad')!; // Convertir a número
      //console.log('ID Comunidad:', this.id_comunidad);
      this.comunidadesService.verComunidad(this.id_comunidad).subscribe((resp) => {
        console.log('comunidad', resp);
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
    //this.comunidadesService.verComunidad(id_comunidad);
    this.coordenadas = {
      longitud: this.comunidad.longitud,
      latitud: this.comunidad.latitud
    }
    this.miFormulario.controls['nombre'].setValue(this.comunidad.nombre);
    this.miFormulario.controls['descripcion'].setValue(this.comunidad.descripcion);
    this.miFormulario.controls['superficie'].setValue(this.comunidad.superficie);
    this.miFormulario.controls['poblacion'].setValue(this.comunidad.poblacion);
    this.miFormulario.controls['ubicacion'].setValue(JSON.stringify(this.coordenadas));
    this.miFormulario.controls['multimedia'].setValue(this.comunidad.multimedias.length);
    this.datosCoordenada = 'Longitud: ' + this.comunidad.longitud + ', Latitud: ' + this.comunidad.latitud;

    this.comunidad.multimedias?.map(m => m.eliminar = false);

    this.loading = false;

    console.log("formulario cargado", this.miFormulario.value);

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
    const cantMulti = this.comunidad.multimedias.filter(m => m.eliminar === false).length + this.filesMulti.length
    this.miFormulario.patchValue({multimedia : cantMulti});
    console.log('miFormulario', this.miFormulario.value);
    if (this.miFormulario.invalid) {
        this.miFormulario.markAllAsTouched();
        return;
    }
    this.editarComunidad();
      
  }

  editarComunidad() {

    const coordenadas: DataMaps = JSON.parse(this.miFormulario.value.ubicacion);

      this.comunidad.nombre = this.miFormulario.value.nombre;
      this.comunidad.descripcion = this.miFormulario.value.descripcion;
      this.comunidad.superficie = this.miFormulario.value.superficie;
      this.comunidad.poblacion = this.miFormulario.value.poblacion;
      this.comunidad.longitud = coordenadas.longitud;
      this.comunidad.latitud = coordenadas.latitud;
      this.comunidad.estado = 1;
      this.comunidad.id_usuario = 1;
      console.log('comunidad a editar', this.comunidad);
      
      this.comunidadesService.editarComunidadCompleto(this.comunidad, this.filesMulti).subscribe(resp => {
        console.log('Editar comunidad', resp);
        if(resp.ok) {
          this.miFormulario.reset();
          this.datosCoordenada = '';
          this.filesMulti = [];
          this.router.navigate(['/index/comunidades']);
        }
      });


      /* this.comunidadesService
          .editarComunidad(this.comunidad, this.comunidad.id_comunidad)
          .subscribe((resp) => {
              
          }); */
  }
  volver() {
    this.router.navigate(['/index/comunidades']);
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

    this.comunidad.multimedias?.map(m => {
      if(m.id_multimedia === multimediaEliminado.id_multimedia) {
        m.eliminar = true;
      }
    });

    console.log('eliminar multimedia comunidad', this.comunidad);    

  }

}
