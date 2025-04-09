import { Component } from '@angular/core';
import { ComunidadesService } from '../../services/comunidades.service';
import { tipoActividadesService } from '../../services/tipoActividades.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActividadesService } from '../../services/actividades.service';
import { Actividades } from '../../interfaces/actividades';
import { TipoActividades } from '../../interfaces/tipoActividades';
import { Comunidades, Multimedia } from '../../interfaces/comunidades';
import { ActivatedRoute, Router } from '@angular/router';
import { DataMaps } from '../../interfaces/maps';
import { environment } from 'src/environments/environment';
import { UploadEvent } from '../../interfaces/imagenes';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { PrimeNGConfig } from 'primeng/api';
registerLocaleData(localeEs, 'es');



const url = environment.urlApi;
const rutaPublic = environment.rutaPublic;

@Component({
  selector: 'app-editar-actividad',
  templateUrl: './editar-actividad.component.html',
  styleUrls: ['./editar-actividad.component.scss'],
  providers: [{provide:LOCALE_ID, useValue: 'es'}]
})
export class EditarActividadComponent {

  datosCoordenada: string = '';
  coordenadas!: DataMaps;
  comunidades: Comunidades[] = [];
  comunidad!: Comunidades;

  tipoActividades: TipoActividades[] = [];
  tipoActividad!: TipoActividades;

id_actividad=0;
actividad!: Actividades;

urlPublic = url + rutaPublic;

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
    fecha_inicio: ['', [Validators.required]],
    fecha_fin: ['', [Validators.required]],
    comunidad: ['', [Validators.required]],
    tipoActividad:['', [Validators.required]],
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
    private router:Router,
    private route: ActivatedRoute,
    private primengConfig: PrimeNGConfig,
) {}

ngOnInit() {
  this.getComunidades();
  // this.getTipoActividades();
}

getComunidades() {
  this.comunidadesService.getComunidades().subscribe((comunidades) => {
      // console.log(roles);
      this.comunidades = comunidades;
      this.getTipoActividades();
  });
  
  
}
getTipoActividades(){
  this.tipoActividadesService.getTipoActividades().subscribe((tipoActividades) => {
    // console.log(roles);
    this.tipoActividades = tipoActividades;
    this.getActividades();
});
}
getActividades(){
  this.route.paramMap.subscribe(params => {
    this.id_actividad = +params.get('id_actividad')!; // Convertir a número
    //console.log('ID Comunidad:', this.id_comunidad);
    this.actividadesService.verActividad(this.id_actividad).subscribe((resp) => {
      console.log('actividad:', resp);
      this.actividad = resp.data;
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
  this.coordenadas = {
    longitud: this.actividad.longitud,
    latitud: this.actividad.latitud
  }
        this.miFormulario.controls['nombre'].setValue(this.actividad.nombre);
        this.miFormulario.controls['descripcion'].setValue(this.actividad.descripcion);
        this.miFormulario.controls['direccion'].setValue(this.actividad.direccion);
        this.miFormulario.controls['fecha_inicio'].setValue(new Date(this.actividad.fecha_inicio + ''));
        this.miFormulario.controls['fecha_fin'].setValue(new Date(this.actividad.fecha_fin + ''));
        this.miFormulario.controls['comunidad'].setValue(this.buscarComunidad());
        this.miFormulario.controls['tipoActividad'].setValue(this.buscarTipoActividad());
        this.miFormulario.controls['ubicacion'].setValue(JSON.stringify(this.coordenadas));
        this.miFormulario.controls['multimedia'].setValue(this.actividad.multimedias.length);
        this.datosCoordenada = 'Longitud: ' + this.actividad.longitud + ', Latitud: ' + this.actividad.latitud;
        this.actividad.multimedias?.map(m => m.eliminar = false);
        this.loading = false;
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



guardar() {
  const cantMulti = this.actividad.multimedias.filter(m => m.eliminar === false).length + this.filesMulti.length
    this.miFormulario.patchValue({multimedia : cantMulti});
    console.log('miFormulario', this.miFormulario.value);
    if (this.miFormulario.invalid) {
        this.miFormulario.markAllAsTouched();
        return;
    }
   
        this.editarActividad();
  
}

editarActividad() {
  const coordenadas: DataMaps = JSON.parse(this.miFormulario.value.ubicacion);
    this.actividad.nombre = this.miFormulario.value.nombre;
    this.actividad.descripcion = this.miFormulario.value.descripcion;
    this.actividad.direccion = this.miFormulario.value.direccion;
    this.actividad.fecha_inicio = this.miFormulario.value.fecha_inicio;
    this.actividad.fecha_fin = this.miFormulario.value.fecha_fin;
    this.actividad.id_comunidad = this.miFormulario.value.comunidad.id_comunidad;
    this.actividad.id_tipo = this.miFormulario.value.tipoActividad.id_tipo;
    this.actividad.longitud = coordenadas.longitud;
    this.actividad.latitud = coordenadas.latitud;
    this.actividad.estado = 1;

    this.actividadesService.editarActividadCompleto(this.actividad, this.filesMulti).subscribe(resp => {
      console.log('Editar actividad', resp);
      if(resp.ok) {
        this.miFormulario.reset();
        this.datosCoordenada = '';
        this.filesMulti = [];
        this.router.navigate(['/index/actividades']);
      }
    });
}
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


elimarImage(multimediaEliminado: Multimedia) {

  console.log('imagen eliminada => ', multimediaEliminado);

  this.actividad.multimedias?.map(m => {
    if(m.id_multimedia === multimediaEliminado.id_multimedia) {
      m.eliminar = true;
    }
  });

  console.log('eliminar multimedia comunidad', this.actividad);    

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
