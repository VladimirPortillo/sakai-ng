import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs, 'es');

import { Comunidades } from '../../interfaces/comunidades';
import { ComunidadesService } from '../../services/comunidades.service';
import { PdfReportService } from '../../services/pdf-report.service';
import { ReportesService } from '../../services/reportes.service';
import { log } from 'console';


@Component({
  selector: 'app-pdf-report',
  templateUrl: './pdf-report.component.html',
  styleUrls: ['./pdf-report.component.scss'],
  providers: [DatePipe,{provide:LOCALE_ID, useValue: 'es'}],
})
export class PdfReportComponent {
  formattedDate: string="";
  comunidades: Comunidades[] = [];
  comunidad:any;
  minFechaFin: Date | null = null; // Fecha mínima para la fecha de fin
  maxFechaInicio: Date | null = null; // Fecha máxima para la fecha de inicio

  constructor(
    private fb: FormBuilder,
    private comunidadesService: ComunidadesService,
    private primengConfig: PrimeNGConfig,
    private reportesService: PdfReportService,
    private srvImprimir: ReportesService,
    private datePipe:DatePipe
  ){
    
  }
  ngOnInit() {
    this.cambiarIdioma();
    this.getComunidades();
  }
  getComunidades() {
    this.comunidadesService.getComunidades().subscribe((resp) => {
        this.comunidades = resp;
        console.log(this.comunidades);
    });
  }
  miFormulario: FormGroup = this.fb.group({
    id_comunidad: ['', [Validators.required]],
    fecha_inic: ['', [Validators.required]],
    fecha_fin: ['', [Validators.required]],

  },
  { validators: this.validarFechas } 
);
   // Validador personalizado para fechas
   validarFechas(control: AbstractControl): ValidationErrors | null {
    const fechaInicio = control.get('fecha_inic')?.value;
    const fechaFin = control.get('fecha_fin')?.value;

    if (fechaInicio && fechaFin && fechaInicio > fechaFin) {
      return { fechaInvalida: true };
    }

    return null;
  }
  campoEsValido(campo: string) {
    return (
      this.miFormulario.controls[campo].errors &&
      this.miFormulario.controls[campo].touched
    );
  }

  campoErrorMsg(campo: string) {
    
    if (campo === 'fecha_inic' || campo === 'fecha_fin') {
      const error = this.miFormulario.errors?.['fechaInvalida'];
      if (error) {
        
        console.log('error de fecha');
        return 'La fecha de inicio no puede ser posterior a la fecha de fin.';

      }
    }
    //console.log('ERRORS', this.miFormulario.controls[campo]?.errors);
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
  
    return;
  }
  guardar() {
    console.log('miFormulario', this.miFormulario.value);
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    this.onImprimir();
  }
  onImprimir(){
    const id_comunidad = this.miFormulario.value.id_comunidad.id_comunidad;
    const fecha_inic = this.transformarFecha(this.miFormulario.value.fecha_inic);
    const fecha_fin = this.transformarFecha(this.miFormulario.value.fecha_fin);

    console.log('fecha_inic: '+fecha_inic+'  fecha_fin: '+fecha_fin);  
    
    let rowNumber=0;
    const encabezado=["N°","Comunidad","Actividad","Descrición","Dirección","Fecha de inicio","Fecha de finalización"];  

     this.reportesService.getComunidadActividades(id_comunidad, fecha_inic, fecha_fin).subscribe((resp) => {
       console.log('comunidad actividades', resp);
       const cuerpo= Object(resp.actividades).map(
        (obj:any)=>{        
            const datos=[
                rowNumber += 1,
                resp.nombre, // aqui sacas el nom de la comunidad que esta en resp
                obj.nombre, // este seria el nom de actividade ya no pones actividades por que estas recorriendo con el el map en actividades 
                obj.descripcion,
                obj.direccion,
                this.datePipe.transform(obj.fecha_inicio, 'EEEE, dd MMMM yyyy'),
                this.datePipe.transform(obj.fecha_fin, 'EEEE, dd MMMM yyyy')
            ]
            return datos;
        }
    )
    console.log(cuerpo);
    this.srvImprimir.imprimir(encabezado,cuerpo,"Lista actividades",true);
    });
    //console.log(this.miFormulario.value);
  }

  transformarFecha(fecha: Date): string {
    // Convertir la cadena de fecha a un objeto Date
    //const fecha = new Date(fechaString);
  
    // Obtener el año, mes y día
    const año = fecha.getFullYear();
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses van de 0 a 11, por lo que sumamos 1
    const dia = fecha.getDate().toString().padStart(2, '0');
  
    // Formatear la fecha en el formato año/mes/día
    return `${año}/${mes}/${dia}`;
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
