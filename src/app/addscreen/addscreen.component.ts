import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addscreen',
  templateUrl: './addscreen.component.html',
  styleUrls: ['./addscreen.component.css']
})
export class AddscreenComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  public name: string = '';
  public lastName: string = '';
  public isLoggedIn: boolean = false;
  public id: any;
  public student: any = {};
  public isEdit: boolean = false;

  ngOnInit(): void {
    if (localStorage.getItem("jwt") != null) {
      this.isLoggedIn = true
    }
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    })
    if (this.id != null && this.id != '') {
      const url = "https://localhost:44307/api/student/"+this.id;
      this.http.get(url, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:4200",
          "Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        })
      }).subscribe(response => {
        this.student = response;
        console.log(this.student);
        this.lastName = this.student.lastName;
        this.name = this.student.name;
        this.isEdit = true;
      }, err => {
        alert(err);
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

 }

  save(){
    // debugger;
    const body = {
      id: (Math.floor(Math.random() * 1000000) + 1),
      name: this.name,
      lastName: this.lastName
    };
    const url = "https://localhost:44307/api/student";
    this.http.post(url, body, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      "Authorization": "Bearer "+localStorage.getItem("jwt")
      })
    }).subscribe(response => {
      this.name = '';
      this.lastName = '';
      alert("Successfully added");      
    }, err => {
      alert(err);
    });
  }

  edit(){
    // debugger;
    const body = {
      id: parseInt(this.id),
      name: this.name,
      lastName: this.lastName
    };
    const url = "https://localhost:44307/api/student/"+this.id;
    this.http.put(url, body, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      "Authorization": "Bearer "+localStorage.getItem("jwt")
      })
    }).subscribe(response => {
      this.name = '';
      this.lastName = '';
      this.router.navigate(['/dashboard']);
      alert("Successfully edited");      
    }, err => {
      alert(err);
    });
  }

}
