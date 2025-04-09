import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComunidadesService } from '../../services/comunidades.service';
import { HttpUploadProgressEvent } from '@angular/common/http';
import { Comunidades } from '../../interfaces/comunidades';
import { Router } from '@angular/router';
import { DataMaps } from '../../interfaces/maps';
import { UploadEvent } from '../../interfaces/imagenes';

@Component({
  selector: 'app-agregar-comunidad',
  templateUrl: './agregar-comunidad.component.html',
  styleUrls: ['./agregar-comunidad.component.scss'],
  //providers: [MessageService]
})
export class AgregarComunidadComponent {
  

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

  datosCoordenada: string = '';
  coordenadas: DataMaps = {longitud: null, latitud: null};

  constructor(
    private fb: FormBuilder,
    private comunidadesService: ComunidadesService,
    private router: Router
  ) {
  }

  ngOnInit() {

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

  coordenadasMapa(coordenadas: DataMaps) {
    console.log('retorno datos mapa', coordenadas);
    this.miFormulario.patchValue({ubicacion : JSON.stringify(coordenadas)});
    this.datosCoordenada = 'Longitud: ' + coordenadas.longitud + ', Latitud: ' + coordenadas.latitud;
  }


  guardar() {
    console.log('imagenes', this.filesMulti);
    this.miFormulario.patchValue({multimedia : this.filesMulti.length});
    console.log('miFormulario', this.miFormulario.value);
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    this.agregarComunidad();
  }

  agregarComunidad() {    

    console.log('miFormulario', this.miFormulario.value);

    const coordenadas: DataMaps = JSON.parse(this.miFormulario.value.ubicacion);

    const comunidad: Comunidades = {
      nombre: this.miFormulario.value.nombre,
      descripcion: this.miFormulario.value.descripcion,
      superficie: this.miFormulario.value.superficie,
      poblacion: this.miFormulario.value.poblacion,
      longitud: coordenadas.longitud,
      latitud: coordenadas.latitud,
      estado: 1,
      id_usuario: 1,
      multimedias: []
    }

    console.log('comunidad', comunidad);

    this.comunidadesService.agregarComunidadCompleto(comunidad, this.filesMulti).subscribe((resp) => {
      console.log('Guardar comunidad', resp);
      if(resp.ok) {
        this.miFormulario.reset();
        this.datosCoordenada = '';
        this.filesMulti = [];
        this.router.navigate(['/index/comunidades']);
      }
    });
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

}
