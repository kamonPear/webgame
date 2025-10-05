import { Routes } from '@angular/router';
import { Register } from './page/register/register';
import { Login } from './page/login/login';
import { Main } from './page/main/main';
import { Mainadmin } from './admin/mainadmin/mainadmin';
import { Addgame } from './admin/addgame/addgame';
import { Historyuser } from './admin/history/history';
import { Discounts } from './admin/discounts/discounts';
import { AddWallet } from './page/add-wallet/add-wallet';
import { Home } from './page/home/home';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'addwallet', component: AddWallet },

  // (แนะนำ) กำหนดหน้าเริ่มต้น เมื่อไม่มี path
  { path: 'main', component: Main },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'Mainadmin', component: Mainadmin },
  { path: 'addgame', component: Addgame },
  { path: 'history', component: Historyuser },
  { path: 'discounts', component: Discounts },
  { path: 'home', component: Home },
];
