import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Menus } from 'src/app/protected/interfaces/menus';
import { MenusService } from 'src/app/protected/services/menus.service';

@Component({
  selector: 'app-modal-menu',
  templateUrl: './modal-menu.component.html',
  styleUrls: ['./modal-menu.component.scss']
})
export class ModalMenuComponent {
  @Input() titleButton!: String;
  @Input() menu!: Menus;
  @Input() tipoAccion!: number; //1=agregar, 0 = ver, 2=editar, 3 = eliminar, 4 = habilitar

  @Output() onCloseModal: EventEmitter<boolean> = new EventEmitter();
  @Output() onSaveDataModal: EventEmitter<boolean> = new EventEmitter();

 
  miFormulario: FormGroup = this.fb.group({
      nombre: [
          '',
          [
              Validators.required,
              Validators.minLength(3) /* , Validators.maxLength(10) */,
          ],
      ],
  });

  constructor(
      private menusService: MenusService,
      private fb: FormBuilder,
      
  ) {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
      if (this.tipoAccion == 0) this.miFormulario.disable();
      if (this.tipoAccion != 1) {
          this.miFormulario.controls['nombre'].setValue(this.menu.nombre);
         
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
          this.agregarMenu();
      }
      if (this.tipoAccion == 2) {
          this.editarMenu();
      }
      if (this.tipoAccion == 3 || this.tipoAccion == 4) {
          this.accionMenu();
      }
      this.miFormulario.reset();
  }

  agregarMenu() {
      this.menu.nombre = this.miFormulario.value.nombre;

      this.menusService.agregarMenu(this.menu).subscribe((resp) => {
          this.onSaveDataModal.emit(false);
      });
  }

  editarMenu() {
      this.menu.nombre = this.miFormulario.value.nombre;
     
      this.menusService
          .editarMenu(this.menu, this.menu.id_menu)
          .subscribe((resp) => {
              this.onSaveDataModal.emit(false);
          });
  }

  accionMenu() {
      
      if(this.tipoAccion == 3) {
          // Eliminación de usuario
          this.menusService.eliminarMenu(this.menu.id_menu)
              .subscribe((data) => {
                  this.onSaveDataModal.emit(false);
              });
      }

      if (this.tipoAccion == 4) {
          // Habilitación de usuario
          this.menusService
              .habilitarMenu(this.menu.id_menu)
              .subscribe((data) => {
                  this.onSaveDataModal.emit(false);
              });
      }
          
  }
}
