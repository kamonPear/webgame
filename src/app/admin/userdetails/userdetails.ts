// 1. Import CommonModule เข้ามา
import { CommonModule } from '@angular/common'; 
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.html',
  styleUrls: ['./userdetails.scss'],
  // 2. เพิ่ม 2 บรรทัดนี้ เพื่อบอกว่า Component นี้ทำงานด้วยตัวเองและต้องใช้ CommonModule
  standalone: true,
  imports: [CommonModule] 
})
export class Userdetails implements OnInit {

  // --- ข้อมูลจำลองสำหรับหน้า Profile ---

  // ข้อมูลผู้ใช้
  userProfile = {
    name: 'พ่อครูภรัณ ',
    email: 'Pharan@gmail.com',
    balance: '5,000,000',
    avatarUrl: 'https://i.pinimg.com/736x/ed/4a/a7/ed4aa78efa51857af870e177cc75ee6e.jpg' // URL รูป Avatar
  };

  // ประวัติการเติมเงิน
  topUpHistory = [
    { date: 'เติมวันที่ 19 ก.ย. 68', amount: '500 บาท' },
    { date: 'เติมวันที่ 22 ก.ย. 68', amount: '900 บาท' },
    { date: 'เติมวันที่ 25 ก.ย. 68', amount: '200 บาท' },
    { date: 'เติมวันที่ 30 ก.ย. 68', amount: '1500 บาท' }
  ];

  // ประวัติการซื้อเกม
  purchaseHistory = [
    {
      name: 'Battlefield 6',
      imageUrl: 'https://gaming-cdn.com/images/products/20035/616x353/battlefield-6-xbox-series-x-s-microsoft-store-cover.jpg?v=1759224746',
      purchaseDate: 'ซื้อวันที่ 22 ก.ย. 68',
      price: '200 บาท'
    },
    {
      name: 'PUBG: BATTLEGROUNDS',
      imageUrl: 'https://s.isanook.com/ga/0/ud/213/1066715/image-pubg-01.jpg',
      purchaseDate: 'ซื้อวันที่ 22 ก.ย. 68',
      price: '300 บาท'
    },
    {
      name: 'EA SPORTS FC 26',
      imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2195250/header.jpg?t=1726002167',
      purchaseDate: 'ซื้อวันที่ 22 ก.ย. 68',
      price: '1000 บาท'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}