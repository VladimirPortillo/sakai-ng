import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Menus } from '../interfaces/Menus';

@Injectable({
  providedIn: 'root'
})
export class MenusService {

  constructor(private http:HttpClient) { }
  getMenus(){
    return this.http.get<Menus[]>('http://localhost:3000/api/menus')
  }
  agregarMenu(menu:Menus){
    return this.http.post<Menus[]>('http://localhost:3000/api/createMenu',menu);
  }
  verMenu(id_menu:number){
    return this.http.get<any>('http://localhost:3000/api/verMenu/'+id_menu);
  }
  eliminarMenu(id_menu:number){
    return this.http.delete<any>('http://localhost:3000/api/deleteMenu/'+id_menu);
  }
  habilitarMenu(id_menu:number){
    return this.http.get<any>('http://localhost:3000/api/habilitarMenu/'+id_menu);
  }
  editarMenu(id_menu:number,menu:Menus){
    return this.http.put<any>('http://localhost:3000/api/updateMenu/'+id_menu,menu);
  }
}
