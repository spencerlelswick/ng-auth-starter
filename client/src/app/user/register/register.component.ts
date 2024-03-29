import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import IUser from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  //TODO Email taken check
  constructor(private auth: AuthService) { }

  showAlert = false;
  alertMsg = 'Please wait, your account is being created.'
  alertColor = 'blue'
  inSubmission = false

  name = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ])
  email = new FormControl('', [
    Validators.required,
    Validators.email
  ], [])
  age = new FormControl('', [
    Validators.required,
    Validators.min(18),
    Validators.max(99),
  ])
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/)
  ])
  confirm_password = new FormControl('', [
    Validators.required
  ])
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(14),
    Validators.maxLength(14)
  ])

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirm_password: this.confirm_password,
    phoneNumber: this.phoneNumber
  }, [])

  register(): void {
    this.showAlert = true
    this.alertMsg = 'Please wait while your account is being created'
    this.alertColor = 'green'
    this.inSubmission = true

    this.auth.register(this.registerForm.value as IUser).subscribe({
      next: data => {
        console.log(data);
        this.alertMsg = 'Success! Account has been created.'
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
