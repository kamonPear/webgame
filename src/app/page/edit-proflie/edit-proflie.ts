import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { User } from '../../model/api.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Constants } from '../../config/constants';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-profile', // แนะนำให้เปลี่ยน selector ให้ตรง
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    RouterModule,
  ],
  templateUrl: './edit-proflie.html', // แนะนำให้เปลี่ยนชื่อไฟล์
  styleUrl: './edit-proflie.scss', // แนะนำให้เปลี่ยนชื่อไฟล์
})
export class EditProfile implements OnInit {
  // แก้ไขชื่อ Class
  editProfileForm!: FormGroup;
  originalUser: User | null = null; // เก็บข้อมูล user เดิมไว้เปรียบเทียบ
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  // --- State Variables ---
  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // 1. สร้างฟอร์ม
    this.editProfileForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [''], // รหัสผ่านไม่บังคับกรอก
    });

    // 2. ดึงข้อมูลโปรไฟล์ปัจจุบันมาใส่ในฟอร์ม
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.authService.getProfile().subscribe({
      next: (response) => {
        this.originalUser = response.user;
        // ใช้ patchValue เพื่อเติมข้อมูลลงในฟอร์ม
        this.editProfileForm.patchValue({
          username: this.originalUser.username,
          email: this.originalUser.email,
        });
      },
      error: (err) => {
        console.error('Failed to fetch profile:', err);
        this.errorMessage = 'ไม่สามารถดึงข้อมูลโปรไฟล์ได้';
        // อาจจะ redirect ไปหน้า login ถ้า token หมดอายุ
        // this.router.navigate(['/login']);
      },
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      // สร้างภาพ Preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
      this.editProfileForm.markAsDirty(); // Mark form as changed
    }
  }

  onSubmit(): void {
    // ตรวจสอบว่าไม่มีการเปลี่ยนแปลงใดๆ เลย
    if (this.editProfileForm.pristine && !this.selectedFile) {
      this.successMessage = 'ไม่มีข้อมูลที่เปลี่ยนแปลง';
      setTimeout(() => (this.successMessage = null), 3000);
      return;
    }

    this.isLoading = true;
    this.successMessage = null;
    this.errorMessage = null;

    const formData = new FormData();
    const formValues = this.editProfileForm.getRawValue();

    // --- แนบเฉพาะข้อมูลที่มีการเปลี่ยนแปลง ---
    if (formValues.username !== this.originalUser?.username) {
      formData.append('username', formValues.username);
    }
    if (formValues.email !== this.originalUser?.email) {
      formData.append('email', formValues.email);
    }
    // รหัสผ่านจะถูกส่งไปก็ต่อเมื่อมีการกรอกค่าใหม่เท่านั้น
    if (formValues.password) {
      formData.append('password', formValues.password);
    }
    // แนบไฟล์รูปภาพถ้ามีการเลือกไฟล์ใหม่
    if (this.selectedFile) {
      formData.append('imageProfile', this.selectedFile, this.selectedFile.name);
    }

    this.authService.updateProfile(formData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = 'อัปเดตโปรไฟล์สำเร็จ!';

        // อัปเดตข้อมูลใน Local Storage ด้วยข้อมูลใหม่ล่าสุด
        localStorage.setItem('userData', JSON.stringify(response.user));

        // Reset form state to pristine
        this.editProfileForm.markAsPristine();
        this.selectedFile = null;

        // Redirect หรือแสดงข้อความค้างไว้
        setTimeout(() => {
          this.router.navigate(['/main']); // หรือ refresh หน้าเดิม
        }, 2000);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.error || 'เกิดข้อผิดพลาดในการอัปเดตโปรไฟล์';
        console.error('Update profile failed:', err);
      },
    });
  }
}
