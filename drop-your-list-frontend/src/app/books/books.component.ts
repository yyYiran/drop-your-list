import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Book } from './book';
import { BookService } from '../../services/book.service';
import { catchError } from 'rxjs';
import { UserService } from 'src/services/user.service';
import { BookToUser } from './bookToUser';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  // inject service
  public books!: Book[];
  constructor(
    private bookService: BookService,
    private userService: UserService
  ) {}

  currentusername!: string | null;
  currentMyBooks!: string[];

  ngOnInit(): void {
    console.log(this.currentMyBooks);
    this.displayAllBooks();
    this.userService.currentUserName.subscribe((name) => {
      this.currentusername = name;
    });
    this.userService.currentMyBooks.subscribe((books) => {
      console.log('jiu' + books);
      this.currentMyBooks = books;
    });
  }

  public displayAllBooks(): void {
    this.bookService.getAllBooks().subscribe(
      (res: Book[]) => {
        this.books = res;
      },
      (err: HttpErrorResponse) => {
        console.error(err.message);
      }
    );
  }

  // call this function when this component is loaded
  /**
   * Set books when receive response from server
   */
  public onOpenModal(book: Book | null, mode: string) {
    const btn = document.getElementById('dialogBtn');
    if (mode == 'add') {
      btn?.setAttribute('data-target', '#addBookModal');
    }
    btn?.click();
  }

  /**
   * isAdded
   */
  // public isAdded(isbn: string): boolean {

  // }
  /**
   * onSubscribe
   */
  public onSubscribe(isbn: string) {
    const subscription: BookToUser = {
      isbn: isbn,
      name: this.currentusername + '',
    };

    // checkDuplicate
    this.bookService.getBookByISBN(isbn).subscribe({
      next: (book) => {
        if (this.currentMyBooks.includes(book!.title)) {
          alert(book!.title + ' has been added!');
          return;
        } else {
          this.bookService.subscribeBook(subscription).subscribe({
            next: (r) => {
              this.userService.addCurrentMyBooks(book!.title);
            },
            error: (err) => {
              console.error(err);
            },
          });
        }
      },
    });
  }

  onUnsubscribe(isbn: string) {
    this.bookService.getBookByISBN(isbn).subscribe({
      next: (book) => {
        this.bookService
          .unsubscribeBook(isbn, this.currentusername + '')
          .subscribe({
            next: (num) => {
              this.userService.removeCurrentMyBooks(book!.title);
            },
          });
      },
    });
  }

  /**
   * onSubmitAddBook
   */
  public onSubmitAddBook(form: NgForm) {
    const isbn = (<Book>form.value).isbn;
    const title = (<Book>form.value).title;

    this.bookService.getBookByISBN(isbn).subscribe({
      next: (res) => {
        if (res != null) {
          alert(title + ' exists');
          this.onClear();
          return;
        } else {
          this.bookService.addBook(form.value).subscribe({
            next: (res) => {
              this.displayAllBooks();
              // reset and exit form

              (<HTMLButtonElement>(
                document.getElementById('close-form')
              )).click();
            },
            error: (err) => {
              console.error(err);
              catchError(err);
            },
          });
        }
      },
    });
  }

  public checkDuplicate(isbn: string) {
    this.bookService.getBookByISBN(isbn).subscribe({
      next: (res) => {
        return res == null;
      },
      error: (e) => {
        console.log(e);
        catchError(e);
      },
    });
  }

  public onClear() {
    (<HTMLFormElement>document.getElementById('addForm')).reset();
    (<HTMLInputElement>document.querySelector('.image-modal img')).src =
      '../../assets/PH_IMG.png';
  }

  /**
   * onEnter
   */
  public onEnter(event: KeyboardEvent) {
    if (event.key == 'Enter') {
      document.getElementById('search')?.click();
    }
  }
  /**
   * onSearch
key: string   */
  public onSearch(k: string, form: NgForm) {
    if (k.trim() == '') return;
    this.bookService.searchByTitle(k).subscribe(
      (res) => {
        if (res.totalItems > 0) {
          const info = res.items[0].volumeInfo;
          const title = info.title;
          const author =
            typeof info.authors != 'undefined' ? info.authors.toString() : '';
          const isbn = info.industryIdentifiers[0].identifier;
          const imageUrl =
            typeof info.imageLinks != 'undefined'
              ? info.imageLinks.thumbnail
              : '';

          form.setValue({
            title: title,
            author: author,
            isbn: isbn,
            imageUrl: imageUrl,
          });
          // (<HTMLInputElement>document.getElementById('title')).value = title;
          // (<HTMLInputElement>document.getElementById('author')).value = author;
          (<HTMLInputElement>document.querySelector('.image-modal img')).src =
            imageUrl;
        }
      },
      (err: HttpErrorResponse) => {
        console.error(err.message);
      }
    );
    // const author = document.getElementById('author');
    // (<HTMLInputElement>author).value = 'clown';
  }
}
