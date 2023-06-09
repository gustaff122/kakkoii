import { Component } from '@angular/core';
import { LogoComponent } from '../../atoms/logo/logo.component';
import { IsBreakpointDirective } from '@kakkoii/directives/is-breakpoint.directive';
import { KkSearchAutocompleteComponent } from '../../molecules/kk-search-autocomplete/kk-search-autocomplete.component';
import { FormsModule } from '@angular/forms';
import { Series } from '@kakkoii/interfaces/series';
import { NgIconComponent } from '@ng-icons/core';
import { Observable } from 'rxjs';
import { Network } from '@ngx-pwa/offline';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'kk-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.scss' ],
  imports: [
    CommonModule,
    LogoComponent,
    IsBreakpointDirective,
    KkSearchAutocompleteComponent,
    FormsModule,
    NgIconComponent,
    RouterModule
  ],
  standalone: true,
})
export class NavbarComponent {
  public search: Series[];
  public online$: Observable<boolean> = this.network.onlineChanges;

  constructor(
    private readonly network: Network
  ) {
  }
}
