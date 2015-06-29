/// <reference path="../../../../../typings/tsd.d.ts" />

import {Component, View} from 'angular2/angular2';
import {status, json} from '../../../common/fetch'
import {Router, RouterLink} from 'angular2/router';


let styles   = require('./login.css');
let template = require('./login.html');


@Component({
  selector: 'login'
})
@View({
  template:
  `
    <style>
      ${styles}
    </style>
    ${template}
  `,
  directives: [RouterLink]
})
export class Login {
  constructor(public router: Router) {
  }

  login(event, username, password) {
    event.preventDefault();
    window.fetch('http://localhost:8088/api/auth/login/with/%s/and/%s'.sprintf(username, password), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: ''
    })
    .then(status)
    .then(json)
    .then((response) => {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            this.router.parent.navigate('/home');
          })
    .catch((error) => {
             alert(error.message);
             console.log(error.message);
           });
  }

  signup(event) {
    event.preventDefault();
    this.router.parent.navigate('/signup');
  }
}
