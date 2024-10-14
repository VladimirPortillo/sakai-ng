import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comunidades } from '../../../interfaces/comunidades';
import { Restaurantes } from 'src/app/protected/interfaces/restaurantes';
import { ComunidadesService } from 'src/app/protected/services/comunidades.service';
import { RestaurantesService } from 'src/app/protected/services/restaurantes.service';

@Component({
  selector: 'app-modal-restaurante',
  templateUrl: './modal-restaurante.component.html',
  styleUrls: ['./modal-restaurante.component.scss']
})
export class ModalRestauranteComponent {
  @Input() titleButton!: String;
  @Input() restaurante!: Restaurantes;
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
      categoria: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      delivery: ['', [Validators.required]],
      comunidad: ['', [Validators.required]],
  });

  constructor(
      private comunidadesService: ComunidadesService,
      private fb: FormBuilder,
      private restaurantesService: RestaurantesService
  ) {}

  ngOnInit() {
      console.log('modal restaurante:', this.restaurante);
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
          this.miFormulario.controls['nombre'].setValue(this.restaurante.nombre);
          this.miFormulario.controls['descripcion'].setValue(this.restaurante.descripcion);
          this.miFormulario.controls['direccion'].setValue(this.restaurante.direccion);
          this.miFormulario.controls['categoria'].setValue(this.restaurante.categoria);
          this.miFormulario.controls['telefono'].setValue(this.restaurante.telefono);
          this.miFormulario.controls['delivery'].setValue(this.restaurante.delivery);
        
          this.miFormulario.controls['comunidad'].setValue(this.buscarComunidad());
      }
  }

  buscarComunidad() {
      return this.comunidades.find((comunidad) => comunidad.id_comunidad == this.restaurante.id_comunidad);
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
          this.agregarRestaurante();
      }
      if (this.tipoAccion == 2) {
          this.editarRestaurante();
      }
      if (this.tipoAccion == 3 || this.tipoAccion == 4) {
          this.accionRestaurante();
      }
      this.miFormulario.reset();
  }

  agregarRestaurante() {
      this.restaurante.nombre = this.miFormulario.value.nombre;
      this.restaurante.descripcion = this.miFormulario.value.descripcion;
      this.restaurante.direccion = this.miFormulario.value.direccion;
      this.restaurante.categoria = this.miFormulario.value.categoria;
      this.restaurante.telefono = this.miFormulario.value.telefono;
      this.restaurante.delivery = this.miFormulario.value.delivery;
      this.restaurante.longitud = 0;
      this.restaurante.latitud = 0;
      this.restaurante.estado = 1;
      this.restaurante.id_comunidad = this.miFormulario.value.comunidad.id_comunidad;
      console.log('agregar_restaurante:', this.restaurante);

      this.restaurantesService.agregarRestaurante(this.restaurante).subscribe((resp) => {
          this.onSaveDataModal.emit(false);
      });
  }

  editarRestaurante() {
      this.restaurante.nombre = this.miFormulario.value.nombre;
      this.restaurante.descripcion = this.miFormulario.value.descripcion;
      this.restaurante.direccion = this.miFormulario.value.direccion;
      this.restaurante.categoria = this.miFormulario.value.categoria;
      this.restaurante.telefono = this.miFormulario.value.telefono;
      this.restaurante.delivery = this.miFormulario.value.delivery;
      this.restaurante.longitud = 0;
      this.restaurante.latitud = 0;
      this.restaurante.estado = 1;
      this.restaurante.id_comunidad = this.miFormulario.value.comunidad.id_comunidad;
      console.log('modal_restaurante:', this.restaurante);

      this.restaurantesService
          .editarRestaurante(this.restaurante, this.restaurante.id_restaurante)
          .subscribe((resp) => {
              this.onSaveDataModal.emit(false);
          });
  }

  accionRestaurante() {
      console.log('restaurante', this.restaurante);
      if(this.tipoAccion == 3) {
          // Eliminación de usuario
          this.restaurantesService.eliminarRestaurante(this.restaurante.id_restaurante)
              .subscribe((data) => {
                  this.onSaveDataModal.emit(false);
              });
      }

      if (this.tipoAccion == 4) {
          // Habilitación de usuario
          this.restaurantesService
              .habilitarRestaurante(this.restaurante.id_restaurante)
              .subscribe((data) => {
                  this.onSaveDataModal.emit(false);
              });
      }
          
  }

}
