import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comunidades } from 'src/app/protected/interfaces/comunidades';
import { Hoteles } from 'src/app/protected/interfaces/hoteles';
import { ComunidadesService } from 'src/app/protected/services/comunidades.service';
import { HotelesService } from 'src/app/protected/services/hoteles.service';

@Component({
  selector: 'app-modal-hotel',
  templateUrl: './modal-hotel.component.html',
  styleUrls: ['./modal-hotel.component.scss']
})
export class ModalHotelComponent {
  @Input() titleButton!: String;
  @Input() hotel!: Hoteles;
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
      tipo: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      num_habitaciones: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      comunidad: ['', [Validators.required]],
  });

  constructor(
      private comunidadesService: ComunidadesService,
      private fb: FormBuilder,
      private hotelesService: HotelesService
  ) {}

  ngOnInit() {
      console.log('modal usuario', this.hotel);
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
          this.miFormulario.controls['nombre'].setValue(this.hotel.nombre);
          this.miFormulario.controls['descripcion'].setValue(this.hotel.descripcion);
          this.miFormulario.controls['direccion'].setValue(this.hotel.direccion);
          this.miFormulario.controls['tipo'].setValue(this.hotel.tipo);
          this.miFormulario.controls['categoria'].setValue(this.hotel.categoria);
          this.miFormulario.controls['num_habitaciones'].setValue(this.hotel.num_habitaciones);
          this.miFormulario.controls['telefono'].setValue(this.hotel.telefono);
        
          this.miFormulario.controls['comunidad'].setValue(this.buscarComunidad());
      }
  }

  buscarComunidad() {
      return this.comunidades.find((comunidad) => comunidad.id_comunidad == this.hotel.id_comunidad);
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
          this.agregarHotel();
      }
      if (this.tipoAccion == 2) {
          this.editarHotel();
      }
      if (this.tipoAccion == 3 || this.tipoAccion == 4) {
          this.accionHotel();
      }
      this.miFormulario.reset();
  }

  agregarHotel() {
      this.hotel.nombre = this.miFormulario.value.nombre;
      this.hotel.descripcion = this.miFormulario.value.descripcion;
      this.hotel.direccion = this.miFormulario.value.direccion;
      this.hotel.tipo = this.miFormulario.value.tipo;
      this.hotel.categoria = this.miFormulario.value.categoria;
      this.hotel.num_habitaciones = this.miFormulario.value.num_habitaciones;
      this.hotel.telefono = this.miFormulario.value.telefono;
      this.hotel.foto = '--';
      this.hotel.longitud = 0;
      this.hotel.latitud = 0;
      this.hotel.estado = 1;
      this.hotel.id_comunidad = this.miFormulario.value.comunidad.id_comunidad;
      console.log('usuario', this.hotel);

      this.hotelesService.agregarHotel(this.hotel).subscribe((resp) => {
          this.onSaveDataModal.emit(false);
      });
  }

  editarHotel() {
      this.hotel.nombre = this.miFormulario.value.nombre;
      this.hotel.descripcion = this.miFormulario.value.descripcion;
      this.hotel.direccion = this.miFormulario.value.direccion;
      this.hotel.tipo = this.miFormulario.value.tipo;
      this.hotel.categoria = this.miFormulario.value.categoria;
      this.hotel.num_habitaciones = this.miFormulario.value.num_habitaciones;
      this.hotel.telefono = this.miFormulario.value.telefono;
      this.hotel.foto = '--';
      this.hotel.longitud = 0;
      this.hotel.latitud = 0;
      this.hotel.estado = 1;
      this.hotel.id_comunidad = this.miFormulario.value.comunidad.id_comunidad;
      console.log('usuario', this.hotel);

      this.hotelesService
          .editarRestaurante(this.hotel, this.hotel.id_hotel)
          .subscribe((resp) => {
              this.onSaveDataModal.emit(false);
          });
  }

  accionHotel() {
      console.log('usuario++++', this.hotel);
      if(this.tipoAccion == 3) {
          // Eliminación de usuario
          this.hotelesService.eliminarHotel(this.hotel.id_hotel)
              .subscribe((data) => {
                  this.onSaveDataModal.emit(false);
              });
      }

      if (this.tipoAccion == 4) {
          // Habilitación de usuario
          this.hotelesService
              .habilitarHotel(this.hotel.id_hotel)
              .subscribe((data) => {
                  this.onSaveDataModal.emit(false);
              });
      }
          
  }

}
