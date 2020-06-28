import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/interfaces';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      // email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  login() {
    this.form.disable();
    this.auth.login(this.form.value).subscribe(res => {
      this.router.navigate(['/notes']);
    },
    error => {
      this.form.enable();
      alert(error.error.message);
    });
  }

  register() {
    this.form.disable();
    this.auth.register(this.form.value).subscribe((user: User) => {
      alert(`${user.email} has been registered`);
    },
    error => {
      this.form.enable();
      alert(error.error.message);
    });
  }
}
