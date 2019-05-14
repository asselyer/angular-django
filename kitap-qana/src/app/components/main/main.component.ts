import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BookList } from 'src/app/models/book-list';
import { Book } from 'src/app/models/book';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public output = '';
  public stringArray: string[] = [];

  public booklists: BookList[] = [];
  public loading = false;

  public books: Book[] = [];

  public name: any = '';
  public price: any = '';
  public author: any = '';
  public genre: any = '';
  public rating: any = '';

  public isLogged = false;

  public login = '';
  public password = '';

  constructor(private provider: ProviderService) {
  }

  ngOnInit() {

    const token = localStorage.getItem('token');
    if (token) {
      this.isLogged = true;
      
    }

    if (this.isLogged) {
      this.getBookLists();
      
      
    }

  }

  getBookLists() {
    this.provider.getBookLists().then(res => {
      this.booklists = res;
      this.loading = true;
    });
  }

  getBooks(t: BookList) {
    this.provider.getBooks(t).then(res => {
      this.books = res;
    });
  }

  sendMessageByService() {
    this.provider.sendMessage.emit('This message From Parent Component');
  }

  updateBookList(l: BookList) {
    this.provider.updateBookList(l).then(res => {
      console.log(l.name, l.author, l.price, l.genre, l.rating + ' updated');
    });
  }

  deleteBookList(l: BookList) {
    this.provider.deleteBookList(l.id).then(res => {
      console.log(l.name + ' deleted');
      this.provider.getBookLists().then(r => {
        this.booklists = r;
      });
    });
  }

  createBook() {
    if (this.name !== '' && this.price !== '' && this.author && this.genre !== '' && this.rating ) {
      this.provider.createBook(this.name, this.price, this.author, this.genre, this.rating).then(res => {
        this.name = '';
        this.price = '';
        this.author = '';
        this.genre = '';
        this.rating = '';
        this.booklists.push(res);

      });
    }
  }

  auth() {
    if (this.login !== '' && this.password !== '') {
      this.provider.auth(this.login, this.password).then(res => {
        localStorage.setItem('token', res.token);
        this.isLogged = true;
        this.getBookLists();
      });
    }
  }

  logout() {
    this.provider.logout().then(res => {
      this.isLogged = false;
      localStorage.clear();
    });
  }

}