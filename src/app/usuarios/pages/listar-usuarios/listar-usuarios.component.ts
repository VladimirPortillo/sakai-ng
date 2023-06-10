import { Component } from '@angular/core';
import { Usuarios } from '../../interfaces/usuario';
import { UsuariosService } from '../../services/usuarios.service';
import { formatDate } from '@angular/common';
import { Roles } from 'src/app/roles/interfaces/roles';
import { RolesService } from '../../../roles/services/roles.service';


@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.scss']
})
export class ListarUsuariosComponent {
  roles:Roles[]=[];
  usuarios:Usuarios[]=[]; 
  constructor(private usuariosService:UsuariosService,private rolesService:RolesService){
  }
  ngOnInit():void{
    this.usuariosService.getUsuarios().subscribe(usuarios=>{    
      this.usuarios=usuarios;
    } )
  }
      //agregar usuario
       fecha = formatDate(new Date(), '1990-10-11', 'en-US')
      visible_agregar: boolean=false;
      verAgregarUsuario(){
        this.visible_agregar=true;
        this.rolesService.getRoles().subscribe(roles=>{
          this.roles=roles;
          console.log(roles)
       })
      }
      usuario:Usuarios={
        nombre:'',
        ap:'',
        am:'',
        ci:0,
        fecha_nac:new Date('11-09-1990'),
        usuario:'',
        contrasena:'',
        estado:1,
        id_rol:1
      }
      guardar(){
        console.log(this.usuario)
        if(this.usuario.nombre.trim().length===0){
          return;
        }
        this.usuariosService.agregarUsuario(this.usuario).subscribe(resp=>{})
        this.visible_agregar=false;
        this.usuariosService.getUsuarios().subscribe(usuarios=>{
          this.usuarios=usuarios;
        })
      }
      cerraragregarUsuario() {
        this.visible_agregar=false;
      }
      //ver usuario
    visible:boolean=false;
    ver_usuario!:Usuarios;
    verUsuario(id_usuario:number){
      // console.log(id_rol)
      console.log('ver rol0',this.ver_usuario)
      this.visible=true;
      console.log("entra");
      this.usuariosService.verUsuario(id_usuario).subscribe(usuarios=>{
        this.ver_usuario=usuarios.data[0];
     })
    }
  
    cerrarVerUsuario() {
      this.visible=false;
      this.ver_usuario!= undefined
    } 
  //Eliminar usuario
  visible_eliminar: boolean=false;
  verEliminarUsuario(id_usuario:number){
    this.visible_eliminar=true;
    this.usuariosService.verUsuario(id_usuario).subscribe(usuarios=>{
      this.ver_usuario=usuarios.data[0];
    })
  }
  eliminarUsuario(id_usuario:any){
    console.log(id_usuario)
    this.usuariosService.eliminarUsuario(id_usuario).subscribe(usuarios=>{})
    this.visible_eliminar=false;
    this.usuariosService.getUsuarios().subscribe(usuarios=>{
    this.usuarios=usuarios;
    })
  }
  cerrarElimiarUsuario() {
    this.visible_eliminar=false;
    
  }
  //Habilitar usuario
  visible_habilitar: boolean=false;
  verHabilitarUsuario(id_usuario:number){
    this.visible_habilitar=true;
    this.usuariosService.verUsuario(id_usuario).subscribe(usuarios=>{
      this.ver_usuario=usuarios.data[0];
    })
  }
  habilitarUsuario(id_usuario:any){
    this.usuariosService.habilitarUsuario(id_usuario).subscribe()
    this.visible_habilitar=false;
    this.usuariosService.getUsuarios().subscribe(usuarios=>{
    this.usuarios=usuarios;
    })
  }
  cerrarHabilitarUsuario() {
    this.visible_habilitar=false;
    
  }

}
