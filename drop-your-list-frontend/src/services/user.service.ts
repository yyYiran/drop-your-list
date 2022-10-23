import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BookToUser } from 'src/app/books/bookToUser';
import { User } from 'src/app/user/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  /**
   * signup
name: string, password: string   */
  public signup(name: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiServerUrl}/login/signup`, {
      name,
      password,
    });
  }

  private username = new BehaviorSubject<string | null>(null);
  currentUserName = this.username.asObservable();

  private myBooks = new BehaviorSubject<string[]>([]);
  currentMyBooks = this.myBooks.asObservable();

  public updateCurrentUser(n: string | null) {
    this.username.next(n);
  }

  public addCurrentMyBooks(n: string) {
    this.myBooks.next(this.myBooks.value.concat(n));
  }

  public removeCurrentMyBooks(n: string) {
    const index = this.myBooks.value.indexOf(n, 0);
    if (index > -1) {
      this.myBooks.value.splice(index, 1);
    }
    this.myBooks.next(this.myBooks.value);
  }

  public updateCurrentMyBooks(n: string[]) {
    this.myBooks.next(n);
  }

  /**
   * lookupAccount
name: string   */
  public lookupAccount(name: string): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/login/lookup/${name}`);
  }

  /**
   * getAllUsers
   */
  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/login/all`);
  }

  public getBooksByUser(name: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiServerUrl}/book/user:${name}`);
  }

  public getUsersByBook(isbn: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiServerUrl}/book/book:${isbn}`);
  }
}
