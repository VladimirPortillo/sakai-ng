import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

import { TopbarComponent } from './topbar/topbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { MenuitemComponent } from './menuitem/menuitem.component';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './loading/loading.component';



@NgModule({
    declarations: [
        TopbarComponent,
        SidebarComponent,
        FooterComponent,
        MenuComponent,
        MenuitemComponent,
        MenuitemComponent,
        LoadingComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        DialogModule,
        ButtonModule,
        ProgressSpinnerModule
    ],
    exports: [
        TopbarComponent,
        SidebarComponent,
        FooterComponent,
        MenuComponent,
        MenuitemComponent,
        LoadingComponent
    ],
})
export class ComponentsModule {}
