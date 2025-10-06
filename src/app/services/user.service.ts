// src/app/services/user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '../config/constants';
import { ProfileResponse } from '../model/api.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // 1. ประกาศตัวแปรไว้ก่อน
  private readonly API_ENDPOINT: string;

  constructor(private http: HttpClient, private constants: Constants) {
    // 2. กำหนดค่าตัวแปรภายใน constructor
    this.API_ENDPOINT = this.constants.API_ENDPOINT;
  }
}
