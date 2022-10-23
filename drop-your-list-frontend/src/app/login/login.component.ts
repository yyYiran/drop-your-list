import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/services/user.service';

import { User } from '../user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  //
  protected name!: string;
  protected password!: string;
  msg!: HTMLDivElement;

  constructor(private userSerVice: UserService, private router: Router) {}

  ngOnInit(): void {
    this.msg = <HTMLDivElement>document.getElementById('msg');
  }

  onClear() {
    // reset name and password to null
    (<HTMLFormElement>document.getElementById('loginForm')).reset();
  }

  private reminder(reminder: string) {
    this.msg.innerHTML = reminder;
  }

  onLogin() {
    // console.log(this.name, this.password);
    // Check if user exist, if passaword match
    this.userSerVice.lookupAccount(this.name).subscribe({
      next: (user) => {
        // User not exist
        if (user == null) {
          this.reminder('User not exist: ' + this.name);
          return;
        }
        // User password not match
        if (user.password != this.password) {
          this.reminder('Password incorrect: ');
          this.password = '';
          return;
        }
        this.reminder('');
        this.userSerVice.updateCurrentUser(user.name);
        this.router.navigateByUrl('/me');
        // alert(this.name + ' logged in');
      },
    });
    // console.log(this.name + ' is', this.password);
  }

  onSignup() {
    this.userSerVice.lookupAccount(this.name).subscribe({
      next: (user) => {
        // User already exist
        if (user != null) {
          this.reminder('Username already exist: ' + this.name);
          this.name = '';
          return;
        }

        if (this.password.length < 4) {
          this.reminder('Password must be at least 4 characters long. ');
          this.password = '';
          return;
        }

        this.userSerVice.signup(this.name, this.password).subscribe({
          next: (user) => {
            this.reminder(`Welcome ${this.name}! Now login. `);
          },
        });
      },
    });
  }
}
