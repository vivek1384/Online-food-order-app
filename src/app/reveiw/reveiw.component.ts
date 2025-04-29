import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Rating, Restaurant, User } from '../app.component';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-reveiw',
  imports: [RouterLink],
  templateUrl: './reveiw.component.html',
  styleUrl: './reveiw.component.css',
})
export class ReveiwComponent implements OnInit {
  router = inject(Router);
  service = inject(AdminService);

  logout() {
    let isDel = confirm('Are you sure?');
    if (isDel) {
      localStorage.removeItem('id');
      console.log('hello');
      this.router.navigate(['login']);
    }
  }

  ngOnInit(): void {
    this.getUser();
    setTimeout(() => {
      this.getReviewList();
    }, 100);
  }

  getUser() {
    this.service.getUser(localStorage.getItem('adminId')).subscribe((res) => {
      if (res) {
        this.service.getResdata(res.email).subscribe((Res) => {
          if (Res) {
            this.resData = Res[0];
            console.log(this.resData)
          }
        });
      }
    });
  }

  reviewList: Rating[] = [];
  resData: Restaurant = new Restaurant();

  getReviewList() {
    this.service.getReviewList(this.resData.name).subscribe((res) => {
      if (res) {
        this.reviewList = res;
      }
    });
  }
}
