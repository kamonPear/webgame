import { Component } from '@angular/core';
// สมมติว่าคุณใช้ CommonModule สำหรับ *ngFor และ [ngClass]
// ใน Standalone Components คุณจะต้อง import เข้ามา
import { CommonModule } from '@angular/common'; 
import { Navbar } from '../../widget/navbar/navbar';

@Component({
  selector: 'app-gametype',
  imports: [CommonModule,Navbar],
  templateUrl: './gametype.html',
  styleUrl: './gametype.scss'
})
export class Gametype {

  // สร้าง Array เก็บข้อมูลเกมทั้งหมดไว้ที่นี่
  // การเก็บข้อมูลไว้ใน .ts ทำให้ง่ายต่อการเพิ่ม ลบ หรือแก้ไขในอนาคต
  games = [
    {
      title: 'Honkai: Star Rail',
      subtitle: 'English / Global',
      imageUrl: 'https://i.pinimg.com/736x/13/f6/2f/13f62f7af8e60d507881de4f0ebb6ba0.jpg',
      colorClass: 'color-1'
    },
    {
      title: 'Tower of Fantasy',
      subtitle: 'English / Global',
      imageUrl: 'https://i.pinimg.com/736x/5f/19/a0/5f19a018401511a38473eb7269e0a6b7.jpg',
      colorClass: 'color-2'
    },
    {
      title: 'Undawn (Global)',
      subtitle: 'English / Global',
      imageUrl: 'https://i.pinimg.com/736x/13/f6/2f/13f62f7af8e60d507881de4f0ebb6ba0.jpg',
      colorClass: 'color-3'
    },
    {
      title: 'Apex Legends (Global)',
      subtitle: 'English / Global',
      imageUrl: 'https://i.pinimg.com/736x/5f/19/a0/5f19a018401511a38473eb7269e0a6b7.jpg',
      colorClass: 'color-4'
    },
    {
      title: 'Fortnite',
      subtitle: 'English / Global',
      imageUrl: 'https://i.pinimg.com/736x/13/f6/2f/13f62f7af8e60d507881de4f0ebb6ba0.jpg',
      colorClass: 'color-5'
    },
    {
      title: 'Diablo IV',
      subtitle: 'English / Global',
      imageUrl: 'https://i.pinimg.com/736x/5f/19/a0/5f19a018401511a38473eb7269e0a6b7.jpg',
      colorClass: 'color-6'
    },
    {
      title: 'LifeAfter',
      subtitle: 'English / Global',
      imageUrl: 'https://i.pinimg.com/736x/13/f6/2f/13f62f7af8e60d507881de4f0ebb6ba0.jpg',
      colorClass: 'color-9'
    },
    {
      title: 'Cyberpunk 2077',
      subtitle: 'English / Global',
      imageUrl: 'https://i.pinimg.com/736x/28/ad/e8/28ade849b6548bc6e0a276897b6063f8.jpg',
      colorClass: 'color-15'
    },
    {
      title: 'Honkai: Star Rail',
      subtitle: 'English / Global',
      imageUrl: 'https://i.pinimg.com/736x/5f/19/a0/5f19a018401511a38473eb7269e0a6b7.jpg',
      colorClass: 'color-1'
    },
    {
      title: 'Tower of Fantasy',
      subtitle: 'English / Global',
      imageUrl: 'https://i.pinimg.com/736x/28/ad/e8/28ade849b6548bc6e0a276897b6063f8.jpg',
      colorClass: 'color-2'
    },
    {
      title: 'Undawn (Global)',
      subtitle: 'English / Global',
      imageUrl: 'https://i.pinimg.com/736x/5f/19/a0/5f19a018401511a38473eb7269e0a6b7.jpg',
      colorClass: 'color-3'
    },
    {
      title: 'Apex Legends (Global)',
      subtitle: 'English / Global',
      imageUrl: 'https://i.pinimg.com/736x/28/ad/e8/28ade849b6548bc6e0a276897b6063f8.jpg',
      colorClass: 'color-4'
    },
    {
      title: 'Fortnite',
      subtitle: 'English / Global',
      imageUrl: 'https://i.pinimg.com/736x/5f/19/a0/5f19a018401511a38473eb7269e0a6b7.jpg',
      colorClass: 'color-5'
    },
    {
      title: 'Diablo IV',
      subtitle: 'English / Global',
      imageUrl: 'https://i.pinimg.com/736x/5f/19/a0/5f19a018401511a38473eb7269e0a6b7.jpg',
      colorClass: 'color-6'
    },
    {
      title: 'LifeAfter',
      subtitle: 'English / Global',
      imageUrl: 'https://i.pinimg.com/736x/5f/19/a0/5f19a018401511a38473eb7269e0a6b7.jpg',
      colorClass: 'color-9'
    },
    {
      title: 'Cyberpunk 2077',
      subtitle: 'English / Global',
      imageUrl: 'https://i.pinimg.com/736x/28/ad/e8/28ade849b6548bc6e0a276897b6063f8.jpg',
      colorClass: 'color-15'
    }
    // เพิ่มเกมใหม่ๆ ต่อที่นี่ได้เลย
  ];

  constructor() { }

}
