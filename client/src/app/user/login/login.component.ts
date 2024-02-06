import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import IUser from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private auth: AuthService) { }

  showAlert = false;
  alertMsg = 'Attempting to log in...'
  alertColor = 'blue'
  inSubmission = false

  email = new FormControl('', [
    Validators.required,
    Validators.email
  ], [])
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/)
  ])

  registerForm = new FormGroup({
    email: this.email,
    password: this.password,
  }, [])

  register(): void {
    this.showAlert = true
    this.alertMsg = 'Attempting to log in...'
    this.alertColor = 'blue'
    this.inSubmission = true

    this.auth.login(this.registerForm.value as IUser).subscribe({
      next: data => {
        console.log(data);
        this.alertMsg = 'Success!'
        this.alertColor = 'green'
        this.inSubmission = false
      },
      error: err => {
        console.log(err);
        this.alertMsg = (err.error.message)
        this.alertColor = 'red'
        this.inSubmission = false
      }
    })
  }
}