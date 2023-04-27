import { Component } from '@angular/core';
import { LogoComponent } from '../../atoms/logo/logo.component';
import { IsBreakpointDirective } from '@kakkoii/directives/is-breakpoint.directive';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'kk-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.scss' ],
  imports: [
    LogoComponent,
    IsBreakpointDirective,
    RouterLink,
  ],
  standalone: true,
})
export class NavbarComponent {
}
