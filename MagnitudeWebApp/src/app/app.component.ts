import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Spinkit } from 'ng-http-loader';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MagnitudeWebApp';
  showHeaderAndFooter: boolean = true;
  spinnerStyle = Spinkit;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const currentRoute = this.router.url.split('?')[0];
      if (currentRoute === '/login' || currentRoute === '/home' || currentRoute === '/contact') {
        this.showHeaderAndFooter = false;
      } else {
        this.showHeaderAndFooter = true;
      }
    });
  }
}
