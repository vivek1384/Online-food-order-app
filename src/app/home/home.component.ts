import { Component, inject, OnInit } from '@angular/core';
import { Item, Order, orderItem, Restaurant, User } from '../app.component';
import { AdminService } from '../admin.service';
import { UserService } from '../user.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [RouterLink, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    this.getOrderitem();
    setTimeout(() => {
      this.totalPrice();
      this.getUser();
    }, 50);
    this.getResList();
  }

  isShow2 = false;

  searchText = '';
  arr: any;

  onChange() {
    this.isShow2 = true;
    // console.log(this.searchText);

    this.arr = this.itemList.filter((item) =>
      item.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
    if (this.searchText == '') {
      this.arr = [];
      this.isShow2 = false;
    }
    // console.log(this.arr);
  }

  router = inject(Router);
  user: User = new User();
  service2 = inject(UserService);

  getUser() {
    this.service2.getUser(localStorage.getItem('id')).subscribe((res) => {
      if (res) {
        this.user = res;
      }
    });
  }

  getResList() {
    this.service.getResList().subscribe((res) => {
      if (res) {
        this.resList = res;
      }
    });
  }

  resName: string = '';
  getItemListbyRes(name: string) {
    this.itemList2 = [];
    this.isShow2 = false;
    this.searchText = '';
    this.arr = [];
    if (this.resName == '') {
      alert('Please select Restaurant first.');
    } else {
      this.service.getItembyRes(name).subscribe((Res) => {
        if (Res) {
          this.itemList = Res;
          this.itemList2 = Res;
        }
      });
    }
  }

  logout() {
    let isDel = confirm('Are you sure?');
    if (isDel) {
      localStorage.removeItem('id');
      this.router.navigate(['login']);
    }
  }
  finalTax = 0
  totalPrice() {
    this.finalTax = 0
    this.finalTotal = 0;
    // console.log("hi")
    for (let index = 0; index < this.orderItemlist.length; index++) {
      this.finalTotal = this.finalTotal + this.orderItemlist[index].totalPrice;
      this.totalNumber = this.totalNumber + (this.orderItemlist[index].number * 1)

    }
    this.finalTax = this.finalTotal * 18 / 100
    this.finalTotal = this.finalTotal + Math.floor(this.finalTax)
  }

  finalTotal = 0;

  itemList: Item[] = [];
  itemList2: Item[] = [];
  item: Item = new Item();
  itemNumber = 1;

  name = 'Vivek';

  orderItem: orderItem = new orderItem();
  orderItemlist: orderItem[] = [];

  service = inject(AdminService);
  resList: Restaurant[] = [];
  totalNumber = 0

  increment() {
    if (this.item.number < 5) {
      this.item.number++;
      this.itemNumber = this.item.number;
      // console.log(this.item.number);
    } else {
      this.itemNumber = this.itemNumber;
      this.itemNumber = this.item.number;
    }
  }
  decrement() {
    if (this.itemNumber > 1) {
      this.itemNumber--;
    }
  }
  punjabi() {
    this.itemList2 = this.itemList.filter((item) =>
      item.type.toLowerCase().includes('punjabi')
    );
    this.isShow2 = false;
    this.searchText = '';
  }
  chinese() {
    this.itemList2 = this.itemList.filter((item) =>
      item.type.toLowerCase().includes('chinese')
    );
    this.isShow2 = false;
    this.searchText = '';
  }
  southIndian() {
    this.itemList2 = this.itemList.filter((item) =>
      item.type.toLowerCase().includes('south')
    );
    this.isShow2 = false;
    this.searchText = '';
  }
  special() {
    this.itemList2 = this.itemList.filter((item) =>
      item.type.toLowerCase().includes('special')
    );
    this.isShow2 = false;
    this.searchText = '';
  }
  combo() {
    this.itemList2 = this.itemList.filter((item) =>
      item.type.toLowerCase().includes('combo')
    );
    this.isShow2 = false;
    this.searchText = '';
  }
  coldDrink() {
    this.itemList2 = this.itemList.filter((item) =>
      item.type.toLowerCase().includes('drink')
    );
    this.isShow2 = false;
    this.searchText = '';
  }
  extra() {
    this.itemList2 = this.itemList.filter((item) =>
      item.type.toLowerCase().includes('extra')
    );
    this.isShow2 = false;
    this.searchText = '';
    // this.service.extra().subscribe((res)=>{
    //   if(res){
    //     this.itemList = res;
    //   }
    // })
  }

  isShow = false;
  addTocart1(data: Item) {
    this.isShow = true;
    this.isShow2 = false;
    this.searchText = '';
    this.item = data;
  }
  close() {
    this.isShow = false;
  }

  addTocart(data: Item) {
    this.orderItem.number = this.itemNumber.toString();
    this.orderItem.name = data.name;
    this.orderItem.price = data.price;
    this.orderItem.type = data.type;

    this.orderItem.userId = localStorage.getItem('id');
    this.service.addOrderitem(this.orderItem).subscribe((res) => {
      if (res) {
        this.close();
        this.getOrderitem();
        setTimeout(() => {
          this.totalPrice();
        }, 100);
        this.itemNumber = 1;
      }
    });
  }

  getOrderitem() {
    this.service.getOrderitem().subscribe((res) => {
      if (res) {
        for (let index = 0; index < res.length; index++) {
          res[index].totalPrice = res[index].price * res[index].number;
          this.totalNumber = this.totalNumber + (res[index].number * 1)
        }
        this.orderItemlist = res;
      }
    });
    setTimeout(() => {
      if (this.orderItemlist.length == 0) {
        this.getResList();
      } else {
        this.resList = [];
      }
    }, 100);
  }
  removetoCart(data: orderItem) {
    let isDel = confirm('Are you sure?');
    if (isDel) {
      this.service.removeOrderitem(data).subscribe((res) => {
        if (res) {
          this.getOrderitem();
          setTimeout(() => {
            this.totalPrice();
          }, 100);
        }
      });
    }
  }
  orderData: Order = new Order();
  orderPlace() {
    if (this.orderItemlist.length == 0) {
      alert('Your cart is empty');
    } else {
      this.getResList();

      this.orderData.resName = this.resName;
      this.orderData.name = this.user.name;
      this.orderData.totalPrice = this.finalTotal;
      this.orderData.item = this.orderItemlist;
      this.orderData.userId = localStorage.getItem('id');

      this.service.orderPlace(this.orderData).subscribe((res) => {
        if (res) {
          alert('Order placed successfully!');
          this.orderData = new Order();
          this.service.deleteAllitem();
          this.orderItemlist = [];
          this.finalTotal = 0;
        }
      });
    }
  }
}
