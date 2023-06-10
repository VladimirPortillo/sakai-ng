import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule }from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { DialogModule } from 'primeng/dialog';


import { LoginModule } from './login/login.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { RolesModule } from './roles/roles.module';
import { MenusModule } from './menus/menus.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ComunidadesModule } from './comunidades/comunidades.module';
import { HotelesModule } from './hoteles/hoteles.module';
import { RestaurantesModule } from './restaurantes/restaurantes.module';
import { AtractivosModule } from './atractivos/atractivos.module';
import { ActividadesModule } from './actividades/actividades.module';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        DialogModule,

        LoginModule,
        SharedModule,
        RolesModule,
        MenusModule,
        UsuariosModule,
        ComunidadesModule,
        HotelesModule,
        RestaurantesModule,
        AtractivosModule,
        ActividadesModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },   

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
