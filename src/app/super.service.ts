import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Item, Order, Restaurant, User } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class SuperService {

  http = inject(HttpClient)

  getUsers(){
    return this.http.get<User[]>("http://localhost:3000/user?admin=false")
  }
  getAdmins(){
    return this.http.get<User[]>("http://localhost:3000/user?admin=true")
  }
  getItems(){
    return this.http.get<Item[]>("http://localhost:3000/item")
  }
  getOrders(){
    return this.http.get<Order[]>("http://localhost:3000/order")
  }
  getRes(){
    return this.http.get<Restaurant[]>("http://localhost:3000/restaurant")
  }
  deleteUser(id:any){
    return this.http.delete("http://localhost:3000/user/"+id)
  }
  deleteItem(id:any){
    return this.http.delete("http://localhost:3000/item/"+id)
  }
  deleteOrder(id:any){
    return this.http.delete("http://localhost:3000/order/"+id)
  }
  deleteRes(id:any){
    return this.http.delete("http://localhost:3000/restaurant/"+id)
  }
  updateUser(id:any, data:User){
    return this.http.put("http://localhost:3000/user/"+id, data)
  }
  updateItem(id:any, data:Item){
    return this.http.put("http://localhost:3000/item/"+id, data)
  }
  updateRes(i:any, d:Restaurant){
    return this.http.put("http://localhost:3000/restaurant/"+i, d )
  }

  constructor() { }
}
