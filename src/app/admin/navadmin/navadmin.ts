import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// --- Import Angular Material Modules ที่จำเป็น ---
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// --- Import Model User ---
import { User } from '../../model/api.model';

@Component({
  selector: 'app-navadmin', // --- ตั้งชื่อ selector ---
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './navadmin.html',
  styleUrls: ['./navadmin.scss'],
})
export class Navadmin implements OnInit {
  // --- ตัวแปรสำหรับควบคุมสถานะของ Sidebar และข้อมูลผู้ใช้ ---
  public isProfileOpen = false;
  public isUserLoggedIn = false;
  public currentUser: User | null = null;
  public activeLink: string = 'แนะนำ'; // ลิงก์ที่ถูกเลือกเริ่มต้น

  // --- รายการลิงก์สำหรับ Navbar ---
  public navLinks = [
    { name: 'หน้าหลัก', path: '/mainadmin' },
    { name: 'เพิ่มรายการใหม่', path: '/addgame' },
    { name: 'โค้ดส่วนลด', path: '/discounts' },
    { name: 'เติมเงิน/ประวัติการทำธุระกรรม', path: '/history' },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // --- ตรวจสอบสถานะการล็อกอินเมื่อ Component โหลด ---
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    const token = localStorage.getItem('authToken');
    const userDataString = localStorage.getItem('userData');

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
    // ล้างข้อมูลทั้งหมดจาก localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');

    // อัปเดตสถานะและปิด Sidebar
    this.isUserLoggedIn = false;
    this.currentUser = null;
    this.isProfileOpen = false;

    // นำทางกลับไปที่หน้าล็อกอิน
    this.router.navigate(['/login']);
  }
}
