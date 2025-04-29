import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { OrderAdminComponent } from './order-admin/order-admin.component';
import { LoginComponent } from './login/login.component';
import { HistoryComponent } from './history/history.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ReveiwComponent } from './reveiw/reveiw.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { ChatAdminComponent } from './chat-admin/chat-admin.component';
import { ChatComponent } from './chat/chat.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'order',
    component: OrderAdminComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'history',
    component: HistoryComponent,
  },
  {
    path: 'admin-login',
    component: AdminLoginComponent,
  },
  {
    path: 'review',
    component: ReveiwComponent,
  },
  {
    path: 'super-admin',
    component: SuperAdminComponent,
  },
  {
    path: 'chat-admin',
    component: ChatAdminComponent,
  },
  {
    path: 'chat',
    component: ChatComponent,
  },
];
