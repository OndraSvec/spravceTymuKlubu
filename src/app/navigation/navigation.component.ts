import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable, Subscription } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';
import {
  Event,
  NavigationEnd,
  Router,
  RouterEvent,
  RouterModule,
} from '@angular/router';
import { NavigationTitlePipe } from '../pipes/navigation-title.pipe';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    NavigationTitlePipe,
    RouterModule,
  ],
})
export class NavigationComponent implements OnInit, OnDestroy {
  private breakpointObserver = inject(BreakpointObserver);
  private router: Router = inject(Router);
  private routerEventSub!: Subscription;
  public navigationTitle = '';

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  ngOnInit(): void {
    this.routerEventSub = this.router.events
      .pipe(
        filter(
          (e: Event | RouterEvent): e is RouterEvent =>
            e instanceof NavigationEnd
        )
      )
      .subscribe((e: RouterEvent) => {
        this.navigationTitle = e.url;
      });
  }

  ngOnDestroy(): void {
    this.routerEventSub.unsubscribe();
  }
}
