import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';




import { ImageModule } from 'primeng/image';
import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule } from 'primeng/carousel';

import { ModalUsuarioComponent } from './modal-usuario/modal-usuario.component';
import { ModalRolComponent } from './modal-rol/modal-rol.component';
import { ModalActividadComponent } from './modal-actividad/modal-actividad.component';
import { ModalRestauranteComponent } from './modal-restaurante/modal-restaurante.component';
import { ModalHotelComponent } from './modal-hotel/modal-hotel.component';
import { ModalAtractivoComponent } from './modal-atractivo/modal-atractivo.component';
import { ModalComunidadComponent } from './modal-comunidad/modal-comunidad.component';
import { ModalGastronomiaComponent } from './modal-gastronomia/modal-gastronomia.component';
import { ModalMenuComponent } from './modal-menu/modal-menu.component';
import { ModalTipoActividadComponent } from './modal-tipo-actividad/modal-tipo-actividad.component';



@NgModule({
    declarations: [
        ModalUsuarioComponent, 
        ModalRolComponent, 
        ModalActividadComponent, 
        ModalRestauranteComponent, 
        ModalHotelComponent, 
        ModalAtractivoComponent, 
        ModalComunidadComponent, 
        ModalGastronomiaComponent, 
        ModalMenuComponent, 
        ModalTipoActividadComponent,
        
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        ToggleButtonModule,
        RippleModule,
        MultiSelectModule,
        DropdownModule,
        ProgressBarModule,
        ToastModule,
        RadioButtonModule,
        InputSwitchModule,
        DialogModule,
        ConfirmDialogModule,
        CalendarModule,
        InputTextareaModule,
        FileUploadModule,
        CarouselModule,
        ImageModule,
		GalleriaModule
        
    ],
    exports: [
        ModalUsuarioComponent,
        ModalRestauranteComponent,
        ModalHotelComponent,
        ModalAtractivoComponent,
        ModalComunidadComponent,
        ModalRolComponent, 
        ModalActividadComponent, 
        ModalGastronomiaComponent,
        ModalMenuComponent,
        ModalTipoActividadComponent
    ],
})
export class ModalComponentsModule {}
