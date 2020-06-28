import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-password-page',
  templateUrl: './password-page.component.html',
  styleUrls: ['./password-page.component.css']
})
export class PasswordPageComponent implements OnInit {

  form: FormGroup;
  user: string;

  constructor(
    private api: ApiService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.api.getUser().subscribe(user => this.user = user.email);
    this.form = new FormGroup({
      newPassword: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  save() {
    this.api.changePassword(this.form.value).subscribe(res => {
      alert(res.message);
      this.router.navigate(['/login']);
    });
  }
}
