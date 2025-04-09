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
import { TipoActividadesComponent } from './pages/tipo-actividades/tipo-actividades.component';
import { PdfReportComponent } from './pages/pdf-report/pdf-report.component';
import { AgregarComunidadComponent } from './pages/agregar-comunidad/agregar-comunidad.component';
import { AgregarActividadComponent } from './pages/agregar-actividad/agregar-actividad.component';
import { AgregarAtractivoComponent } from './pages/agregar-atractivo/agregar-atractivo.component';
import { AgregarHotelComponent } from './pages/agregar-hotel/agregar-hotel.component';
import { AgregarRestauranteComponent } from './pages/agregar-restaurante/agregar-restaurante.component';
import { AgregarGastronomiaComponent } from './pages/agregar-gastronomia/agregar-gastronomia.component';
import { EditarComunidadComponent } from './pages/editar-comunidad/editar-comunidad.component';
import { EditarAtractivoComponent } from './pages/editar-atractivo/editar-atractivo.component';
import { EditarRestauranteComponent } from './pages/editar-restaurante/editar-restaurante.component';
import { EditarActividadComponent } from './pages/editar-actividad/editar-actividad.component';
import { EditarHotelComponent } from './pages/editar-hotel/editar-hotel.component';
import { VerComunidadComponent } from './pages/ver-comunidad/ver-comunidad.component';
import { VerActividadComponent } from './pages/ver-actividad/ver-actividad.component';
import { VerRestauranteComponent } from './pages/ver-restaurante/ver-restaurante.component';
import { VerAtractivoComponent } from './pages/ver-atractivo/ver-atractivo.component';
import { VerHotelComponent } from './pages/ver-hotel/ver-hotel.component';
import { EditarGastronomiaComponent } from './pages/editar-gastronomia/editar-gastronomia.component';
import { VerGastronomiaComponent } from './pages/ver-gastronomia/ver-gastronomia.component';

const routes: Routes = [
    {
        path: '',
        component: IndexComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'roles', component: RolesComponent },
            { path: 'actividades', component: ActividadesComponent },
            { path: 'actividades/agregar', component: AgregarActividadComponent },
            { path: 'actividades/editar/:id_actividad', component: EditarActividadComponent },
            { path: 'actividades/ver/:id_actividad', component: VerActividadComponent },
            { path: 'menus', component: MenusComponent },
            { path: 'usuarios', component: UsuariosComponent },
            { path: 'comunidades', component: ComunidadesComponent },
            { path: 'comunidades/agregar', component: AgregarComunidadComponent },
            { path: 'comunidades/ver/:id_comunidad', component: VerComunidadComponent },
            { path: 'comunidades/editar/:id_comunidad', component: EditarComunidadComponent },
            { path: 'atractivos', component: AtractivosComponent },
            { path: 'atractivos/agregar', component: AgregarAtractivoComponent },
            { path: 'atractivos/editar/:id_atractivo', component: EditarAtractivoComponent },
            { path: 'atractivos/ver/:id_atractivo', component: VerAtractivoComponent },
            { path: 'hoteles', component: HotelesComponent },
            { path: 'hoteles/agregar', component: AgregarHotelComponent },
            { path: 'hoteles/editar/:id_hotel', component: EditarHotelComponent },
            { path: 'hoteles/ver/:id_hotel', component: VerHotelComponent },
            { path: 'restaurantes', component: RestaurantesComponent },
            { path: 'restaurantes/agregar', component: AgregarRestauranteComponent },
            { path: 'restaurantes/editar/:id_restaurante', component: EditarRestauranteComponent },
            { path: 'restaurantes/ver/:id_restaurante', component: VerRestauranteComponent },
            { path: 'gastronomias', component: GastronomiasComponent },
            { path: 'gastronomias/agregar', component: AgregarGastronomiaComponent },
            { path: 'gastronomias/editar/:id_gastronomia', component: EditarGastronomiaComponent },
            { path: 'gastronomias/ver/:id_gastronomia', component: VerGastronomiaComponent },
            { path: 'tipoActividades', component: TipoActividadesComponent },
            { path: 'pdfReportes', component: PdfReportComponent },
            { path: '**', redirectTo: '' },
        ],
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
