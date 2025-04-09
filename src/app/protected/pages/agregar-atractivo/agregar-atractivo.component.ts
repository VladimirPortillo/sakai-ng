import { Component, Input } from '@angular/core';
import { Atractivos_turisticos } from '../../interfaces/atractivos';
import { Comunidades } from '../../interfaces/comunidades';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComunidadesService } from '../../services/comunidades.service';
import { AtractivosService } from '../../services/atractivos.service';
import { Router } from '@angular/router';
import { DataMaps } from '../../interfaces/maps';
import { UploadEvent } from '../../interfaces/imagenes';

@Component({
  selector: 'app-agregar-atractivo',
  templateUrl: './agregar-atractivo.component.html',
  styleUrls: ['./agregar-atractivo.component.scss']
})
export class AgregarAtractivoComponent {
  @Input() atractivo!: Atractivos_turisticos;
  datosCoordenada: string = '';
  
  comunidades: Comunidades[] = [];
  comunidad!: Comunidades;
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
      comunidad: ['', [Validators.required]],
      ubicacion: ['', [Validators.required]],
      multimedia: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
  });

  constructor(
      private comunidadesService: ComunidadesService,
      private fb: FormBuilder,
      private atractivosService: AtractivosService,
      private router:Router
  ) {}

  ngOnInit() {
      this.getComunidades();
  }

  getComunidades() {
      this.comunidadesService.getComunidades().subscribe((comunidades) => {
          this.comunidades = comunidades;
      });
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
      console.log('miFormulario', this.miFormulario.value);
      this.miFormulario.patchValue({multimedia : this.filesMulti.length});
      if (this.miFormulario.invalid) {
          this.miFormulario.markAllAsTouched();
          return;
      }
      
      this.agregarAtractivo();
      
  }

  agregarAtractivo() {

    const coordenadas: DataMaps = JSON.parse(this.miFormulario.value.ubicacion);

    const atractivo: Atractivos_turisticos = {
      nombre: this.miFormulario.value.nombre,
      descripcion: this.miFormulario.value.descripcion,
      direccion: this.miFormulario.value.direccion,
      longitud: coordenadas.longitud,
      latitud: coordenadas.latitud,
      estado: 1,
      id_comunidad: this.miFormulario.value.comunidad.id_comunidad,
      multimedias:[]
    }

      
      console.log('agregar atractivo:', atractivo);

      this.atractivosService.agregarAtractivosCompleto(atractivo,this.filesMulti).subscribe((resp) => {
        if(resp.ok) {
            this.miFormulario.reset();
            this.datosCoordenada = '';
            this.filesMulti = [];
            this.router.navigate(['/index/atractivos']);
          }
      });
  }


  volver() {
    this.router.navigate(['/index/atractivos']);
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
