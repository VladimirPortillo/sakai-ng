import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComunidadesService } from '../../services/comunidades.service';
import { HttpUploadProgressEvent } from '@angular/common/http';
import { Comunidades } from '../../interfaces/comunidades';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-agregar-comunidad',
  templateUrl: './agregar-comunidad.component.html',
  styleUrls: ['./agregar-comunidad.component.scss'],
  providers: [MessageService]
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

  });

  constructor(
    private fb: FormBuilder,
    private comunidadesService: ComunidadesService,
    private router: Router,
    private messageService: MessageService
    //private messageService: MessageService
  ) { }

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
    return;
  }


  guardar() {
    console.log('miFormulario', this.miFormulario.value);
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    this.agregarComunidad();
    this.miFormulario.reset();
  }

  agregarComunidad() {
    console.log(this.miFormulario.value);
    console.log(this.miFormulario.value.nombre);

    const comunidad: Comunidades = {
      nombre: this.miFormulario.value.nombre,
      descripcion: this.miFormulario.value.descripcion,
      superficie: this.miFormulario.value.superficie,
      poblacion: this.miFormulario.value.poblacion,
      longitud: 0,
      latitud: 0,
      estado: 1,
      id_usuario: 1
    }

    console.log('comunidad', comunidad);

    this.comunidadesService.agregarComunidad(comunidad).subscribe((resp) => {
      console.log('Guardar comunidad', resp);
    });
  }

  volver() {
    this.router.navigate(['/index/comunidades']);
  }

  //cargar imagenes
  autoUpload: boolean = true;
  uploadedFiles: any[] = [];
  onUpload(event: any) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
  }
}
