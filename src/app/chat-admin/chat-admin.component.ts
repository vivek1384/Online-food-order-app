import { Component, inject, OnInit } from '@angular/core';
import { ChatMessage, Restaurant, User } from '../app.component';
import { AdminService } from '../admin.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-chat-admin',
  imports: [ RouterLink ],
  templateUrl: './chat-admin.component.html',
  styleUrl: './chat-admin.component.css'
})
export class ChatAdminComponent implements OnInit {

  ngOnInit(): void {
      this.getUser()
      setTimeout(() => {
        this.getChatList()
      }, 50);
      setInterval(() => {
        this.getChatList()
      }, 5000);
  }

  chat : ChatMessage = new ChatMessage()
  chatList : ChatMessage[] = []

  service = inject(AdminService)
  router = inject(Router)
  user : User = new User()
  resData : Restaurant = new Restaurant()

  getUser(){
    this.service.getUser(localStorage.getItem('adminId')).subscribe((res)=>{
      if(res){
        this.service.getResdata(res.email).subscribe((result)=>{
          if(result){
            this.resData = result[0];
          }
        })
      }
    })
  }

  getChatList(){
    this.service.getCharMessage(this.resData.name).subscribe((res)=>{
      if(res){
        this.chatList = res;
      }
    })
  }

  logout() {
    let isDel = confirm('Are you sure?');
    if (isDel) {
      localStorage.removeItem('id');
      this.router.navigate(['login']);
    }
  }
  delete(id:any){
    let isDel = confirm("Are you sure?")
    if(isDel){
      this.service.deleteMessage(id).subscribe((res)=>{
        if(res)[
          this.getChatList()
        ]
      })
    }
  }

}
