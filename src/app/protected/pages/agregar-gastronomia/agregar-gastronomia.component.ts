import { Component, Input } from '@angular/core';
import { GastronomiasService } from '../../services/gastronomias.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComunidadesService } from '../../services/comunidades.service';
import { Comunidades } from '../../interfaces/comunidades';
import { Gastronomia } from '../../interfaces/gastronomias';
import { Router } from '@angular/router';
import { UploadEvent } from '../../interfaces/imagenes';

@Component({
  selector: 'app-agregar-gastronomia',
  templateUrl: './agregar-gastronomia.component.html',
  styleUrls: ['./agregar-gastronomia.component.scss']
})
export class AgregarGastronomiaComponent {
  
  //gastronomia!: Gastronomia;
  

  comunidades: Comunidades[] = [];
  //comunidad!: Comunidades;

  selectedMulti: any[] = [];

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
      private router:Router
  ) {}

  ngOnInit() {
      this.getComunidades();
  }
  getComunidades() {
    this.comunidadesService.getComunidades().subscribe((comunidades) => {
        // console.log(roles);
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

  guardar() {
    console.log('imagenes', this.filesMulti);
    this.miFormulario.patchValue({multimedia : this.filesMulti.length});
      console.log('miFormulario', this.miFormulario.value);
      if (this.miFormulario.invalid) {
          this.miFormulario.markAllAsTouched();
          return;
      }
      
      this.agregarGastronomia();
      
  }

  agregarGastronomia() {
      
      const gastronomia: Gastronomia = {
        nombre: this.miFormulario.value.nombre,
        descripcion: this.miFormulario.value.descripcion,
        tipo: this.miFormulario.value.tipo,
        estado: 1,
        ids_comunidad: this.miFormulario.value.comunidades.map((c: Comunidades) => c.id_comunidad),
        delete_ids_comunidad: [],
        multimedias:[],
        comunidades: []
      }
    
      console.log('gastronomia a crear', gastronomia);
      
      this.gastronomiasService.agregarGastronomiaCompleto(gastronomia, this.filesMulti).subscribe((resp) => {
        console.log('Guardar gastronomia', resp);
        if(resp.ok) {
          this.miFormulario.reset();
          this.filesMulti = [];
          this.router.navigate(['/index/gastronomias']);
        }
      });
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
  
}
