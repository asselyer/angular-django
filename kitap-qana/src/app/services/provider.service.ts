import { Injectable, EventEmitter } from '@angular/core';
import { MainService } from './main.service';
import {HttpClient} from '@angular/common/http';
import { BookList } from '../models/book-list';
import { Book } from '../models/book';
import { AuthResponse } from '../auth-response';
import { ShopList } from '../models/shop-list';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {

  public sendMessage = new EventEmitter<string>();

  constructor(http: HttpClient) {
    super(http);
  }

  getBookLists(): Promise<BookList[]> {
    return this.get('http://localhost:8000/api/book_list/', {});
  }

  getBooks(book_list: BookList): Promise<Book[]> {
    return this.get(`http://localhost:8000/api/book_list/${book_list.id}/books/`, {});
  }

  createBook(name: any, price: any,author: any, genre: any, rating: any): Promise<BookList> {
    return this.post('http://localhost:8000/api/book_list/', {
      name: name,
      price: price,
      author: author,
      genre: genre,
      rating: rating
    });
  }
  createShopList(name: any): Promise<ShopList> {
    return this.post('http://localhost:8000/api/shop_list/', {
      name: name,
    });
  }

  updateBookList(book_list: BookList): Promise<BookList> {
    return this.put(`http://localhost:8000/api/book_list/${book_list.id}/`, {
      name: book_list.name,
      author: book_list.author,
      price: book_list.price,
      genre: book_list.genre,
      rating: book_list.rating
    });
  }

  deleteBookList(id: number): Promise<any> {
    return this.delet(`http://localhost:8000/api/book_list/${id}/`, {});
  }

  auth(login: string, password: string): Promise<AuthResponse> {
    return this.post('http://localhost:8000/api/login/', {
      username: login,
      password: password
    });
  }

  logout(): Promise<any> {
    return this.post('http://localhost:8000/api/logout/', {});
  }

}