import { ChangeDetectorRef, Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { distinctUntilChanged, pluck, Subscription } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';

class IsBreakpointContext {
  lpIsBreakpoint: number;
  lpIsBreakpointMax: number;
}

@Directive({
  selector: '[kkIsBreakpoint]',
  standalone: true,
})
export class IsBreakpointDirective implements OnInit, OnDestroy {

  @Input('kkIsBreakpoint') public lpIsBreakpointMin: number;
  @Input('kkIsBreakpointMax') public lpIsBreakpointMax: number;

  private readonly subscriptions: Subscription = new Subscription();
  private readonly context = new IsBreakpointContext();

  private isViewCreated = false;

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly templateRef: TemplateRef<IsBreakpointContext>,
  ) {
  }

  public static ngTemplateContextGuard(_dir: IsBreakpointDirective, _ctx: IsBreakpointContext): _ctx is IsBreakpointContext {
    return true;
  }

  public ngOnInit(): void {
    let breakpoints: string;

    if (this.lpIsBreakpointMin && this.lpIsBreakpointMax) {
      breakpoints = `(min-width: ${this.lpIsBreakpointMin}px) and (max-width: ${this.lpIsBreakpointMax}px)`;
    } else if (this.lpIsBreakpointMin) {
      breakpoints = `(min-width: ${this.lpIsBreakpointMin}px)`;
    } else if (this.lpIsBreakpointMax) {
      breakpoints = `(max-width: ${this.lpIsBreakpointMax}px)`;
    }

    if (breakpoints) {
      this.subscriptions.add(
        this.breakpointObserver.observe(breakpoints).pipe(
          pluck('matches'),
          distinctUntilChanged(),
        ).subscribe((matches: boolean) => {
          if (matches && !this.isViewCreated) {
            this.viewContainerRef.createEmbeddedView(this.templateRef, this.context);
            this.isViewCreated = true;
          }

          if (!matches && this.isViewCreated) {
            this.viewContainerRef.clear();
            this.isViewCreated = false;
          }

          this.changeDetectorRef.markForCheck();
        }),
      );
    }
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}