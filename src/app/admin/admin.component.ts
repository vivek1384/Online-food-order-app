import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { ChatMessage, Item, Restaurant, User } from '../app.component';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [FormsModule, RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  service = inject(AdminService);
  router = inject(Router);

  data: Item = new Item();
  dataList: Item[] = [];
  dataList2: Item[] = [];

  isTrue = false;
  isShow = true;
  userId = localStorage.getItem('adminId')?.toString();
  email = '';
  user: User = new User();
  resData: Restaurant = new Restaurant();

  ngOnInit(): void {
    if (this.dataList.length == 0) {
      this.isTrue = true;
    }
    this.getUser();
    setTimeout(() => {
      this.getResdata();
    }, 100);
    setTimeout(() => {
      this.getItemListbyRes();
      this.getChatList()
    }, 110);
    setInterval(() => {
      this.getChatList()
    }, 150);
  }

  getItemListbyRes() {
    this.service.getItembyRes(this.resData.name).subscribe((Res) => {
      if (Res) {
        this.dataList = Res;
      }
    });
  }

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
  getResdata() {
    this.service.getResdata(this.email).subscribe((res) => {
      if (res.length == 1) {
        this.resData = res[0];
        // console.log(this.resData)
      }
    });
  }

  logout() {
    let isDel = confirm('Are you sure?');
    if (isDel) {
      localStorage.removeItem('adminId');
      this.router.navigate(['admin-login']);
    }
  }

  addItem(data: Item) {
    if (!data.name || !data.price || !data.type) {
      alert('Please fill all fields.');
      console.log(data);
    } else if (data.name && data.price && data.type) {
      data.resName = this.resData.name;
      this.service.addItem(data).subscribe((res) => {
        if (res) {
          this.data = new Item();
          alert('Item added successfully!');
          this.getItemListbyRes()
        }
      });
    }
  }

  punjabi() {
    this.dataList2 = this.dataList.filter((item) =>
      item.type.toLowerCase().includes('punjabi')
    );
    this.isTrue = false;
    // this.service.punjabi().subscribe((res) => {
    //   if (res) {
    //     this.isTrue = false;
    //     this.dataList = res;
    //   }
    // });
  }

  chatList: ChatMessage[] =[]
  chatNumber = 0
  getChatList() {
    this.service.getCharMessage(this.resData.name).subscribe((res)=>{
      if(res){
        this.chatNumber = res.length;
      }
    })
  }

  chinese() {
    this.dataList2 = this.dataList.filter((item) =>
      item.type.toLowerCase().includes('chinese')
    );
    this.isTrue = false;
  }
  southIndian() {
    this.dataList2 = this.dataList.filter((item) =>
      item.type.toLowerCase().includes('south')
    );
    this.isTrue = false;
  }
  special() {
    this.dataList2 = this.dataList.filter((item) =>
      item.type.toLowerCase().includes('special')
    );
    this.isTrue = false;
  }
  combo() {
    this.dataList2 = this.dataList.filter((item) =>
      item.type.toLowerCase().includes('combo')
    );
    this.isTrue = false;
  }
  coldDrink() {
    this.dataList2 = this.dataList.filter((item) =>
      item.type.toLowerCase().includes('drink')
    );
    this.isTrue = false;
  }
  extra() {
    this.dataList2 = this.dataList.filter((item) =>
      item.type.toLowerCase().includes('extra')
    );
    this.isTrue = false;
  }

  onEdit(data: Item) {
    this.data = data;
    this.isShow = false;
  }

  updateItem(id: any, data: Item) {
    this.service.updateItem(id, data).subscribe((res) => {
      if (res) {
        this.data = new Item();
        this.isShow = true;
      }
    });
  }
  delete(id: any) {
    let isDel = confirm('Are you sure?');
    if (isDel) {
      this.service.delete(id).subscribe((res) => {
        if (res) {
          this.isTrue = true;
          this.dataList = [];
        }
      });
    }
  }
}
