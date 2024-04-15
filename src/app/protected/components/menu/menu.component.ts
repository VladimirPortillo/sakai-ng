import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../services/layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Inicio',
                items: [
                    {
                        label: 'Dato general del municipio',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/index'],
                    },
                ],
            },
            {
                label: 'Menus',
                icon: 'pi pi-fw pi-microsoft',
                items: [
                    {
                        label: 'Administrar Roles',
                        icon: 'pi pi-fw pi-microsoft',
                        routerLink: ['roles'], //   /index/roles
                    },
                    {
                        label: 'Administrar Actividades',
                        icon: 'pi pi-fw pi-microsoft',
                        routerLink: ['actividades'], //   /index/actividades
                    },
                    {
                        label: 'Administrar Menus',
                        icon: 'pi pi-fw pi-microsoft',
                        routerLink: ['menus'], //   /index/actividades
                    },
                    {
                        label: 'Administrar Usuarios',
                        icon: 'pi pi-fw pi-microsoft',
                        routerLink: ['usuarios'], //   /index/actividades
                    },
                    {
                        label: 'Administrar Comunidades',
                        icon: 'pi pi-fw pi-microsoft',
                        routerLink: ['comunidades'], //   /index/actividades
                    },
                    {
                        label: 'Administrar Atractivos Turisticos',
                        icon: 'pi pi-fw pi-microsoft',
                        routerLink: ['atractivos'], //   /index/actividades
                    },
                    {
                        label: 'Administrar Hoteles',
                        icon: 'pi pi-fw pi-microsoft',
                        routerLink: ['hoteles'], //   /index/actividades
                    },
                    {
                        label: 'Administrar Restaurantes',
                        icon: 'pi pi-fw pi-microsoft',
                        routerLink: ['restaurantes'], //   /index/actividades
                    },
                    {
                        label: 'Administrar Gastronomias',
                        icon: 'pi pi-fw pi-microsoft',
                        routerLink: ['gastronomias'], //   /index/actividades
                    },
                ],
            },
        ];
    }
}
