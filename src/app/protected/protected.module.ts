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
import { ActividadesComponent } from './pages/actividades/actividades.component';


@NgModule({
    declarations: [IndexComponent, HomeComponent, RolesComponent, ActividadesComponent],
    imports: [
        CommonModule,
        ProtectedRoutingModule,
        ComponentsModule,

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
    ],
})
export class ProtectedModule {}
