import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comunidades } from '../../interfaces/comunidades';
import { TipoActividades } from '../../interfaces/tipoActividades';
import { Actividades } from '../../interfaces/actividades';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ComunidadesService } from '../../services/comunidades.service';
import { tipoActividadesService } from '../../services/tipoActividades.service';
import { ActividadesService } from '../../services/actividades.service';
import { Router } from '@angular/router';
import { DataMaps } from '../../interfaces/maps';
import { UploadEvent } from '../../interfaces/imagenes';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { PrimeNGConfig } from 'primeng/api';
registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-agregar-actividad',
  templateUrl: './agregar-actividad.component.html',
  styleUrls: ['./agregar-actividad.component.scss'],
  providers: [{provide:LOCALE_ID, useValue: 'es'}]
})
export class AgregarActividadComponent {
  comunidades: Comunidades[] = [];
  comunidad!: Comunidades;

  tipoActividades: TipoActividades[] = [];
  tipoActividad!: TipoActividades;

  datosCoordenada: string = '';

  @Input() actividad!: Actividades;
  
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
    fecha_inicio: ['', [Validators.required]],
    fecha_fin: ['', [Validators.required]],
    comunidad: ['', [Validators.required]],
    tipoActividad: ['', [Validators.required]],
    ubicacion: ['', [Validators.required]],
    multimedia: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
  },
  { validators: this.validarFechas } 
);
     // Validador personalizado para fechas
     validarFechas(control: AbstractControl): ValidationErrors | null {
      const fechaInicio = control.get('fecha_inicio')?.value;
      const fechaFin = control.get('fecha_fin')?.value;
  
      if (fechaInicio && fechaFin && fechaInicio > fechaFin) {
        return { fechaInvalida: true };
      }
  
      return null;
    }
  

  constructor(
    private comunidadesService: ComunidadesService,
    private tipoActividadesService: tipoActividadesService,
    private fb: FormBuilder,
    private actividadesService: ActividadesService,
    private primengConfig: PrimeNGConfig,
    private router:Router
  ) { }

  ngOnInit() {
    this.cambiarIdioma();
    this.getComunidades();
    // this.getTipoActividades();
  }

  getComunidades() {
    this.comunidadesService.getComunidades().subscribe((comunidades) => {
      // console.log(roles);
      this.comunidades = comunidades;
      //this.cargarDatos();
    });
    this.tipoActividadesService.getTipoActividades().subscribe((tipoActividades) => {
      // console.log(roles);
      this.tipoActividades = tipoActividades;
      //this.cargarDatos();
    });

  }
  buscarComunidad() {
    return this.comunidades.find((comunidad) => comunidad.id_comunidad == this.actividad.id_comunidad);
  }
  buscarTipoActividad() {
    return this.tipoActividades.find((tipoActividad) => tipoActividad.id_tipo == this.actividad.id_tipo);
  }
  campoEsValido(campo: string) {
    return (
      this.miFormulario.controls[campo].errors &&
      this.miFormulario.controls[campo].touched
    );
  }

  campoErrorMsg(campo: string) {
    console.log('ERRORS', this.miFormulario.controls[campo]?.errors);
    if (campo === 'fecha_inicio' || campo === 'fecha_fin') {
      const error = this.miFormulario.errors?.['fechaInvalida'];
      if (error) {
        return 'La fecha de inicio no puede ser posterior a la fecha de fin.';
      }
    }
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
    this.agregarActividad();
    
  }

  agregarActividad() {

    const coordenadas: DataMaps = JSON.parse(this.miFormulario.value.ubicacion);
    // Convertir el string devuelto por transformarFecha a un objeto Date
    
    const actividad:Actividades={
      nombre : this.miFormulario.value.nombre,
      descripcion : this.miFormulario.value.descripcion,
      direccion : this.miFormulario.value.direccion,
      fecha_inicio : this.miFormulario.value.fecha_inicio,
      fecha_fin : this.miFormulario.value.fecha_fin,
      id_comunidad : this.miFormulario.value.comunidad.id_comunidad,
      id_tipo : this.miFormulario.value.tipoActividad.id_tipo,
      longitud : coordenadas.longitud,
      latitud : coordenadas.latitud,
      estado : 1,
      multimedias:[]
    }
    
    console.log('agregar_actvidad',actividad);
    this.actividadesService.agregarActividadCompleto(actividad,this.filesMulti).subscribe((resp) => {
      if(resp.ok) {
        this.miFormulario.reset();
        this.datosCoordenada = '';
        this.filesMulti = [];
        this.router.navigate(['/index/actividades']);
      }
    });
  }
  // funcion para volver a administrar actividades
  volver() {
    this.router.navigate(['/index/actividades']);
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
  
  //cambiar idioma al colendario a español
  cambiarIdioma(){
    this.primengConfig.setTranslation({
      dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["D", "L", "M", "M", "J", "V", "S"],
      monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
      today: 'Hoy',
      clear: 'Limpiar',
      dateFormat: 'dd/mm/yy',
      weekHeader: 'Sem'
    });
  }
}
