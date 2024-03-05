import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private authService: AuthService,private router: Router) { }
  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
  home() {
    this.authService.logout();
    this.router.navigate(['/activity']);
  }
  isActivityScreen() {
    return  this.router.url == '/activity' || '/analytics' ;
  }
  isAnalyticsScreen(){
    return this.router.url == '/activity' || '/analytics';
  }
  Activityload(){
    this.router.navigate(['/activity']);
  }
  Analyticsload(){
    this.router.navigate(['/analytics']);
  }
}
