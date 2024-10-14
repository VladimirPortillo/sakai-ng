import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { HomeComponent } from './pages/home/home.component';
import { ComponentsModule } from './components/components.module';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { RolesComponent } from './pages/roles/roles.component';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { SliderModule } from 'primeng/slider';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalendarModule } from "primeng/calendar";
import { InputTextareaModule } from "primeng/inputtextarea";
import { FileUploadModule } from 'primeng/fileupload';
import { SelectButtonModule } from 'primeng/selectbutton';
// import { GoogleMapsModule } from '@angular/google-maps';




import { AutoCompleteModule } from "primeng/autocomplete";
import { ChipsModule } from "primeng/chips";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { CascadeSelectModule } from "primeng/cascadeselect";



import { ActividadesComponent } from './pages/actividades/actividades.component';
import { MenusComponent } from './pages/menus/menus.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ComunidadesComponent } from './pages/comunidades/comunidades.component';
import { AtractivosComponent } from './pages/atractivos/atractivos.component';
import { HotelesComponent } from './pages/hoteles/hoteles.component';
import { RestaurantesComponent } from './pages/restaurantes/restaurantes.component';
import { GastronomiasComponent } from './pages/gastronomias/gastronomias.component';
import { ModalComponentsModule } from './pages/modal-components/modal-components.module';
import { PdfReportComponent } from './pages/pdf-report/pdf-report.component';
import { TipoActividadesComponent } from './pages/tipo-actividades/tipo-actividades.component';
import { VerImagenesComponent } from './pages/ver-imagenes/ver-imagenes.component';
import { AgregarComunidadComponent } from './pages/agregar-comunidad/agregar-comunidad.component';
import { MapComponent } from './pages/map/map.component';


@NgModule({
    declarations: [
        IndexComponent, 
        HomeComponent, 
        RolesComponent, 
        ActividadesComponent, 
        MenusComponent, 
        UsuariosComponent, 
        ComunidadesComponent, 
        AtractivosComponent, 
        HotelesComponent, 
        RestaurantesComponent, 
        GastronomiasComponent, 
        PdfReportComponent, 
        TipoActividadesComponent, 
        VerImagenesComponent, 
        AgregarComunidadComponent, 
        MapComponent],
    imports: [
        CommonModule,
        ProtectedRoutingModule,
        ComponentsModule,
        ModalComponentsModule,
        // GoogleMapsModule,

        FormsModule,
        ReactiveFormsModule,

        TableModule,
        RatingModule,
        ButtonModule,
        SliderModule,
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
        SelectButtonModule,

        AutoCompleteModule,
        ChipsModule,
        InputMaskModule,
        InputNumberModule,
        CascadeSelectModule 
    ],
})
export class ProtectedModule {}
