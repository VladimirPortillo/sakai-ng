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
import { FormsModule } from '@angular/forms';
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

import { ActividadesComponent } from './pages/actividades/actividades.component';
import { MenusComponent } from './pages/menus/menus.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ComunidadesComponent } from './pages/comunidades/comunidades.component';
import { AtractivosComponent } from './pages/atractivos/atractivos.component';
import { HotelesComponent } from './pages/hoteles/hoteles.component';
import { RestaurantesComponent } from './pages/restaurantes/restaurantes.component';
import { GastronomiasComponent } from './pages/gastronomias/gastronomias.component';
import { ModalComponentsModule } from './pages/modal-components/modal-components.module';


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
        GastronomiasComponent],
    imports: [
        CommonModule,
        ProtectedRoutingModule,
        ComponentsModule,
        ModalComponentsModule,

        FormsModule,
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
        InputTextareaModule
    ],
})
export class ProtectedModule {}