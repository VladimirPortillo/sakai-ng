import { Component } from '@angular/core';
import { Roles } from '../../interfaces/roles';
import { Usuarios } from '../../interfaces/usuarios';
import { UsuariosService } from '../../services/usuarios.service';
import { RolesService } from '../../services/roles.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {
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
        id_usuario:null,
        nombre:null,
        ap:null,
        am:null,
        ci:null,
        fecha_nac:null,
        usuario:null,
        contrasena:null,
        estado:1,
        id_rol:0
      }
      // usuario:Usuarios?=null;
      usuariorol:Roles={
        id_rol:0,
        nombre:'',
        estado:1

      };
      guardar(){
        console.log(this.usuariorol);
        console.log(this.usuariorol.id_rol);
        this.usuario.id_rol!=this.usuariorol.id_rol;
        console.log(this.usuario);

        // if(this.usuario.nombre.trim().length===0){
        //   return;
        // }
        // this.usuariosService.agregarUsuario(this.usuario).subscribe(resp=>{})
        // this.visible_agregar=false;
        // this.usuariosService.getUsuarios().subscribe(usuarios=>{
        //   this.usuarios=usuarios;
        // })
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
