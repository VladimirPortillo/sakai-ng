import { Component } from '@angular/core';
import { GastronomiasService } from '../../services/gastronomias.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ComunidadesService } from '../../services/comunidades.service';
import { Comunidades } from '../../interfaces/comunidades';
import { Gastronomia } from '../../interfaces/gastronomias';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataMaps } from '../../interfaces/maps';
import { environment } from 'src/environments/environment';

const url = environment.urlApi;
const rutaPublic = environment.rutaPublic;


@Component({
  selector: 'app-ver-gastronomia',
  templateUrl: './ver-gastronomia.component.html',
  styleUrls: ['./ver-gastronomia.component.scss']
})
export class VerGastronomiaComponent {
  
  gastronomia!: Gastronomia;
  comunidades: Comunidades[] = [];
  comunidad!: Comunidades;
  selectedMulti: any[] = [];
  id_gastronomia=0;
  urlPublic = url + rutaPublic;
  loading: boolean=true;
 
  miFormulario: FormGroup = this.fb.group({
      nombre:       [''],
      descripcion:  [''],
      tipo:         [''],
      comunidades:   [''],
      
  });

  constructor(
    private comunidadesService: ComunidadesService,
      private fb: FormBuilder,
      private gastronomiasService: GastronomiasService,
      private route:ActivatedRoute,
      private router:Router
  ) {}

  ngOnInit() {
      
    this.getComunidades();
  }
  getComunidades() {
    this.comunidadesService.getComunidades().subscribe((comunidades) => {
        this.comunidades = comunidades;
        this.getGastronomia();
    });
}
getGastronomia() {
  this.route.paramMap.subscribe(params => {
    this.id_gastronomia = +params.get('id_gastronomia')!; 
    this.gastronomiasService.verGastronomia(this.id_gastronomia).subscribe((resp) => {
      console.log('gastronomia:', resp);
      this.gastronomia = resp.data;
      this.cargarDatos();
    });
  });

}
  cargarDatos() {
       this.miFormulario.disable();
          this.miFormulario.controls['nombre'].setValue(this.gastronomia.nombre);
          this.miFormulario.controls['descripcion'].setValue(this.gastronomia.descripcion);
          this.miFormulario.controls['tipo'].setValue(this.gastronomia.tipo);
          this.miFormulario.controls['comunidades'].setValue(this.gastronomia.comunidades);
          this.loading = false;
  }
  volver() {
    this.router.navigate(['/index/gastronomias']);
  }

}
