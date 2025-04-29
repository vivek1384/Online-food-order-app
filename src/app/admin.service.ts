import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ChatMessage, Item, Order, orderItem, Rating, Restaurant, User } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  http = inject(HttpClient)

  orderItemlist : orderItem[] = []
  id = localStorage.getItem('id')

  constructor() { }

  addItem(data:Item){
    return this.http.post("http://localhost:3000/item", data)
  }

  updateItem(id:any, data:Item){
    return this.http.put("http://localhost:3000/item/"+id, data)
  }

  punjabi(){
    return this.http.get<Item[]>("http://localhost:3000/item?type=Punjabi")
  }
  chinese(){
    return this.http.get<Item[]>("http://localhost:3000/item?type=Chinese")
  }
  southIndian(){
    return this.http.get<Item[]>("http://localhost:3000/item?type=South")
  }
  special(){
    return this.http.get<Item[]>("http://localhost:3000/item?type=Special")
  }
  combo(){
    return this.http.get<Item[]>("http://localhost:3000/item?type=Combo")
  }
  coldDrink(){
    return this.http.get<Item[]>("http://localhost:3000/item?type=Drink")
  }
  extra(){
    return this.http.get<Item[]>("http://localhost:3000/item?type=Extra")
  }
  delete(id:any){
    return this.http.delete("http://localhost:3000/item/"+id)
  }
  addOrderitem(data:orderItem){
    return this.http.post("http://localhost:3000/orderItem", data)
  }
  removeOrderitem(data:orderItem){
    return this.http.delete("http://localhost:3000/orderItem/"+data.id)
  }
  getOrderitem(){
    return this.http.get<orderItem[]>("http://localhost:3000/orderItem?userId="+this.id)
  }
  deleteAllitem(){
    this.getOrderitem().subscribe((res)=>{
      this.orderItemlist = res;
      // debugger
      for (let index = 0; index < this.orderItemlist.length; index++) {
        // debugger
        this.http.delete("http://localhost:3000/orderItem/"+this.orderItemlist[index].id).subscribe((res)=>{
          if(res){
            console.log("hi")        
          }
        })
      }
    })
  }
  orderPlace(data:Order){
    return this.http.post("http://localhost:3000/order", data)
  }
  getOrderList(name:string){
    return this.http.get<Order[]>("http://localhost:3000/order?delivered=false&resName="+name)
  }
  delivered(id:any, data:Order){
    return this.http.put("http://localhost:3000/order/"+id, data)
  }
  getOrderlistbyUser(id:any){
    return this.http.get<Order[]>("http://localhost:3000/order?userId="+id)
  }
  addRatings(data:Rating){
    return this.http.post("http://localhost:3000/rating", data)
  }
  deleteOrder(id:any){
    return this.http.delete("http://localhost:3000/order/"+id)
  }
  getUser(id:any){
    return this.http.get<User>("http://localhost:3000/user/"+id)
  }
  getResdata(mail:any){
    return this.http.get<Restaurant[]>("http://localhost:3000/restaurant?email="+mail)
  }
  
  getResList(){
    return this.http.get<Restaurant[]>("http://localhost:3000/restaurant")
  }
  getItembyRes(name:string){
    return this.http.get<Item[]>("http://localhost:3000/item?resName="+name)
  }
  getReviewList(name:string){
    return this.http.get<Rating[]>("http://localhost:3000/rating?resName="+name)
  }
  addChatMessage(chatMessage: ChatMessage){
    return this.http.post("http://localhost:3000/chat", chatMessage)
  }
  getCharMessage(name:any){
    return this.http.get<ChatMessage[]>("http://localhost:3000/chat?resName="+name)
  }
  deleteMessage(id:any){
    return this.http.delete("http://localhost:3000/chat/"+id)
  }
}
