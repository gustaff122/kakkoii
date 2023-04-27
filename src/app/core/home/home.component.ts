import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsBreakpointDirective } from '@kakkoii/directives/is-breakpoint.directive';
import { HomeHeroComponent } from './components/home-hero/home-hero.component';


@Component({
  selector: 'kk-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    IsBreakpointDirective,
    HomeHeroComponent,
  ],
  standalone: true,
})
export class HomeComponent  {
}
