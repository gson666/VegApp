import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  userName: string='';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userName = this.auth.getCurrentUser();
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }
  goToProfile(){
    this.router.navigate(['/profile']);
  }
}
