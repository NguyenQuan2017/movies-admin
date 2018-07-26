import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: any;

  constructor(private http: HttpClient, private userService: UserService) {
    this.getUsers();
  }

  ngOnInit() {
  }
  getUsers() {
    return this.userService.getAllUser().subscribe(users => {
        this.users = users['data'].users;
        console.log(this.users);
      });
  }
}
