import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  username: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.useraliasObservable.subscribe(name => {
      this.username = name;
    });
  }

  public login() {
    this.authService.login();
  }

  public logout() {
    this.authService.logout();
  }

  public isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
