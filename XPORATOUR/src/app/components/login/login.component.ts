import { Component, ViewChild, viewChild } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent,RouterLink, FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  @ViewChild('loginForm') loginForm!:NgForm
  
  
  constructor(private router:Router){
   
    
  }
  navigateToDashboard(){

  }
  setValue(){
    this.loginForm.setValue({
      user:{
        email: 'example@gmail.com',
        password:'12345678'
      }
    })
  }

  patchValue(){
    this.loginForm.form.patchValue({
      user:{
        email:'clintonarani@gmail.com'
      }
    })
  }

}
