import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import RegisterDTO from 'src/app/models/Register';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  eyeIcon:string = "fa-eye-slash";
  type: string = 'password';
  isText:boolean =false;
  resigterForm:FormGroup;
  showPasswordGuidelines: boolean = false;

  passwordValidations = {
    containsNumber: false,
    containsUppercase: false,
    containsSpecialChar: false,
    isValidLength: false
  };

  constructor(private authService:AuthService, private router:Router, private fb:FormBuilder) { 
    this.resigterForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', [Validators.required,]],
      password: ['', Validators.required],
      confirmedPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  register(){
    this.authService.signup(this.resigterForm.value).subscribe(
      response=>{
        if(this.authService.isLoggedin()){
          this.router.navigate(['/home']);
        }
      },
      error=>{
        console.log(error);
      }
    )
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText?this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText?this.type = "text" : this.type = "password";
    }

    onPasswordInput() {
      this.showPasswordGuidelines = true; 
      const password = this.resigterForm.get('password')?.value || '';
  
      // Validate password and update the validation status
      this.passwordValidations.containsNumber = /\d/.test(password);
      this.passwordValidations.containsUppercase = /[A-Z]/.test(password);
      this.passwordValidations.containsSpecialChar = /[!@#?]/.test(password);
      this.passwordValidations.isValidLength = password.length >= 8;
    }
}
