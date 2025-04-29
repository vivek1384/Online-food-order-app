import { Component, inject } from '@angular/core';
import { User } from '../app.component';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  user : User = new User()
  router = inject(Router)  

  service = inject(UserService)

  isTrue = true;

  onClick(){
    this.isTrue = !this.isTrue;
  }

  signUp(data:User){
    this.service.signUp(data).subscribe((res)=>{
      if(res){
        this.isTrue = true;
        this.user = new User()
        alert("Sign-up success.")
      }
    })
  }

  login(mail:string, pass:string){
    this.service.login(mail, pass).subscribe((res)=>{
      if(res.length == 1){
        if(res[0].id=='hhhh'){
          this.router.navigate(['/super-admin']);
        }else{
          this.router.navigate(['home'])
          localStorage.setItem('id', res[0].id)
        }
      }else{
        alert("Login Failed.")
        this.user = new User()
      }
    })
  }

}
