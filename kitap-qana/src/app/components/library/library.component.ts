import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BookList } from 'src/app/models/book-list';
import { Book } from 'src/app/models/book';
import { ProviderService } from 'src/app/services/provider.service';
import { ShopList } from 'src/app/models/shop-list';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  public output = '';
  public stringArray: string[] = [];

  public booklists: BookList[] = [];
  public loading = false;

  public books: Book[] = [];
  public shoplist: ShopList[] = [];


  public name: any = '';
  public price: any = '';
  public author: any = '';
  public genre: any = '';
  public rating: any = '';

  constructor(private provider: ProviderService) {
  }

  ngOnInit() {

    this.provider.getBookLists().then(res => {
      this.booklists = res;
      setTimeout(() => {
        this.loading = true;
      }, 2000);
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

  createShopList(l: BookList) {
      this.provider.createShopList(l.id).then(res => {
        console.log(l.name + ' deleted');
        this.provider.getBookLists().then(r => {
          this.booklists = r;
        });
      });
    }
    

}