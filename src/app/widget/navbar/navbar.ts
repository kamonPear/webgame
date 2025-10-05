import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-navbar',
  standalone: true, // ระบุว่าเป็น Standalone Component
  imports: [CommonModule], // เพิ่ม CommonModule สำหรับใช้งาน [ngClass] หรือ [class]
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {

  // Property สำหรับเก็บสถานะการเปิด/ปิดเมนู (เริ่มต้นคือปิด)
  isMenuOpen: boolean = false;

  // Method ที่จะถูกเรียกเมื่อมีการคลิกที่ปุ่ม Hamburger
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen; // สลับค่า true/false
  }

}