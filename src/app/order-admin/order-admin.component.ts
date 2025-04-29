import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ChatMessage, Order, Restaurant, User } from '../app.component';
import { AdminService } from '../admin.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-admin',
  imports: [RouterLink, FormsModule],
  templateUrl: './order-admin.component.html',
  styleUrl: './order-admin.component.css',
})
export class OrderAdminComponent implements OnInit {
  router = inject(Router);
  order: Order = new Order();
  orderList: Order[] = [];
  orderList2: Order[] = [];
  service = inject(AdminService);
  isShow = false;
  intervalId: any;
  resName: string = '';

  searchText = '';
  onChange() {
    if (this.searchText != '') {
      clearInterval(this.intervalId);
      this.orderList2 = this.orderList.filter((item) =>
        item.id.includes(this.searchText)
      );
      console.log(this.orderList);
      this.orderList = this.orderList2;
    } else {
      this.intervalId = setInterval(() => {
        this.getorderList();
      }, 1000);
      this.orderList2 = this.orderList;
    }
  }

  user: User = new User();
  userId = localStorage.getItem('adminId')
  resData : Restaurant = new Restaurant();
  email = ''

  getUser() {
    this.service.getUser(this.userId).subscribe((res) => {
      if (res) {
        this.user = res;
        this.email = res.email;
        // console.log(this.user)
        // console.log(this.email)
      }
    });
  }
  // getResdata() {
  //   this.service.getResdata(this.email).subscribe((res) => {
  //     if (res.length == 1) {
  //       this.resData = res[0];
  //       // console.log(this.resData)
  //     }
  //   });
  // }

  chatList: ChatMessage[] = [];
  chatNumber = 0;
  getChatList() {
    this.service.getCharMessage(this.resData.name).subscribe((res) => {
      if (res) {
        this.chatNumber = res.length;
      }
    });
  }

  getResData() {
    this.service.getUser(localStorage.getItem('adminId')).subscribe((res) => {
      if (res) {
        this.service.getResdata(res.email).subscribe((Res) => {
          if (Res.length == 1) {
            this.resName = Res[0].name;
          }
        });
      }
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.getorderList();
      this.getUser()
      this.getResData()
    }, 100);
    this.getResData();
    this.intervalId = setInterval(() => {
      this.getorderList();
      this.getChatList()
      // console.log(this.resName);
    }, 5000);
  }

  getorderList() {
    this.service.getOrderList(this.resName).subscribe((res) => {
      if (res.length == 0) {
        this.isShow = true;
      } else {
        this.orderList = res;
        this.isShow = false;
      }
    });
  }

  logout() {
    let isDel = confirm('Are you sure?');
    if (isDel) {
      localStorage.removeItem('id');
      console.log('hello');
      this.router.navigate(['login']);
    }
  }
  delivered(id: any, data: Order) {
    let isDel = confirm('Confirm delivered?');
    if (isDel) {
      data.delivered = true;
      data.message = 'Yes';
      this.service.delivered(id, data).subscribe((res) => {
        if (res) {
          this.getorderList();
          this.searchText = '';
        }
      });
    }
  }
}
