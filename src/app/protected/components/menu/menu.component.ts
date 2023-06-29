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
                    {
                        label: 'Auth',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Login',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login'],
                            },
                            {
                                label: 'Error',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error'],
                            },
                            {
                                label: 'Access Denied',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/auth/access'],
                            },
                        ],
                    },
                ],
            },
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Landing',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/landing'],
                    },
                    {
                        label: 'Auth',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Login',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login'],
                            },
                            {
                                label: 'Error',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error'],
                            },
                            {
                                label: 'Access Denied',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/auth/access'],
                            },
                        ],
                    },
                    {
                        label: 'Crud',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/pages/crud'],
                    },
                    {
                        label: 'Timeline',
                        icon: 'pi pi-fw pi-calendar',
                        routerLink: ['/pages/timeline'],
                    },
                    {
                        label: 'Not Found',
                        icon: 'pi pi-fw pi-exclamation-circle',
                        routerLink: ['/notfound'],
                    },
                    {
                        label: 'Empty',
                        icon: 'pi pi-fw pi-circle-off',
                        routerLink: ['/pages/empty'],
                    },
                ],
            },
            {
                label: 'Hierarchy',
                items: [
                    {
                        label: 'Submenu 1',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 1.1',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {
                                        label: 'Submenu 1.1.1',
                                        icon: 'pi pi-fw pi-bookmark',
                                    },
                                    {
                                        label: 'Submenu 1.1.2',
                                        icon: 'pi pi-fw pi-bookmark',
                                    },
                                    {
                                        label: 'Submenu 1.1.3',
                                        icon: 'pi pi-fw pi-bookmark',
                                    },
                                ],
                            },
                            {
                                label: 'Submenu 1.2',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {
                                        label: 'Submenu 1.2.1',
                                        icon: 'pi pi-fw pi-bookmark',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        label: 'Submenu 2',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 2.1',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {
                                        label: 'Submenu 2.1.1',
                                        icon: 'pi pi-fw pi-bookmark',
                                    },
                                    {
                                        label: 'Submenu 2.1.2',
                                        icon: 'pi pi-fw pi-bookmark',
                                    },
                                ],
                            },
                            {
                                label: 'Submenu 2.2',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {
                                        label: 'Submenu 2.2.1',
                                        icon: 'pi pi-fw pi-bookmark',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ];
    }
}
