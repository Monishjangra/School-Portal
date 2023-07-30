import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})

export class AdminDashboardComponent implements OnInit {
  userData:any=[];

  constructor(
    private login:LoginService,
    private router:Router,
    private admin:AdminService,

  ) {}
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'rollNo','phoneNo'];
  ngOnInit(): void {
    this.admin.userData().subscribe({

      next:(data)=>{
        this.userData = data;
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }
  
  logout(){
    this.login.logout();
    this.router.navigate(['login']);
  }
}