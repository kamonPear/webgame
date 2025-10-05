import { Routes } from '@angular/router';

// 1. นำเข้า Guards ที่สร้างขึ้น (ตรวจสอบ path ให้ถูกต้อง)
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';

// Import Components ของคุณ...
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
  // --- Routes ที่ไม่ต้องล็อกอิน (Public Routes) ---
  {
    path: 'main',
    component: Main, // หน้านี้เป็นหน้าสาธารณะ ไม่ต้องมี Guard
  },
  {
    path: 'login',
    component: Login,
    canActivate: [loginGuard], // ป้องกันคนที่ล็อกอินแล้วเข้าซ้ำ
  },
  {
    path: 'register',
    component: Register,
    canActivate: [loginGuard], // ป้องกันคนที่ล็อกอินแล้วเข้าซ้ำ
  },

  // --- Routes ที่ต้องล็อกอินก่อน (Protected Routes) ---
  {
    path: 'home',
    component: Home,
    canActivate: [authGuard], // ต้องล็อกอินก่อนถึงจะเข้าได้
  },
  {
    path: 'addwallet',
    component: AddWallet,
    canActivate: [authGuard],
  },

  // --- Routes สำหรับ Admin ที่ต้องล็อกอินก่อน ---
  {
    path: 'mainadmin',
    component: Mainadmin,
    canActivate: [authGuard],
  },
  {
    path: 'addgame',
    component: Addgame,
    canActivate: [authGuard],
  },
  {
    path: 'history',
    component: Historyuser,
    canActivate: [authGuard],
  },
  {
    path: 'discounts',
    component: Discounts,
    canActivate: [authGuard],
  },

  // --- Route เริ่มต้นและ Wildcard ---
  {
    path: '',
    redirectTo: '/main', // เปลี่ยนให้หน้าเริ่มต้นชี้ไปที่ /main
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/main', // หากเข้า path ที่ไม่มีอยู่จริง ให้กลับไปหน้า main
  },
];
