import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserLogin } from '../../model/api.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {
  public hidePassword = true;
  public loginForm: FormGroup;
  public loginError: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    this.loginError = null;
    if (this.loginForm.invalid) {
      // Mark fields as touched to show validation errors if you have them
      this.loginForm.markAllAsTouched();
      return;
    }

    const credentials: UserLogin = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: (response) => {
        // --- กรณี Login สำเร็จ ---
        console.log('Login successful:', response);

        // 1. เก็บ Token และข้อมูล User ไว้ใน localStorage
        localStorage.setItem('authToken', response.token);
        // แปลง object 'user' เป็น string ก่อนเก็บ
        localStorage.setItem('userData', JSON.stringify(response.user));

        // 2. เช็ค Role จากข้อมูล User ที่ได้รับกลับมา
        if (response.user.role === 'admin') {
          // ถ้าเป็น 'admin' ให้ไปที่หน้า Mainadmin
          this.router.navigate(['/mainadmin']);
        } else {
          // ถ้าเป็น Role อื่นๆ (เช่น 'member') ให้ไปที่หน้า main
          this.router.navigate(['/main']);
        }
      },
      error: (err) => {
        // --- กรณี Login ล้มเหลว ---
        console.error('Login failed:', err);
        // กำหนดข้อความ error เพื่อนำไปแสดงใน HTML
        this.loginError = 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง';
      },
    });
  }
}
