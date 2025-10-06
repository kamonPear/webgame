// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '../config/constants';
import {
  LoginResponse,
  ProfileResponse,
  RegisterResponse,
  UserLogin,
  UserRegister,
} from '../model/api.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // เพิ่มฟังก์ชันนี้เข้าไป
  isLoggedIn(): boolean {
    const token = localStorage.getItem('authToken');
    return token != null; // ถ้ามี token ให้ return true, ถ้าไม่มี return false
  }

  // 1. ประกาศตัวแปรไว้เฉยๆ โดยยังไม่กำหนดค่า
  private readonly API_ENDPOINT: string;

  constructor(private http: HttpClient, private constants: Constants) {
    // 2. ย้ายการกำหนดค่ามาไว้ในนี้
    this.API_ENDPOINT = this.constants.API_ENDPOINT;
  }

  /**
   * ฟังก์ชันสำหรับส่งข้อมูลการลงทะเบียน
   * @param userData ข้อมูลของผู้ใช้ที่ต้องการลงทะเบียน
   * @returns Observable ของ RegisterResponse
   */
  register(formData: FormData): Observable<RegisterResponse> {
    const url = `${this.API_ENDPOINT}/register`;

    // 💥 เมื่อส่ง FormData เราไม่ต้องตั้งค่า 'Content-Type' เอง
    // เบราว์เซอร์จะจัดการให้เป็น 'multipart/form-data' พร้อม boundary ที่ถูกต้องโดยอัตโนมัติ
    return this.http.post<RegisterResponse>(url, formData);
  }

  /**
   * ฟังก์ชันสำหรับส่งข้อมูลการเข้าสู่ระบบ
   * @param credentials ข้อมูล username และ password
   * @returns Observable ของ LoginResponse
   */
  login(credentials: UserLogin): Observable<LoginResponse> {
    const url = `${this.API_ENDPOINT}/login`;
    return this.http.post<LoginResponse>(url, credentials);
  }

  // --- 👇 ฟังก์ชันใหม่ที่เพิ่มเข้ามา ---

  /**
   * ดึงข้อมูลโปรไฟล์ของผู้ใช้ที่ล็อกอินอยู่
   * @returns Observable ของ ProfileResponse
   */
  getProfile(): Observable<ProfileResponse> {
    const url = `${this.API_ENDPOINT}/api/profile`;
    // เราจะใช้ Interceptor ในการแนบ Token ไปกับ Header โดยอัตโนมัติ
    return this.http.get<ProfileResponse>(url);
  }

  /**
   * อัปเดตข้อมูลโปรไฟล์
   * @param formData ข้อมูลที่ต้องการอัปเดต (อาจมีแค่บาง field)
   * @returns Observable ของ ProfileResponse
   */
  updateProfile(formData: FormData): Observable<ProfileResponse> {
    const url = `${this.API_ENDPOINT}/api/updateprofile`;
    // เราจะใช้ Interceptor ในการแนบ Token ไปกับ Header โดยอัตโนมัติ
    return this.http.put<ProfileResponse>(url, formData);
  }
}
