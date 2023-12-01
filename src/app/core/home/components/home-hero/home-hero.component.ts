import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsBreakpointDirective } from '@kakkoii/directives/is-breakpoint.directive';
import { HomeHeroDesktopComponent } from './components/home-hero-desktop/home-hero-desktop.component';
import { HomeHeroMobileComponent } from './components/home-hero-mobile/home-hero-mobile.component';


@Component({
  selector: 'kk-home-hero',
  templateUrl: './home-hero.component.html',
  styleUrls: [ './home-hero.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    IsBreakpointDirective,
    HomeHeroDesktopComponent,
    HomeHeroMobileComponent,
  ],
  standalone: true,
})
export class HomeHeroComponent {
  @Output() public readonly startWatchingBtn: EventEmitter<void> = new EventEmitter<void>();

  public startWatchingButtonFn(): void {
    this.startWatchingBtn.emit()
  }
}
