import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Menus } from '../interfaces/menus';

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
  editarMenu(menu:Menus, id_menu: any){
    return this.http.put<Menus[]>(
        `http://localhost:3000/api/updateMenu/${id_menu}`,
        menu
    );
  }
  verMenu(id_menu:number){
    return this.http.get<any>('http://localhost:3000/api/verMenu/'+id_menu);
  }
  eliminarMenu(id_menu:any){
    return this.http.delete<any>('http://localhost:3000/api/deleteMenu/'+id_menu);
  }
  habilitarMenu(id_menu:any){
    return this.http.get<any>('http://localhost:3000/api/habilitarMenu/'+id_menu);
  }
}
