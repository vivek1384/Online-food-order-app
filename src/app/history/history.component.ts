import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ChatMessage, Order, Rating } from '../app.component';
import { AdminService } from '../admin.service';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-history',
  imports: [RouterLink, FormsModule, FontAwesomeModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
})
export class HistoryComponent implements OnInit {
  ngOnInit(): void {
    this.getOrderList();
    setInterval(() => {
      this.getOrderList();
    }, 5000);
  }

  icon = faTrash;

  logout() {
    let isDel = confirm('Are you sure?');
    if (isDel) {
      localStorage.removeItem('id');
      this.router.navigate(['login']);
    }
  }

  service = inject(AdminService);
  router = inject(Router);

  orderList: Order[] = [];
  message = '';
  isShow = false;
  isShow2 = false;

  getOrderList() {
    this.service
      .getOrderlistbyUser(localStorage.getItem('id'))
      .subscribe((res) => {
        if (res) {
          this.orderList = res;
          for (let index = 0; index < this.orderList.length; index++) {
            if (this.orderList[index].delivered) {
              this.message = 'Yes';
              this.isShow = true;
            } else {
              this.message = 'Delivering';
            }
          }
        }
      });
  }
  rate(data: Order) {
    this.isShow2 = true;
    this.ratinData.orderId = data.id;
    this.ratinData.userId = data.userId;
    this.ratinData.resName = data.resName;
  }

  chatmessage : ChatMessage = new ChatMessage()
  message2 = ''
  chatData : Order = new Order()

  chatNow(data:Order){
    this.chatData = data;
    this.isShow3 = true
  }

  isShow3 = false
  chatNow2(){
    this.chatmessage.chatmessage = this.message2
    this.chatmessage.userId = this.chatData.userId
    this.chatmessage.name = this.chatData.name;
    this.chatmessage.orderId = this.chatData.id;
    this.chatmessage.resName = this.chatData.resName;
    this.service.addChatMessage(this.chatmessage).subscribe((Res)=>{
      if(Res){
        alert("Your message send to restaurant.")
        this.isShow3 = false;
      }
    })
  }

  ratinData: Rating = new Rating();

  onSubmit(data: Rating) {
    if (!this.ratinData.userName || !this.ratinData.rating) {
      alert('Please fill all the feild first.');
    } else if (this.ratinData.userName && this.ratinData.rating) {
      this.service.addRatings(data).subscribe((res) => {
        if (res) {
          alert('Thanks! For rating us.');
          this.isShow2 = false;
        }
      });
    }
  }

  close() {
    this.isShow2 = false;
  }

  deleteAll() {
    let isDel = confirm('Are you sure?');
    if (isDel) {
      for (let index = 0; index < this.orderList.length; index++) {
        this.service.deleteOrder(this.orderList[index].id).subscribe((res) => {
          if (res) {
            this.getOrderList();
          }
        });
      }
    }
  }
  order(data:Order){
    data.id = undefined
    data.delivered = false
    data.message = "Delivering"
    this.service.orderPlace(data).subscribe((res)=>{
      alert("Order reapeted.")
      this.getOrderList()
    })
  }
}
