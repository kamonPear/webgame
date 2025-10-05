import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';

// --- Import Angular Material Modules ที่จำเป็น ---
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// --- Import Model User ---
import { User } from '../../model/api.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class Navbar implements OnInit {
  public isProfileOpen = false;
  public isUserLoggedIn = false;
  public currentUser: User | null = null;
  public activeLink: string = 'แนะนำ';

  // --- รายการลิงก์สำหรับ Navbar (จะถูกกำหนดค่าแบบไดนามิก) ---
  public navLinks: { name: string; path: string }[] = [];

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkLoginStatus();
    }
  }

  checkLoginStatus(): void {
    const token = localStorage.getItem('authToken');
    const userDataString = localStorage.getItem('userData');

    this.isUserLoggedIn = !!token && !!userDataString; // ตรวจสอบให้แน่ใจว่าเป็น boolean

    if (this.isUserLoggedIn && userDataString) {
      this.currentUser = JSON.parse(userDataString);
    } else {
      this.currentUser = null;
    }

    // *** 🎉 การเปลี่ยนแปลงที่ 1: อัปเดตลิงก์ทุกครั้งที่ตรวจสอบสถานะ ***
    this.updateNavLinks();
  }

  // *** ✨ การเปลี่ยนแปลงที่ 2: สร้างฟังก์ชันสำหรับอัปเดต navLinks ***
  updateNavLinks(): void {
    if (this.isUserLoggedIn) {
      // เมนูสำหรับผู้ใช้ที่ล็อกอินแล้ว
      this.navLinks = [
        { name: 'แนะนำ', path: '/main' },
        { name: 'จับอันดับขายดี', path: '/bestsellers' },
        { name: 'เกม', path: '/gametype' },
        { name: 'เติมเงิน/ประวัติการซื้อ', path: '/addwallet' },
      ];
    } else {
      // เมนูสำหรับผู้ใช้ทั่วไป (ยังไม่ล็อกอิน)
      this.navLinks = [
        { name: 'แนะนำ', path: '/main' },
        { name: 'จับอันดับขายดี', path: '/bestsellers' },
        { name: 'เกม', path: '/gametype' },
      ];
    }
  }

  toggleProfileSidebar(): void {
    this.isProfileOpen = !this.isProfileOpen;
  }

  setActiveLink(linkName: string): void {
    this.activeLink = linkName;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
    }

    this.isUserLoggedIn = false;
    this.currentUser = null;
    this.isProfileOpen = false;

    // *** 🎉 การเปลี่ยนแปลงที่ 3: อัปเดตลิงก์หลังจากออกจากระบบ ***
    this.updateNavLinks();

    this.router.navigate(['/login']);
  }
}
