import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comunidades } from 'src/app/protected/interfaces/comunidades';

import { Gastronomia } from 'src/app/protected/interfaces/gastronomias';
import { ComunidadesService } from 'src/app/protected/services/comunidades.service';
import { GastronomiasService } from 'src/app/protected/services/gastronomias.service';

@Component({
  selector: 'app-modal-gastronomia',
  templateUrl: './modal-gastronomia.component.html',
  styleUrls: ['./modal-gastronomia.component.scss']
})
export class ModalGastronomiaComponent {
  @Input() titleButton!: String;
  @Input() gastronomia!: Gastronomia;
  @Input() tipoAccion!: number; //1=agregar, 0 = ver, 2=editar, 3 = eliminar, 4 = habilitar

  @Output() onCloseModal: EventEmitter<boolean> = new EventEmitter();
  @Output() onSaveDataModal: EventEmitter<boolean> = new EventEmitter();

  comunidades: Comunidades[] = [];
  comunidad!: Comunidades;

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
  });

  constructor(
    private comunidadesService: ComunidadesService,
      private fb: FormBuilder,
      private gastronomiasService: GastronomiasService
  ) {}

  ngOnInit() {
      console.log('modal usuario', this.gastronomia);
      this.getComunidades();
  }
  getComunidades() {
    this.comunidadesService.getComunidades().subscribe((comunidades) => {
        // console.log(roles);
        this.comunidades = comunidades;
        this.cargarDatos();
    });
}
  cargarDatos() {
      if (this.tipoAccion == 0) this.miFormulario.disable();
      if (this.tipoAccion != 1) {
          this.miFormulario.controls['nombre'].setValue(this.gastronomia.nombre);
          this.miFormulario.controls['descripcion'].setValue(this.gastronomia.descripcion);
          this.miFormulario.controls['tipo'].setValue(this.gastronomia.tipo);
      }
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

  cerrarModal() {
      this.onCloseModal.emit(false);
  }

  guardar() {
      console.log('miFormulario', this.miFormulario.value);
      if (this.miFormulario.invalid) {
          this.miFormulario.markAllAsTouched();
          return;
      }
      if (this.tipoAccion == 1) {
          this.agregarGastronomia();
      }
      if (this.tipoAccion == 2) {
          this.editarGastronomia();
      }
      if (this.tipoAccion == 3 || this.tipoAccion == 4) {
          this.accionGastronomia();
      }
      this.miFormulario.reset();
  }

  agregarGastronomia() {
      this.gastronomia.nombre = this.miFormulario.value.nombre;
      this.gastronomia.descripcion = this.miFormulario.value.descripcion;
      this.gastronomia.tipo = this.miFormulario.value.tipo;
    
      this.gastronomiasService.agregarGastronomia(this.gastronomia).subscribe((resp) => {
          this.onSaveDataModal.emit(false);
      });
  }
  editarGastronomia() {
      this.gastronomia.nombre = this.miFormulario.value.nombre;
      this.gastronomia.descripcion = this.miFormulario.value.descripcion;
      this.gastronomia.tipo = this.miFormulario.value.tipo;
      

      this.gastronomiasService
          .editarGastronomia(this.gastronomia, this.gastronomia.id_gastronomia)
          .subscribe((resp) => {
              this.onSaveDataModal.emit(false);
          });
  }

  accionGastronomia() {
      console.log('usuario', this.gastronomia);
      if(this.tipoAccion == 3) {
          // Eliminación de usuario
          this.gastronomiasService.eliminarGastronomia(this.gastronomia.id_gastronomia)
              .subscribe((data) => {
                  this.onSaveDataModal.emit(false);
              });
      }

      if (this.tipoAccion == 4) {
          // Habilitación de usuario
          this.gastronomiasService
              .habilitarGastronomia(this.gastronomia.id_gastronomia)
              .subscribe((data) => {
                  this.onSaveDataModal.emit(false);
              });
      }
          
  }
}
