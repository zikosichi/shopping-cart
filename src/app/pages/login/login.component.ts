import { Component, OnInit, OnChanges } from '@angular/core';
import { AngularFire } from 'angularfire2';

import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	private email: string = '';
	private password: string = '';
	private errorMsg: string = '';

	private isLoginPage: boolean = true;

	constructor(private router: Router, private route: ActivatedRoute, private af: AngularFire, private user:UserService) { }

	ngOnInit() {
		var self = this;


		// Getting parameter from route. If it is login -> show login screen
		// If register then show register screen
		this.route.params.subscribe(params => {
			this.errorMsg = '';
			if (params['login'] == 'login') {
				self.isLoginPage = true;
			} else {
				self.isLoginPage = false;
			}
		});
	}

	// Login user
	login() {
		var self = this;
		self.errorMsg = '';
		this.af.auth.login({
			email: self.email,
			password: self.password
		})
			.then(function (response) {
				self.user.login(response.uid, self.email);
				self.router.navigate(['/']);
			})
			.catch((ex: any) => {
				if (ex.code == "auth/user-not-found") {
					self.errorMsg = "User not found"
				}
				if (ex.code == "auth/invalid-email") {
					self.errorMsg = "Email is not valid"
				}
				if (ex.code == "auth/wrong-password") {
					self.errorMsg = "Password is incorrect"
				}

			});
	}

	// Register new user
	register(){
		var self = this;
		self.errorMsg = '';
		this.af.auth.createUser({
			email: self.email,
			password: self.password
		})
			.then(function (response) {
				self.user.login(response.uid, self.email);
				self.router.navigate(['/']);
			})
			.catch((ex: any) => {
				if (ex.code == "auth/email-already-in-use") {
					self.errorMsg = "Email is already in use"
				}
				if (ex.code == "auth/invalid-email") {
					self.errorMsg = "Email is not valid"
				}
				if (ex.code == "auth/weak-password") {
					self.errorMsg = "Password should be at least 6 characters"
				}				
			});
	}

}
