import { BrowserModule } from '@angular/platform-browser';
import { Article } from './../movie';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  articles: any[] = [];
  articlesFull: any = [];
  adminArticles:any[]=[];

  selectedArticle: Article;

  adminName: string = "";

  isLoggedIn: boolean = false;

  showAddForm:boolean = false;
  showEditForm:boolean = false;

  public searchTerm: string = '';

  public headline: string = '';
  public text: string = '';
  public description: string = '';
  public imgsrc: string = '';


  constructor(private http: HttpClient, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let id = params.get('userName');
      this.adminName = id;
    })
    if (localStorage.getItem("jwt")!=null){
      this.isLoggedIn = true
    }
      this.http.get("https://localhost:5001/api/news", {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Authorization": "Bearer "+localStorage.getItem("jwt")
        })
      }).subscribe(response => {
        this.articlesFull = response;
        this.articles = this.articlesFull;
        if (this.adminName!=null) {
          this.articles.forEach(element => {
            if (element.owner == this.adminName) {
              console.log("radi petlja");
              this.adminArticles.push(element);
            }
          });
        }
      }, err => {
        console.log(err)
      });
  }

  editButton(){
    this.showEditForm=!this.showEditForm;
  }
  onSelect(article: Article): void {
    this.selectedArticle = article;
  }

  logOut() {
    // debugger;
    // this;
    console.log(localStorage.getItem("jwt"));
    this.isLoggedIn = false;
    localStorage.removeItem("jwt");
    console.log(localStorage.getItem("jwt"));

 }

 showAdd(){
   this.showAddForm = !this.showAddForm;
 }
  backButton(): void {
    this.selectedArticle = null;
  }

  saveEdit(){
    debugger;
    const body = {
      id: this.selectedArticle.id,
      naslov: this.selectedArticle.naslov,
      podnaslov: this.selectedArticle.podnaslov,
      text: this.selectedArticle.text,
      img: this.selectedArticle.img,
      owner: this.selectedArticle.owner
    };
    const url = "https://localhost:5001/api/news?id="+this.selectedArticle.id+"&naslov="+this.selectedArticle.naslov+"&podnaslov="+this.selectedArticle.podnaslov+"&text="+this.selectedArticle.text+"&img="+this.selectedArticle.img+"&owner="+this.selectedArticle.owner;
    this.http.post(url, body, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      "Authorization": "Bearer "+localStorage.getItem("jwt")
      })
    }).subscribe(response => {
      this.showEditForm = false;
      this.selectedArticle = null;
      alert("success");
      this.http.get("https://localhost:5001/api/news", {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Authorization": "Bearer "+localStorage.getItem("jwt")
        })
      }).subscribe(response => {
        this.articlesFull = response;
        this.articles = this.articlesFull;
      }, err => {
        console.log(err)
      });
    }, err => {
      alert(err);
    });
  }

  save(){
    // debugger;
    const body = {
      id: (Math.floor(Math.random() * 1000000) + 1).toString(),
      naslov: this.headline,
      podnaslov: this.description,
      text: this.text,
      img: this.imgsrc,
      owner: this.adminName
    };
    const url = "https://localhost:5001/api/news?id="+body.id+"&naslov="+body.naslov+"&podnaslov="+body.podnaslov+"&text="+body.text+"&img="+body.img+"&owner="+body.owner;
    this.http.post(url, body, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      "Authorization": "Bearer "+localStorage.getItem("jwt")
      })
    }).subscribe(response => {
      this.showAddForm = false;
      alert("added");
      this.http.get("https://localhost:5001/api/news", {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Authorization": "Bearer "+localStorage.getItem("jwt")
        })
      }).subscribe(response => {
        this.articlesFull = response;
        this.articles = this.articlesFull;
      }, err => {
        console.log(err)
      });
    }, err => {
      alert("failed");
    });

  }

  deleteButton(){
    const url = "https://localhost:5001/api/news?id="+this.selectedArticle.id;
    this.http.delete(url, {
          headers: new HttpHeaders({
            "Content-Type": "application/json",
            "Authorization": "Bearer "+localStorage.getItem("jwt")
          })})
        .subscribe(() =>  this.http.get("https://localhost:5001/api/news", {
          headers: new HttpHeaders({
            "Content-Type": "application/json",
            "Authorization": "Bearer "+localStorage.getItem("jwt")
          })
        }).subscribe(response => {
          this.selectedArticle = null;
          this.articlesFull = response;
          this.articles = this.articlesFull;
        }, err => {
          console.log(err)
        }))
  }

  inputFn(searchValue: string) {
    if (searchValue.length>0){
      this.searchTerm = searchValue;
    } else this.searchTerm = "";
    if (searchValue.length > 3) {
      setTimeout(() => {
        if (searchValue.length > 3) {
          this.articles = [];
          this.articlesFull.forEach(element => {
            if(element.naslov.includes(searchValue)){
              this.articles.push(element);
            }
          });
        } else {
          this.articles = this.articlesFull;
        }       
      }, 1000);
    } else {
       this.articles = this.articlesFull;
    } 
  }

}
