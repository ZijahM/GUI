import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router,) { }

  isLoggedIn: boolean = false;
  students: any[] = [];


  ngOnInit(): void {
    if (localStorage.getItem("jwt") != null) {
      this.isLoggedIn = true
    }
    if (this.isLoggedIn) {
      this.http.get("https://localhost:44307/api/student", {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': 'http://localhost:4200',
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        })
      }).subscribe(response => {
        this.students = <any>response;
      }, err => {
        console.log(err)
      });
    }
  }

  logOut() {
    // debugger;
    // this;
    console.log(localStorage.getItem("jwt"));
    this.isLoggedIn = false;
    localStorage.removeItem("jwt");
    console.log(localStorage.getItem("jwt"));
    this.router.navigate(['/loggedout']);

 }

  deleteButton(id:any){
    const url = "https://localhost:44307/api/student/"+id;
    this.http.delete(url, {
          headers: new HttpHeaders({
            "Content-Type": "application/json",
            "Authorization": "Bearer "+localStorage.getItem("jwt")
          })})
        .subscribe(response => {
          this.ngOnInit();
        }, err => {
          console.log(err)
        })
  }

  edit(id:any){
    this.router.navigate(['/edit', { id: id }]);
  }

}
