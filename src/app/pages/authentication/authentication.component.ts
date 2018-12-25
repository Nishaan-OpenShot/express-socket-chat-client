import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

/* Importing services starts*/
import { FormService } from './../../services/form/form.service';
import { ChatService } from './../../services/chat/chat.service';
/* Importing services ends*/

/* importing interfaces starts */
import { UsernameAvailable } from './../../interfaces/username-available';
import { Auth } from './../../interfaces/auth';
/* importing interfaces ends */

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  public setTabPosition = 'center';
  public isuserNameAvailable = false;
  public overlayDisplay = false;
  public loginError =  false;

  private registrationForm: FormGroup;
  private loginForm: FormGroup;

  constructor(
    private router: Router,
    private formService: FormService,
    private chatService: ChatService) {
      this.registrationForm = this.formService.createRegistrationForm();
      this.loginForm = this.formService.createLoginForm();
     }

  ngOnInit() {
  }

  login(): void {
    if (this.loginForm.valid) {
      this.overlayDisplay = true;
      this.chatService.login(this.loginForm.value).subscribe(
        (response: Auth) => {
          this.overlayDisplay = false;
          localStorage.setItem('userid', response.userId);
          this.router.navigate(['/pages/home']);
        }, (error) => {
          /* Uncomment it, Incase if you like to reset the Login Form. */
          // this.loginForm.reset();
          this.overlayDisplay = false;
          this.loginError =  true;
        });
    }
  }

  register(): void {
    if (this.registrationForm.valid) {
      this.overlayDisplay = false;
      this.chatService.register(this.registrationForm.value).subscribe(
        (response: Auth) => {
          localStorage.setItem('userid', response.userId);
          this.router.navigate(['/home']);
        },
        (error) => {
          this.overlayDisplay = true;
           /* Uncomment it, Incase if like to reset the Login Form. */                    // this.registrationForm.reset();
           alert('Something bad happened; please try again later.');
        }
      );
    }
  }

  getUsernameSuggestion(): void {
    this.registrationForm.controls['username'].valueChanges
    .pipe(
      map((term) => {
        this.isuserNameAvailable = false;
        return term;
      })
    ).pipe(
      debounceTime(800),
      distinctUntilChanged()
    )
    .subscribe((term: string) => {
      if(term !== '') {
        this.overlayDisplay = true;
        this.chatService.usernameAvailable(term).subscribe((response: UsernameAvailable) => {
          this.overlayDisplay = false;
          if (response.error) {
            this.isuserNameAvailable = true;
          } else {
            this.isuserNameAvailable = false;
          }
        });
      }
    });
  }

}
