import { Component } from '@angular/core';

import { PrimeNGConfig } from 'primeng/api';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs, 'es');

import { Comunidades } from '../../interfaces/comunidades';
import { ComunidadesService } from '../../services/comunidades.service';

@Component({
  selector: 'app-pdf-report',
  templateUrl: './pdf-report.component.html',
  styleUrls: ['./pdf-report.component.scss'],
  providers: [{provide:LOCALE_ID, useValue: 'es'}],
})
export class PdfReportComponent {
  comunidades: Comunidades[] = [];
  comunidad:any;

  constructor(
    private comunidadesService: ComunidadesService,
    private primengConfig: PrimeNGConfig
  ){}
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
