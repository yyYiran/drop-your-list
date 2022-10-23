import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { Book } from '../books/book';
import { User } from './user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  public users!: User[];

  currentusername!: string | null;
  currentMyBooks!: string[];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.currentUserName.subscribe((name) => {
      this.currentusername = name;
    });
    this.userService.currentMyBooks.subscribe((books) => {
      this.currentMyBooks = books;
    });
    this.getMyBooks();
  }

  // ngOnChanges(changes: SimpleChanges): void

  public getMyBooks() {
    this.userService.getBooksByUser(this.currentusername + '').subscribe({
      next: (res) => {
        console.log('init: ' + res);
        this.userService.updateCurrentMyBooks(res);
      },
    });
  }
}
