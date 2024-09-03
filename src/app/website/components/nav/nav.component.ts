import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { User } from 'src/app/models/user.model';
import { CategoriesService } from '../../../services/categories.service';
import { StoreService } from 'src/app/services/store.service';
import { Category } from '../../../models/category';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  activeMenu = false;
  counter = 0;

  profile: User | null = null;
  categories: Category[] = [];
  /**
   *
   */
  constructor(
    private authService: AuthService,
    private storeService: StoreService,
    private categoriesService: CategoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllCategories();

    this.authService.user$.subscribe((data) => {
      this.profile = data;
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    this.authService
      .loginAndGet('admin@mail.com', 'admin123')
      .subscribe((user) => {
        //this.profile = user;
        this.router.navigate(['/profile']);
      });

    //this.authService.login('john@mail.com', 'changeme').subscribe((rta) => {
    // console.log(rta);
    //});

    //this.authService.loginAndGet('mor_2314', '83r5^_').subscribe((user) => {

    //});

    //this.authService.login('mor_2314', '83r5^_').subscribe((user) => {
    //  console.log(user);
    //});
  }

  getAllCategories() {
    this.categoriesService.getAll().subscribe((data) => {
      this.categories = data;
      console.log(JSON.stringify(data));
    });
  }

  logout() {
    this.authService.logout();
    this.profile = null;
    this.router.navigate(['/home']);
  }
}
