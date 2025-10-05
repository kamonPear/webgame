import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../widget/navbar/navbar';

// Interface สำหรับข้อมูลเกม (ควรมีอยู่แล้ว)
interface Game {
  title: string;
  subtitle: string;
  imageUrl: string;
  colorClass: string;
  genre: string;
}

// Interface สำหรับข้อมูลเกมที่จัดกลุ่มแล้ว
interface GameGroup {
  genre: string;
  games: Game[];
}

@Component({
  selector: 'app-splitgame',
  imports: [CommonModule,Navbar],
  templateUrl: './splitgame.html',
  styleUrl: './splitgame.scss'
})
export class Splitgame {

  // 1. คลังข้อมูลเกมทั้งหมดของเรา
  allGames: Game[] = [
    { title: 'Honkai: Star Rail', subtitle: 'English / Global', imageUrl: '...', colorClass: 'color-1', genre: 'RPG' },
    { title: 'Tower of Fantasy', subtitle: 'English / Global', imageUrl: '...', colorClass: 'color-2', genre: 'Action RPG' },
    { title: 'Undawn (Global)', subtitle: 'English / Global', imageUrl: '...', colorClass: 'color-3', genre: 'Survival' },
    { title: 'Apex Legends (Global)', subtitle: 'English / Global', imageUrl: '...', colorClass: 'color-4', genre: 'Battle Royale' },
    { title: 'Fortnite', subtitle: 'English / Global', imageUrl: '...', colorClass: 'color-5', genre: 'Battle Royale' },
    { title: 'Diablo IV', subtitle: 'English / Global', imageUrl: '...', colorClass: 'color-6', genre: 'Action RPG' },
    { title: 'Cyberpunk 2077', subtitle: 'English / Global', imageUrl: '...', colorClass: 'color-15', genre: 'RPG' },
    { title: 'Elden Ring', subtitle: 'English / Global', imageUrl: '...', colorClass: 'color-8', genre: 'Action RPG' },
    { title: 'Counter-Strike 2', subtitle: 'English / Global', imageUrl: '...', colorClass: 'color-13', genre: 'Shooter' },
    { title: 'Naraka: BladePoint', subtitle: 'English / Global', imageUrl: '...', colorClass: 'color-7', genre: 'Battle Royale' },
    { title: 'Forza Horizon 5', subtitle: 'English / Global', imageUrl: '...', colorClass: 'color-9', genre: 'Racing' },
    { title: 'Honkai: Star Rail', subtitle: 'English / Global', imageUrl: '...', colorClass: 'color-1', genre: 'RPG' },
    { title: 'Tower of Fantasy', subtitle: 'English / Global', imageUrl: '...', colorClass: 'color-2', genre: 'Action RPG' },
    { title: 'Undawn (Global)', subtitle: 'English / Global', imageUrl: '...', colorClass: 'color-3', genre: 'Survival' },
    { title: 'Apex Legends (Global)', subtitle: 'English / Global', imageUrl: '...', colorClass: 'color-4', genre: 'Battle Royale' },
    { title: 'Fortnite', subtitle: 'English / Global', imageUrl: '...', colorClass: 'color-5', genre: 'Battle Royale' },
    { title: 'Diablo IV', subtitle: 'English / Global', imageUrl: '...', colorClass: 'color-6', genre: 'Action RPG' },
    { title: 'Cyberpunk 2077', subtitle: 'English / Global', imageUrl: '...', colorClass: 'color-15', genre: 'RPG' },
    { title: 'Elden Ring', subtitle: 'English / Global', imageUrl: '...', colorClass: 'color-8', genre: 'Action RPG' },
    { title: 'Counter-Strike 2', subtitle: 'English / Global', imageUrl: '...', colorClass: 'color-13', genre: 'Shooter' },
    { title: 'Naraka: BladePoint', subtitle: 'English / Global', imageUrl: '...', colorClass: 'color-7', genre: 'Battle Royale' },
    { title: 'Forza Horizon 5', subtitle: 'English / Global', imageUrl: '...', colorClass: 'color-9', genre: 'Racing' },
  ];

  // 2. ตัวแปรใหม่สำหรับเก็บข้อมูลที่จัดกลุ่มแล้ว
  groupedGames: GameGroup[] = [];

  constructor() { }

  ngOnInit(): void {
    // 3. Logic การจัดกลุ่มข้อมูล
    const groups: { [key: string]: Game[] } = {};

    // วนลูปเกมทั้งหมดเพื่อสร้างกลุ่ม
    for (const game of this.allGames) {
      if (!groups[game.genre]) {
        groups[game.genre] = []; // ถ้ายังไม่มีกลุ่มนี้ ให้สร้างกลุ่มใหม่
      }
      groups[game.genre].push(game); // เพิ่มเกมเข้าไปในกลุ่มของมัน
    }

    // แปลงข้อมูลจาก Object ไปเป็น Array เพื่อให้ *ngFor ใช้งานได้
    this.groupedGames = Object.keys(groups).map(genre => {
      return {
        genre: genre,
        games: groups[genre]
      };
    });
  }
}

