import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Restaurant, User } from './app.component';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);

  signUp(data: User) {
    return this.http.post('http://localhost:3000/user', data);
  }
  login(mail: string, pass: string) {
    return this.http.get<User[]>(
      `http://localhost:3000/user?email=${mail}&password=${pass}`
    );
  }
  getUser(id: any) {
    return this.http.get<User>('http://localhost:3000/user/'+id)
  }
  addResdata(data:Restaurant){
    return this.http.post("http://localhost:3000/restaurant",data)
  }
  
  constructor() {}
}
