import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'kk-logo',
  templateUrl: './logo.component.html',
  styleUrls: [ './logo.component.scss' ],
  standalone: true,
  imports: [
    NgOptimizedImage,
  ],
})
export class LogoComponent {
}
