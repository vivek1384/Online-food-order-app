import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Restaurant, User } from '../app.component';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
})
export class AdminLoginComponent {
  isTrue = true;
  isShow = false;

  user: User = new User();
  resData: Restaurant = new Restaurant();

  router = inject(Router);

  service = inject(UserService);

  onClick() {
    this.isTrue = !this.isTrue;
  }

  signUp(data: User) {
    this.user.admin = true;
    this.service.signUp(data).subscribe((res) => {
      if (res) {
        // this.isTrue = true;
        this.isTrue = false;
        this.isShow = true;
        this.user = new User();
        alert('Sign-up success.');
      }
    });
  }

  login(mail: string, pass: string) {
    this.service.login(mail, pass).subscribe((res) => {
      if (res.length == 1 && res[0].admin == true) {
        if (res[0].id == 'hhhh') {
          this.router.navigate(['/super-admin']);
        } else {
          this.router.navigate(['admin']);
          localStorage.setItem('adminId', res[0].id);
          this.resData.userId = res[0].id;
        }
      } else {
        alert('Login Failed.');
        this.user = new User();
      }
    });
  }
  addRes(resData: Restaurant) {
    this.service.addResdata(resData).subscribe((res) => {
      if (res) {
        this.isTrue = true;
        this.isShow = false;
        alert('Restaurant added.');
      }
    });
  }
}
