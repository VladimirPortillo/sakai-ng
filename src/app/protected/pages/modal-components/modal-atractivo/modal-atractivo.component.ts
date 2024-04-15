import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Atractivos_turisticos } from 'src/app/protected/interfaces/atractivos';
import { Comunidades } from 'src/app/protected/interfaces/comunidades';
import { AtractivosService } from 'src/app/protected/services/atractivos.service';
import { ComunidadesService } from 'src/app/protected/services/comunidades.service';

@Component({
  selector: 'app-modal-atractivo',
  templateUrl: './modal-atractivo.component.html',
  styleUrls: ['./modal-atractivo.component.scss']
})
export class ModalAtractivoComponent {
  @Input() titleButton!: String;
  @Input() atractivo!: Atractivos_turisticos;
  @Input() tipoAccion!: number; //1=agregar, 0 = ver, 2=editar, 3 = eliminar, 4 = habilitar

  @Output() onCloseModal: EventEmitter<boolean> = new EventEmitter();
  @Output() onSaveDataModal: EventEmitter<boolean> = new EventEmitter();

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
  });

  constructor(
      private comunidadesService: ComunidadesService,
      private fb: FormBuilder,
      private atractivosService: AtractivosService
  ) {}

  ngOnInit() {
      console.log('modal usuario', this.atractivo);
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
          this.miFormulario.controls['nombre'].setValue(this.atractivo.nombre);
          this.miFormulario.controls['descripcion'].setValue(this.atractivo.descripcion);
          this.miFormulario.controls['direccion'].setValue(this.atractivo.direccion);
        
          this.miFormulario.controls['comunidad'].setValue(this.buscarComunidad());
      }
  }

  buscarComunidad() {
      return this.comunidades.find((comunidad) => comunidad.id_comunidad == this.atractivo.id_comunidad);
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
          this.agregarAtractivo();
      }
      if (this.tipoAccion == 2) {
          this.editarAtractivo();
      }
      if (this.tipoAccion == 3 || this.tipoAccion == 4) {
          this.accionAtractivo();
      }
      this.miFormulario.reset();
  }

  agregarAtractivo() {
      this.atractivo.nombre = this.miFormulario.value.nombre;
      this.atractivo.descripcion = this.miFormulario.value.descripcion;
      this.atractivo.direccion = this.miFormulario.value.direccion;
      this.atractivo.longitud = 0;
      this.atractivo.latitud = 0;
      this.atractivo.estado = 1;
      this.atractivo.id_comunidad = this.miFormulario.value.comunidad.id_comunidad;
      console.log('usuario', this.atractivo);

      this.atractivosService.agregarAtractivo(this.atractivo).subscribe((resp) => {
          this.onSaveDataModal.emit(false);
      });
  }

  editarAtractivo() {
      this.atractivo.nombre = this.miFormulario.value.nombre;
      this.atractivo.descripcion = this.miFormulario.value.descripcion;
      this.atractivo.direccion = this.miFormulario.value.direccion;
      this.atractivo.longitud = 0;
      this.atractivo.latitud = 0;
      this.atractivo.estado = 1;
      this.atractivo.id_comunidad = this.miFormulario.value.comunidad.id_comunidad;
      console.log('usuario', this.atractivo);

      this.atractivosService
          .editarAtractivo(this.atractivo, this.atractivo.id_atractivo)
          .subscribe((resp) => {
              this.onSaveDataModal.emit(false);
          });
  }

  accionAtractivo() {
      console.log('usuario', this.atractivo);
      if(this.tipoAccion == 3) {
          // Eliminación de usuario
          this.atractivosService.eliminarAtractivo(this.atractivo.id_atractivo)
              .subscribe((data) => {
                  this.onSaveDataModal.emit(false);
              });
      }

      if (this.tipoAccion == 4) {
          // Habilitación de usuario
          this.atractivosService
              .habilitarAtractivo(this.atractivo.id_atractivo)
              .subscribe((data) => {
                  this.onSaveDataModal.emit(false);
              });
      }
          
  }
}
