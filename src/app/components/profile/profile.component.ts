import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import User from 'src/app/models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user!: User;

  constructor(private authService: AuthService,private router:Router) {}

  ngOnInit(): void {
    const userName = this.authService.getCurrentUser();
    this.authService.getUserProfile(userName).subscribe(
      (user) => {
        this.user = user;
      },
      (error) => {
        console.error('Error fetching user profile', error);
      }
    );
  }
  goBack(){
    this.router.navigate(['/home']);
  }
}
