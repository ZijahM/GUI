import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }
  invalidLogin: boolean;
  login(form: NgForm) {
    const credentials = JSON.stringify(form.value);
    this.http.post("https://localhost:44307/api/auth/login", credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
      })
    }).subscribe(response => {
      const token = (<any>response).token;
      localStorage.setItem("jwt", token);
      this.invalidLogin = false;
      this.router.navigate(['/dashboard']);
    }, err => {
      this.invalidLogin = true;
    });
  }

  ngOnInit(): void {
  }

}
