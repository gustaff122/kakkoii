import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogoComponent } from '../../atoms/logo/logo.component';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'kk-footer',
  templateUrl: './footer.component.html',
  styleUrls: [ './footer.component.scss' ],
  imports: [
    RouterLink,
    LogoComponent,
    NgIconComponent,
  ],
  standalone: true,
})
export class FooterComponent {
}
