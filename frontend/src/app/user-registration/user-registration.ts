import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserRegister } from './user-register';

@Component({
  selector: 'app-user-registration',
  imports: [ CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule],
    standalone: true,
  templateUrl: './user-registration.html',
  providers:[UserRegister],
  styleUrl: './user-registration.scss',
})
export class UserRegistration {
   registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      city: ['', Validators.required],
      pin: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Form Data:', this.registerForm.value);
      // Call registration API here
    }
  }

  redirectToSignInPage() {
    this.router.navigate(['/login'])
  }
}
