import { Component } from '@angular/core';
import { Actividades } from '../../interfaces/actividades';
import { ActividadesService } from '../../services/actividades.service';

@Component({
    selector: 'app-actividades',
    templateUrl: './actividades.component.html',
    styleUrls: ['./actividades.component.scss'],
})
export class ActividadesComponent {
    actividades: Actividades[] = [];
    constructor(private actividadesService: ActividadesService) {}
    ngOnInit(): void {
        this.actividadesService.getActividades().subscribe((actividades) => {
            this.actividades = actividades;
        });
    }
}
