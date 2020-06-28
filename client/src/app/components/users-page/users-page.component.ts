import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements OnInit {

  users = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getUsers().subscribe(users => this.users = users);
  }

}
