import { Router, ActivatedRoute} from '@angular/router';
import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from 'app/services/auth.service';



@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  formLogin: FormGroup;
  invalidLogin: boolean;
  userType: any;
  userID: any;
  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService, private route: ActivatedRoute) {
    this.formLogin = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    })

   }

   get username() {
      return this.formLogin.get('email');
   }

   get password() {
     return this.formLogin.get('password');
   }

  // Login function
  login(event: Event) {
    this.auth.login(this.formLogin.value).subscribe(result => {
      if (result['state']) {
        // this.router.navigate(['user/employee']);
        // const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        // this.router.navigate([returnUrl || 'dashboard']);

        this.userType = result['response']['message'].usertype;
        this.userID = result['response']['message'].id;
         console.log(this.userType);  // test for user type value
         console.log(this.userID);  // test for user type value

        // switch on user type to show user specific views
        switch (this.userType) {
          case 'officer':
            this.router.navigate(['officer/dashboard']);
            break;
          case 'admin':
            this.router.navigate(['admin/dashboard']);
            break;

          default:
            this.router.navigate(['user/employee']);
            break;
        }
      } else {
        this.invalidLogin = true;
        this.formLogin.reset();
      }
    });
  }

}
