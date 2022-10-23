import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
// import { map, catchError } from 'rxjs/operators;
import { Book } from '../app/books/book';
import { environment } from 'src/environments/environment';
import { results } from '../app/books/results';
import { BookToUser } from 'src/app/books/bookToUser';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiServerUrl = environment.apiBaseUrl;

  // Built-in httpclient to make http requests
  constructor(private http: HttpClient) {}

  public getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiServerUrl}/book/all`);
  }

  public searchByTitle(title: string): Observable<results> {
    return this.http.get<results>(
      `https://www.googleapis.com/books/v1/volumes?q=title:${title}`
    );
  }

  public getBookByISBN(isbn: String): Observable<Book | null> {
    return this.http.get<Book | null>(`${this.apiServerUrl}/book/isbn:${isbn}`);
  }

  public addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.apiServerUrl}/book/add`, book);
  }

  public subscribeBook(r: BookToUser): Observable<BookToUser> {
    return this.http.post<BookToUser>(`${this.apiServerUrl}/r/subscribe`, r);
  }

  public unsubscribeBook(isbn: string, name: string): Observable<number> {
    return this.http.delete<number>(
      `${this.apiServerUrl}/r/unsubscribe:${isbn}&${name}`
    );
  }
}
