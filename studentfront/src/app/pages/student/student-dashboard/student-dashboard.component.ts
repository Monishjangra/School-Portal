import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  
  constructor(
    private login:LoginService,
    private router:Router
  ) {}

  
  ngOnInit(): void {

  }
  
  logout(){
    this.login.logout();
    this.router.navigate(['login']);
  }
}