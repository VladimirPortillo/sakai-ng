import { Component, Input } from '@angular/core';
import { ComunidadesService } from '../../services/comunidades.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AtractivosService } from '../../services/atractivos.service';
import { Comunidades, Multimedia } from '../../interfaces/comunidades';
import { Atractivos_turisticos } from '../../interfaces/atractivos';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DataMaps } from '../../interfaces/maps';
import { environment } from 'src/environments/environment';
import { UploadEvent } from '../../interfaces/imagenes';

const url = environment.urlApi;
const rutaPublic = environment.rutaPublic;

@Component({
  selector: 'app-editar-atractivo',
  templateUrl: './editar-atractivo.component.html',
  styleUrls: ['./editar-atractivo.component.scss']
})
export class EditarAtractivoComponent {
  
  atractivo!: Atractivos_turisticos;

  urlPublic = url + rutaPublic;
  
  datosCoordenada: string = '';
  comunidades: Comunidades[] = [];
  comunidad!: Comunidades;
  id_atractivo:number=0;
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
      comunidad: ['', [Validators.required]],
      ubicacion: ['', [Validators.required]],
      multimedia: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
  });

  constructor(
      private comunidadesService: ComunidadesService,
      private fb: FormBuilder,
      private atractivosService: AtractivosService,
      private router:Router,
      private route:ActivatedRoute
  ) {}

  ngOnInit() {
    this.getComunidades() //si necesitas comunidades tiene que ir igual en secuencia     
  }
  getComunidades(){
    this.comunidadesService.getComunidades().subscribe((comunidades) => {
      this.comunidades = comunidades;
      this.getAtractivo();
    });
  }

  getAtractivo(){
    this.route.paramMap.subscribe(params => {
      this.id_atractivo = +params.get('id_atractivo')!;
      console.log('id atractivo=',this.id_atractivo);
      this.atractivosService.verAtractivo(this.id_atractivo).subscribe((resp) => {
        console.log('atractivo:', resp.data);
        this.atractivo = resp.data;
        this.cargarDatos();
      })
    }); 
  }

  coordenadasMapa(coordenadas: DataMaps) {
    console.log('retorno datos mapa', coordenadas);
    this.miFormulario.patchValue({ubicacion : JSON.stringify(coordenadas)});
    this.datosCoordenada = 'Longitud: ' + coordenadas.longitud + ', Latitud: ' + coordenadas.latitud;
  }
  
  cargarDatos() {
    console.log('entro cargar datos:',this.atractivo);
    this.coordenadas = {
        longitud: this.atractivo.longitud,
        latitud: this.atractivo.latitud
      }
          this.miFormulario.controls['nombre'].setValue(this.atractivo.nombre);
          this.miFormulario.controls['descripcion'].setValue(this.atractivo.descripcion);
          this.miFormulario.controls['direccion'].setValue(this.atractivo.direccion);
          this.miFormulario.controls['comunidad'].setValue(this.buscarComunidad()); 
          this.miFormulario.controls['ubicacion'].setValue(JSON.stringify(this.coordenadas));
          this.miFormulario.controls['multimedia'].setValue(this.atractivo.multimedias.length);
          this.datosCoordenada = 'Longitud: ' + this.atractivo.longitud + ', Latitud: ' + this.atractivo.latitud;
          this.atractivo.multimedias?.map(m => m.eliminar = false);
    
          this.loading = false;
  }

  buscarComunidad() {
      return this.comunidades.find((comunidad) => comunidad.id_comunidad == this.atractivo.id_comunidad);
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
    const cantMulti = this.atractivo.multimedias.filter(m => m.eliminar === false).length + this.filesMulti.length
    this.miFormulario.patchValue({multimedia : cantMulti});
      console.log('miFormulario', this.miFormulario.value);
      if (this.miFormulario.invalid) {
          this.miFormulario.markAllAsTouched();
          return;
      }
      this.editarAtractivo();
      //this.miFormulario.reset();
  }

  editarAtractivo() {
    const coordenadas: DataMaps = JSON.parse(this.miFormulario.value.ubicacion);

      this.atractivo.nombre = this.miFormulario.value.nombre;
      this.atractivo.descripcion = this.miFormulario.value.descripcion;
      this.atractivo.direccion = this.miFormulario.value.direccion;
      this.atractivo.longitud = coordenadas.longitud;
      this.atractivo.latitud = coordenadas.latitud;
      this.atractivo.estado = 1;
      this.atractivo.id_comunidad = this.miFormulario.value.comunidad.id_comunidad;
      console.log('usuario', this.atractivo);

      this.atractivosService.editarAtractivoCompleto(this.atractivo, this.filesMulti).subscribe(resp => {
        console.log('Editar atractivo', resp);
        if(resp.ok) {
          this.miFormulario.reset();
          this.datosCoordenada = '';
          this.filesMulti = [];
          this.router.navigate(['/index/atractivos']);
        }
      });
  }
  volver() {
    this.router.navigate(['/index/atractivos']);
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

    this.atractivo.multimedias?.map(m => {
      if(m.id_multimedia === multimediaEliminado.id_multimedia) {
        m.eliminar = true;
      }
    });

    console.log('eliminar multimedia comunidad', this.atractivo);    

  }
}
