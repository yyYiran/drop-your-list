import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'drop-your-list';

  constructor(private userSerVice: UserService, private router: Router) {}

  currentusername: string | null = null;
  // currentMyBooks!: string[];

  ngOnInit() {
    this.userSerVice.currentUserName.subscribe(
      (name) => (this.currentusername = name)
    );
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   this.getMyBooks();
  // }

  login() {
    this.router.navigateByUrl('/login');
  }

  logout() {
    this.userSerVice.updateCurrentUser(null);
    this.router.navigateByUrl('/login');
  }
}
