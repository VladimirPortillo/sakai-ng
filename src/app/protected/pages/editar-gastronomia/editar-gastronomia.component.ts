import { Component } from '@angular/core';
import { GastronomiasService } from '../../services/gastronomias.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComunidadesService } from '../../services/comunidades.service';
import { Comunidades, Multimedia } from '../../interfaces/comunidades';
import { Gastronomia } from '../../interfaces/gastronomias';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UploadEvent } from '../../interfaces/imagenes';

const url = environment.urlApi;
const rutaPublic = environment.rutaPublic;

@Component({
  selector: 'app-editar-gastronomia',
  templateUrl: './editar-gastronomia.component.html',
  styleUrls: ['./editar-gastronomia.component.scss']
})
export class EditarGastronomiaComponent {
  
  gastronomia!: Gastronomia;
  id_gastronomia=0;
  comunidades: Comunidades[] = [];
  comunidad!: Comunidades;
  selectedMulti: any[] = [];
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
      tipo: ['', [Validators.required]],
      comunidades: ['', [Validators.required]],
      multimedia: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
  });

  constructor(
    private comunidadesService: ComunidadesService,
      private fb: FormBuilder,
      private gastronomiasService: GastronomiasService,
      private router:Router,
      private route:ActivatedRoute
  ) {}

  ngOnInit() {
      console.log('modal usuario', this.gastronomia);
      this.getComunidades();
  }
  getComunidades() {
    this.comunidadesService.getComunidades().subscribe((comunidades) => {
        // console.log(roles);
        this.comunidades = comunidades;
        console.log('this.comunidades', this.comunidades);        
        this.getGastronomia();
    });
}
getGastronomia(){
  this.route.paramMap.subscribe(params => {
    this.id_gastronomia = +params.get('id_gastronomia')!; // Convertir a número
    //console.log('ID Comunidad:', this.id_comunidad);
    this.gastronomiasService.verGastronomia(this.id_gastronomia).subscribe((resp) => {
      console.log('gastronomia:', resp);
      this.gastronomia = resp.data;
      this.cargarDatos();
    }); 
  });
}
  cargarDatos() {
          this.miFormulario.controls['nombre'].setValue(this.gastronomia.nombre);
          this.miFormulario.controls['descripcion'].setValue(this.gastronomia.descripcion);
          this.miFormulario.controls['tipo'].setValue(this.gastronomia.tipo);
          this.miFormulario.controls['multimedia'].setValue(this.gastronomia.multimedias.length);
          this.miFormulario.controls['comunidades'].setValue(this.gastronomia.comunidades);
        this.gastronomia.multimedias?.map(m => m.eliminar = false);
        this.loading = false;
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
    const cantMulti = this.gastronomia.multimedias.filter(m => m.eliminar === false).length + this.filesMulti.length
    this.miFormulario.patchValue({multimedia : cantMulti});
      if (this.miFormulario.invalid) {
          this.miFormulario.markAllAsTouched();
          return;
      }
  
          this.editarGastronomia();
           
  }
  editarGastronomia() {
      
      this.gastronomia.nombre = this.miFormulario.value.nombre;
      this.gastronomia.descripcion = this.miFormulario.value.descripcion;
      this.gastronomia.tipo = this.miFormulario.value.tipo;
      this.gastronomia.ids_comunidad = this.nuevasComunidades();
      this.gastronomia.delete_ids_comunidad = this.eliminarComunidades();

      console.log('this.gastronomia', this.gastronomia);
      console.log('this.gastronomia', JSON.stringify(this.gastronomia));

      this.gastronomiasService.editarGastronomiaCompleto(this.gastronomia, this.filesMulti).subscribe((resp) => {
        console.log('Editar gastronomia', resp);
        if(resp.ok) {
          this.miFormulario.reset();
          this.filesMulti = [];
          this.router.navigate(['/index/gastronomias']);
        }
      });
  }

  nuevasComunidades(): number[] {
    const datosA: Comunidades[] = this.miFormulario.value.comunidades;
    const datosB = this.gastronomia.comunidades;
    const nuevasComunidades = 
      datosA
      .filter(aItem => !datosB.some(bItem => bItem.id_comunidad === aItem.id_comunidad))
      .map(aItem => aItem.id_comunidad as number);
    //console.log('nuevas a agregar', nuevasComunidades);
    return nuevasComunidades;
  }

  eliminarComunidades(): number[] {
    const datosA = this.gastronomia.comunidades;
    const datosB: Comunidades[] = this.miFormulario.value.comunidades;
    const nuevasComunidades = 
      datosA
      .filter(aItem => !datosB.some(bItem => bItem.id_comunidad === aItem.id_comunidad))
      .map(aItem => aItem.id_comunidad as number);
    //console.log('a eliminar', nuevasComunidades);
    return nuevasComunidades;
  }

  volver() {
    this.router.navigate(['/index/gastronomias']);
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

  this.gastronomia.multimedias?.map(m => {
    if(m.id_multimedia === multimediaEliminado.id_multimedia) {
      m.eliminar = true;
    }
  });

  console.log('eliminar multimedia comunidad', this.gastronomia);    

}
}
