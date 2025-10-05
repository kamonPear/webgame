import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../widget/navbar/navbar';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule,Navbar],
  templateUrl: './details.html',
  styleUrls: ['./details.scss']
})
export class DetailsComponent {

  constructor() { }

}