import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './topbar/topbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { MenuitemComponent } from './menuitem/menuitem.component';
import { RouterModule } from '@angular/router';



@NgModule({
    declarations: [
        TopbarComponent,
        SidebarComponent,
        FooterComponent,
        MenuComponent,
        MenuitemComponent,
        MenuitemComponent,
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        TopbarComponent,
        SidebarComponent,
        FooterComponent,
        MenuComponent,
        MenuitemComponent,
    ],
})
export class ComponentsModule {}
