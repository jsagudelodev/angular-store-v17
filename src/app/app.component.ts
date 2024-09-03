import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';
import { TokenService } from './services/token.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-APIS-v17';
  imgParent = '';
  showImg = true;
  token = '';
  imgRta = '';
  /**
   *
   */
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private filesService: FilesService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    const token = this.tokenService.getToken();
    if (token) {
      console.log('token');
      this.authService.getProfile().subscribe();
    }
  }

  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toogleImg() {
    this.showImg = !this.showImg;
  }

  createUser() {
    this.usersService
      .create({
        name: 'sebas',
        email: 'sebas@email.com',
        password: '1212',
        role: 'customer',
      })
      .subscribe((rta) => {
        console.log(rta);
      });
  }

  login() {
    this.authService.login('mor_2314', '83r5^_').subscribe((rta) => {
      this.token = rta.access_token;
      console.log(this.token);
    });
  }

  getProfile() {
    this.authService.getProfile().subscribe((profile) => {
      console.log(profile);
    });
  }

  downloadPdf() {
    this.filesService
      .getFile(
        'my.pdf',
        'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf',
        'application/pdf'
      )
      .subscribe();
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.filesService.uploadFile(file).subscribe((rta) => {
        this.imgRta = rta.location;
      });
    }
  }
}
