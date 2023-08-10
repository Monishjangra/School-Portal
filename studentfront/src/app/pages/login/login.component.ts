import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
import {  HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  
  constructor(
    private login:LoginService,
    private snack: MatSnackBar,
    private router: Router
  ) {}
  loginData = {
    email: '',
    password: '',
  };
  ngOnInit(): void {}
  formSubmit() {
    if (this.loginData.email == '' || this.loginData.email == null) {
      this.snack.open('email is required', '', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
    }
    if (this.loginData.password == '' || this.loginData.password == null) {
      this.snack.open('password is required', '', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
    }
    this.login.generateToken(this.loginData).subscribe({
      next:(data:any)=> {
        console.log(data);
        this.login.loginUser(data.token);
        
        this.login.currentUser().subscribe({
          next:(user:any)=>{
            console.log(user)
            this.login.setUser(user);
            const role=user.authorities[0].authority;
            if(role == 'Admin'){
              // window.location.href = '/admin';
              this.router.navigate(['admin']);
            }
            else if(role == 'Student'){
              // window.location.href = '/student';
              this.router.navigate(['student']);
            }
            else if(role == 'Teacher'){
              // window.location.href = '/teacher';
              this.router.navigate(['teacher']);
            }
            else{
              this.login.logout();
              location.reload();
            }
          },
          error:((error)=>{
            console.log(error);
          }),
        });
      },
      error: (error: any) => {
        console.log(error);
        // alert('something went wrong');
        this.snack.open('something went wrong', '', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      },
    });
  }
}
