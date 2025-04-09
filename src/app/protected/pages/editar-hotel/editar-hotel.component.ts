import { Component } from '@angular/core';
import { ComunidadesService } from '../../services/comunidades.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotelesService } from '../../services/hoteles.service';
import { Comunidades, Multimedia } from '../../interfaces/comunidades';
import { Hoteles } from '../../interfaces/hoteles';
import { environment } from 'src/environments/environment';
import { DataMaps } from '../../interfaces/maps';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UploadEvent } from '../../interfaces/imagenes';

const url = environment.urlApi;
const rutaPublic = environment.rutaPublic;

@Component({
  selector: 'app-editar-hotel',
  templateUrl: './editar-hotel.component.html',
  styleUrls: ['./editar-hotel.component.scss']
})
export class EditarHotelComponent {

  datosCoordenada: string = '';

  urlPublic = url + rutaPublic;
  
   hotel!: Hoteles;
  id_hotel=0;
  comunidades: Comunidades[] = [];
  comunidad!: Comunidades;
  coordenadas!: DataMaps;
  loading: boolean = true;
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
      private route:ActivatedRoute,
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
          this.getHoteles();
      });
  }
  getHoteles(){
    this.route.paramMap.subscribe(params => {
      this.id_hotel = +params.get('id_hotel')!; // Convertir a número
      //console.log('ID Comunidad:', this.id_comunidad);
      this.hotelesService.verHotel(this.id_hotel).subscribe((resp) => {
        console.log('hotel', resp);
        this.hotel = resp.data;
        this.cargarDatos();
      }); 
    });
  }
  coordenadasMapa(coordenadas: DataMaps) {
    console.log('retorno datos mapa', coordenadas);
    this.miFormulario.patchValue({ubicacion : JSON.stringify(coordenadas)});
    this.datosCoordenada = 'Longitud: ' + coordenadas.longitud + ', Latitud: ' + coordenadas.latitud;
  }

  cargarDatos() {
    this.coordenadas = {
      longitud: this.hotel.longitud,
      latitud: this.hotel.latitud
    }
      
          this.miFormulario.controls['nombre'].setValue(this.hotel.nombre);
          this.miFormulario.controls['descripcion'].setValue(this.hotel.descripcion);
          this.miFormulario.controls['direccion'].setValue(this.hotel.direccion);
          this.miFormulario.controls['estrellas'].setValue(this.hotel.estrellas);
          this.miFormulario.controls['telefono'].setValue(this.hotel.telefono);
          this.miFormulario.controls['garaje'].setValue(this.hotel.garaje);
          this.miFormulario.controls['alimentacion'].setValue(this.hotel.alimentacion);
          this.miFormulario.controls['aire_acondicionado'].setValue(this.hotel.aire_acondicionado);
          this.miFormulario.controls['comunidad'].setValue(this.buscarComunidad());
          this.miFormulario.controls['ubicacion'].setValue(JSON.stringify(this.coordenadas));
    this.miFormulario.controls['multimedia'].setValue(this.hotel.multimedias.length);
    this.datosCoordenada = 'Longitud: ' + this.hotel.longitud + ', Latitud: ' + this.hotel.latitud;

    this.hotel.multimedias?.map(m => m.eliminar = false);

    this.loading = false;
      
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


  guardar() {
    const cantMulti = this.hotel.multimedias.filter(m => m.eliminar === false).length + this.filesMulti.length
    this.miFormulario.patchValue({multimedia : cantMulti});
      console.log('miFormulario', this.miFormulario.value);
      if (this.miFormulario.invalid) {
          this.miFormulario.markAllAsTouched();
          return;
      }
      
          this.editarHotel();
      
  }

  editarHotel() {
    const coordenadas: DataMaps = JSON.parse(this.miFormulario.value.ubicacion);
      this.hotel.nombre = this.miFormulario.value.nombre;
      this.hotel.descripcion = this.miFormulario.value.descripcion;
      this.hotel.direccion = this.miFormulario.value.direccion;
      this.hotel.estrellas=this.miFormulario.value.estrellas;
      this.hotel.telefono=this.miFormulario.value.telefono;
      this.hotel.garaje = this.miFormulario.value.garaje;
      this.hotel.alimentacion=this.miFormulario.value.alimentacion;
      this.hotel.aire_acondicionado=this.miFormulario.value.aire_acondicionado;
      this.hotel.longitud = coordenadas.longitud;
      this.hotel.latitud = coordenadas.latitud;
      this.hotel.estado = 1;
      this.hotel.id_comunidad = this.miFormulario.value.comunidad.id_comunidad;
      console.log('hotel--', this.hotel);

      this.hotelesService.editarHotelCompleto(this.hotel, this.filesMulti).subscribe(resp => {
        console.log('Editar hotel:', resp);
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


  elimarImage(multimediaEliminado: Multimedia) {

    console.log('imagen eliminada => ', multimediaEliminado);

    this.hotel.multimedias?.map(m => {
      if(m.id_multimedia === multimediaEliminado.id_multimedia) {
        m.eliminar = true;
      }
    });

    console.log('eliminar multimedia comunidad', this.hotel);    

  }

}
