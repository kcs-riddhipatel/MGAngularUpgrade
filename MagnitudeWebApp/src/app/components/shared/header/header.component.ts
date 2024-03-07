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
    return this.router.url === '/activity' || this.router.url === '/analytics';
  }
  isActivityActive: boolean = true;

  Activityload(){
    this.isActivityActive = true;
    this.router.navigate(['/activity']);
  }
  Analyticsload(){  
    this.isActivityActive = false;
    this.router.navigate(['/analytics']);
  }
  toggleScreen(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.Analyticsload();
    } else {
      this.Activityload();
    }
  }
  
}
