import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  type:string = "password";
  isText:boolean =false;
  eyeIcon :string = "fa-eye-slash";

  constructor(private authService:AuthService,private fb:FormBuilder,private router:Router){
    this.loginForm = this.fb.group({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }
 

  hideShowPass(){
    this.isText = !this.isText;
    this.isText?this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText?this.type = "text" : this.type = "password";
  }
  onSumbit(){
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value)
      .subscribe((data:any)=>{
        if(this.authService.isLoggedin()){
          this.router.navigate(['/home']);
        }
      });
    }
  }
}
