import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './pages/index/index.component';
import { HomeComponent } from './pages/home/home.component';
import { RolesComponent } from './pages/roles/roles.component';
import { ActividadesComponent } from './pages/actividades/actividades.component';
import { MenusComponent } from './pages/menus/menus.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ComunidadesComponent } from './pages/comunidades/comunidades.component';
import { AtractivosComponent } from './pages/atractivos/atractivos.component';
import { HotelesComponent } from './pages/hoteles/hoteles.component';
import { RestaurantesComponent } from './pages/restaurantes/restaurantes.component';
import { GastronomiasComponent } from './pages/gastronomias/gastronomias.component';

const routes: Routes = [
    {
        path: '',
        component: IndexComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'roles', component: RolesComponent },
            { path: 'actividades', component: ActividadesComponent },
            { path: 'menus', component: MenusComponent },
            { path: 'usuarios', component: UsuariosComponent },
            { path: 'comunidades', component: ComunidadesComponent },
            { path: 'atractivos', component: AtractivosComponent },
            { path: 'hoteles', component: HotelesComponent },
            { path: 'restaurantes', component: RestaurantesComponent },
            { path: 'gastronomias', component: GastronomiasComponent },
            { path: '**', redirectTo: '' },
        ],
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
