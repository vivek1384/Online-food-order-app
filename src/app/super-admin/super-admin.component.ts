import { Component, inject, OnInit } from '@angular/core';
import { SuperService } from '../super.service';
import { Item, Order, Restaurant, User } from '../app.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-super-admin',
  imports: [FormsModule],
  templateUrl: './super-admin.component.html',
  styleUrl: './super-admin.component.css',
})
export class SuperAdminComponent implements OnInit {
  ngOnInit(): void {
    this.getUserlist();
  }

  logout() {
    let isDel = confirm('Are you sure?');
    if (isDel) {
      localStorage.removeItem('adminId');
      this.router.navigate(['admin-login']);
    }
  }

  list: any;

  super = inject(SuperService);
  router = inject(Router);

  isUser = true;
  isItem = false;
  isOrder = false;
  isRes = false;
  isUserTrue = false;
  isItemTrue = false;
  isResTrue = false;

  searchList: any;

  searchName = '';
  searchId = '';

  isTrue = true;

  onChange1() {
    if (this.searchName == '') {
      this.searchList = [];
      this.isTrue = false;
    } else {
      this.searchId = '';
      this.isTrue = true;
      this.searchList = this.list.filter((item: any) =>
        item.name.toLowerCase().includes(this.searchName.toLowerCase())
      );
      // console.log(this.searchList)
      // console.log(this.list)
    }
  }
  onChange2() {
    if (this.searchId == '') {
      this.searchList = [];
      this.isTrue = false;
    } else {
      this.searchName = '';
      this.isTrue = true;
      this.searchList = this.list.filter((item: any) =>
        item.id.toLowerCase().includes(this.searchId.toLowerCase())
      );
      // console.log(this.searchList)
      // console.log(this.list)
    }
  }

  deleteSingle(data: any) {
    if (data.password) {
      this.deleteUser(data.id);
    } else if (data.resName) {
      this.deleteItem(data.id);
    } else if (data.mono) {
      this.deleteRes(data.id);
    }
    this.isTrue = false;
    this.searchList = [];
    this.searchName = '';
    this.searchId = '';
  }

  close() {
    this.isUserTrue = false;
    this.isItemTrue = false;
    this.isResTrue = false;
  }
  userEdit(item: User) {
    this.isUserTrue = true;
    this.user = item;
  }
  itemEdit(item: Item) {
    this.isItemTrue = true;
    this.item = item;
  }

  resEdit(item: Restaurant) {
    this.isResTrue = true;
    this.res = item;
  }
  deleteUser(id: any) {
    let isDel = confirm('Are you sure?');
    if (isDel) {
      this.super.deleteUser(id).subscribe((res) => {
        if (res) {
          this.getUserlist();
        }
      });
    }
  }
  deleteItem(id: any) {
    let isDel = confirm('Are you sure?');
    if (isDel) {
      this.super.deleteItem(id).subscribe((res) => {
        if (res) {
          this.getItemList();
        }
      });
    }
  }
  deleteOrder(id: any) {
    let isDel = confirm('Are you sure?');
    if (isDel) {
      this.super.deleteOrder(id).subscribe((res) => {
        if (res) {
          this.getOrderList();
        }
      });
    }
  }
  deleteRes(id: any) {
    let isDel = confirm('Are you sure?');
    if (isDel) {
      this.super.deleteRes(id).subscribe((res) => {
        if (res) {
          this.getResList();
        }
      });
    }
  }
  updateUser(id: any, data: User) {
    this.super.updateUser(id, data).subscribe((res) => {
      if (res) {
        this.close();
        this.getUserlist();
      }
    });
  }
  updateItem(id: any, data: Item) {
    this.super.updateItem(id, data).subscribe((res) => {
      if (res) {
        this.close();
        this.getItemList();
      }
    });
  }
  updateRes(i: any, d: Restaurant) {
    this.super.updateRes(i, d).subscribe((res) => {
      if (res) {
        this.close();
        this.getResList();
      }
    });
  }

  user: User = new User();
  userList: User[] = [];
  admin: User = new User();
  adminList: User[] = [];
  item: Item = new Item();
  itemList: Item[] = [];
  order: Order = new Order();
  orderList: Order[] = [];
  res: Restaurant = new Restaurant();
  resList: Restaurant[] = [];

  getUserlist() {
    this.isUser = true;
    this.isOrder = false;
    this.isRes = false;
    this.super.getUsers().subscribe((res) => {
      this.userList = res;
      this.list = this.userList;
    });
  }
  getAdminlist() {
    this.isUser = true;
    this.isOrder = false;
    this.isRes = false;
    this.isItem = false;
    this.super.getAdmins().subscribe((res) => {
      this.adminList = res;
      this.list = this.adminList;
    });
  }
  getItemList() {
    this.isUser = false;
    this.isItem = true;
    this.isOrder = false;
    this.isRes = false;
    this.super.getItems().subscribe((res) => {
      this.itemList = res;
      this.list = this.itemList;
    });
  }
  getOrderList() {
    this.isOrder = true;
    this.isUser = false;
    this.isRes = false;
    this.isItem = false;
    this.super.getOrders().subscribe((res) => {
      if (res) {
        this.orderList = res;
        this.list = this.orderList;
      }
    });
  }
  getResList() {
    this.isRes = true;
    this.isOrder = false;
    this.isUser = false;
    this.isItem = false;
    this.super.getRes().subscribe((res) => {
      if (res) {
        this.resList = res;
        this.list = this.resList;
      }
    });
  }
}
