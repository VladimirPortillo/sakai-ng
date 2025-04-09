import { Component, Input } from '@angular/core';
import { HotelesService } from '../../services/hoteles.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComunidadesService } from '../../services/comunidades.service';
import { Comunidades } from '../../interfaces/comunidades';
import { Hoteles } from '../../interfaces/hoteles';
import { Router } from '@angular/router';
import { DataMaps } from '../../interfaces/maps';
import { UploadEvent } from '../../interfaces/imagenes';

@Component({
  selector: 'app-agregar-hotel',
  templateUrl: './agregar-hotel.component.html',
  styleUrls: ['./agregar-hotel.component.scss']
})
export class AgregarHotelComponent {
  @Input() hotel!: Hoteles;

  datosCoordenada: string = '';
  comunidades: Comunidades[] = [];
  comunidad!: Comunidades;
  miFormulario: FormGroup = this.fb.group({
      nombre: [
          '',
          [
              Validators.required,
              Validators.minLength(3) /* , Validators.maxLength(10) */,
          ],
      ],
      descripcion: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      estrellas: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      garaje: ['', [Validators.required]],
      alimentacion: ['', [Validators.required]],
      aire_acondicionado: ['', [Validators.required]],
      comunidad: ['', [Validators.required]],
      ubicacion: ['', [Validators.required]],
      multimedia: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
  });

  constructor(
      private comunidadesService: ComunidadesService,
      private fb: FormBuilder,
      private hotelesService: HotelesService,
      private router:Router
  ) {}

  ngOnInit() {
      console.log('modal usuario', this.hotel);
      this.getComunidades();
  }

  getComunidades() {
      this.comunidadesService.getComunidades().subscribe((comunidades) => {
          // console.log(roles);
          this.comunidades = comunidades;
      });
  }

  buscarComunidad() {
      return this.comunidades.find((comunidad) => comunidad.id_comunidad == this.hotel.id_comunidad);
  }

  campoEsValido(campo: string) {
      return (
          this.miFormulario.controls[campo].errors &&
          this.miFormulario.controls[campo].touched
      );
  }

  campoErrorMsg(campo: string) {
      console.log('ERRORS', this.miFormulario.controls[campo]?.errors);
      if (this.miFormulario.controls[campo]?.errors?.['required']) {
          return `Este campo es requerido.`;
      }
      if (this.miFormulario.controls[campo]?.errors?.['minlength']) {
          const value =
              this.miFormulario.controls[campo]?.errors?.['minlength']
                  .requiredLength;
          return `Este campo debe tener mínimo ${value} caracteres.`;
      }
      if (this.miFormulario.controls[campo]?.errors?.['maxlength']) {
          const value =
              this.miFormulario.controls[campo]?.errors?.['maxlength']
                  .requiredLength;
          return `Este campo debe tener máximo ${value} caracteres.`;
      }
      if (this.miFormulario.controls[campo]?.errors?.['min']) {
        return `Debe subir al menos 1 archivo y maximo 5 archivos.`;
      }
      if (this.miFormulario.controls[campo]?.errors?.['max']) {
        return `Debe subir al menos 1 archivo y maximo 5 archivos.`;
      }
      return;
  }

  coordenadasMapa(coordenadas: DataMaps) {
    console.log('retorno datos mapa', coordenadas);
    this.miFormulario.patchValue({ubicacion : JSON.stringify(coordenadas)});
    this.datosCoordenada = 'Longitud: ' + coordenadas.longitud + ', Latitud: ' + coordenadas.latitud;
  }

  guardar() {
      console.log('miFormulario', this.miFormulario.value);
      this.miFormulario.patchValue({multimedia : this.filesMulti.length});
      if (this.miFormulario.invalid) {
          this.miFormulario.markAllAsTouched();
          return;
      }
        this.agregarHotel();
  }
  

  agregarHotel() {
    const coordenadas: DataMaps = JSON.parse(this.miFormulario.value.ubicacion);
    const hotel:Hoteles={
      nombre: this.miFormulario.value.nombre,
      descripcion : this.miFormulario.value.descripcion,
      direccion : this.miFormulario.value.direccion,
      estrellas : this.miFormulario.value.estrellas,
      telefono : this.miFormulario.value.telefono,
      garaje : this.miFormulario.value.garaje,
      alimentacion : this.miFormulario.value.alimentacion,
      aire_acondicionado : this.miFormulario.value.aire_acondicionado,
      longitud : coordenadas.longitud,
      latitud : coordenadas.latitud,
      estado : 1,
      id_comunidad : this.miFormulario.value.comunidad.id_comunidad,
      multimedias:[]
      
    }
    this.hotelesService.agregarHotelCompleto(hotel, this.filesMulti).subscribe((resp) => {
      console.log('Guardar hotel', resp);
      if(resp.ok) {
        this.miFormulario.reset();
        this.datosCoordenada = '';
        this.filesMulti = [];
        this.router.navigate(['/index/hoteles']);
      }
    });
  }
  volver() {
    this.router.navigate(['/index/hoteles']);
  }

  //cargar imagenes
  autoUpload: boolean = true;
  uploadedFiles: any[] = [];
  onUpload(event: UploadEvent) {
    console.log('entra a onupload');
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
    console.log('image', this.uploadedFiles);
  }

  filesMulti: File[] = [];

  onSelectFiles(event: any) {
    this.filesMulti = event.currentFiles;
    this.miFormulario.patchValue({multimedia : this.filesMulti.length});    
  }
}
