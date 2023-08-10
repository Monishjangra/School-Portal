import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {
  
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