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
  // --- ตัวแปรสำหรับควบคุมสถานะของ Sidebar และข้อมูลผู้ใช้ ---
  public isProfileOpen = false;
  public isUserLoggedIn = false;
  public currentUser: User | null = null;
  public activeLink: string = 'แนะนำ'; // ลิงก์ที่ถูกเลือกเริ่มต้น

  // --- รายการลิงก์สำหรับ Navbar ---
  public navLinks = [
    { name: 'แนะนำ', path: '/main' },
    { name: 'จับอันดับขายดี', path: '/bestsellers' },
    { name: 'ประเภทเกม', path: '/categories' },
    { name: 'เติมเงิน/ประวัติการซื้อ', path: '/history' },
  ];

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object // Inject PLATFORM_ID สำหรับเช็ค SSR
  ) {}

  ngOnInit(): void {
    // --- ตรวจสอบสถานะการล็อกอินเมื่อ Component โหลด (เฉพาะฝั่งเบราว์เซอร์) ---
    if (isPlatformBrowser(this.platformId)) {
      this.checkLoginStatus();
    }
  }

  checkLoginStatus(): void {
    const token = localStorage.getItem('authToken');
    const userDataString = localStorage.getItem('userData'); // ใช้ key 'userData' ตามที่คุณระบุ

    if (token && userDataString) {
      this.isUserLoggedIn = true;
      this.currentUser = JSON.parse(userDataString);
    } else {
      this.isUserLoggedIn = false;
      this.currentUser = null;
    }
  }

  // --- ฟังก์ชันสำหรับเปิด/ปิด Sidebar ---
  toggleProfileSidebar(): void {
    this.isProfileOpen = !this.isProfileOpen;
  }

  // --- ฟังก์ชันสำหรับตั้งค่าลิงก์ที่ Active ---
  setActiveLink(linkName: string): void {
    this.activeLink = linkName;
  }

  // --- ฟังก์ชันสำหรับออกจากระบบ ---
  logout(): void {
    // ตรวจสอบว่าเป็นเบราว์เซอร์ก่อนลบ localStorage
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData'); // ใช้ key 'userData' ตามที่คุณระบุ
    }

    // อัปเดตสถานะและปิด Sidebar
    this.isUserLoggedIn = false;
    this.currentUser = null;
    this.isProfileOpen = false;

    // นำทางกลับไปที่หน้าล็อกอิน
    this.router.navigate(['/login']);
  }
}
