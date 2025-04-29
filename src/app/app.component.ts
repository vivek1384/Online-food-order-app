import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Menu';
}


export class Item {
  name: string;
  price: string;
  type: string;
  id: any;
  number : any
  totalPrice : any; 
  resName: string
  constructor() {
    this.name = '';
    this.price = '';
    this.type = '';
    this.number = '1'
    this.id = undefined;
    this.resName = ''
  }
}

export class orderItem{
  name: string;
  price: any;
  type: string;
  number: any;
  id:any;
  totalPrice : any
  userId: any
  resName: string
  constructor(){
    this.name = ''
    this.price = ''
    this.type = ''
    this.number = ''
    this.totalPrice = ''
    this.id = undefined;
    this.resName = ''
  }
}

export class Order{
  name: string;
  totalPrice : any;
  item: orderItem[];
  id: any
  delivered : boolean
  userId: any
  message: string
  message2: string
  resName: string
  constructor(){
    this.name = ''
    this.totalPrice = ''
    this.item = []
    this.id = undefined;
    this.delivered = false
    this.userId = ''
    this.message = 'Delivering'
    this.message2 = ''
    this.resName = ''
  }
}
export class ChatMessage{
  name: string;
  orderId: any
  id: any
  userId: any
  chatmessage : string
  resName: string
  constructor(){
    this.name = ''
    this.id = undefined;
    this.orderId = undefined
    this.userId = ''
    this.chatmessage = ''
    this.resName = ''
  }
}

export class Restaurant{
  name: string;
  mono: string;
  email: string;
  id: any;
  userId: string
  constructor(){
    this.name = ''
    this.mono = ''
    this.email = ''
    this.id = undefined;
    this.userId = ''
  }
}

export class User{
  name: string;
  email: string;
  password: string;
  id:any;
  admin : boolean
  constructor(){
    this.name = ''
    this.email = ''
    this.password = ''
    this.id = undefined
    this.admin = false;
  }
}

export class Rating{
  id : any;
  userId : any;
  rating : string;
  userName : string;
  resName: string;
  orderId:any
  constructor(){
    this.rating = '';
    this.userName = '';
    this.id = undefined;
    this.userId = undefined;
    this.resName = ''
  }
}