import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // `intercept` คือฟังก์ชันที่จะถูกเรียกใช้ทุกครั้งที่มีการส่ง HTTP request
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 1. ดึง Token จาก Local Storage
    const token = localStorage.getItem('authToken');

    // 2. ตรวจสอบว่ามี Token หรือไม่
    // ถ้าไม่มี (เช่น ตอนที่ยังไม่ Login) ก็ให้ส่ง request เดิมออกไปเลย
    if (!token) {
      return next.handle(req);
    }

    // 3. ถ้ามี Token ให้ทำการ "โคลน" request เดิม
    // แล้วเพิ่ม Authorization header เข้าไป
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });

    // 4. ส่ง request ที่มี header แล้วออกไปทำงานต่อ
    return next.handle(authReq);
  }
}
