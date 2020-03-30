import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit, AfterViewInit {
  captcha: boolean;
  sitekey: string;

  @ViewChild('grecaptcha') grecaptcha: ElementRef;

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    const captchaHtml = this.grecaptcha.nativeElement;

    // console.log(captchaHtml.getAttribute('hidden'));
    this.sitekey = captchaHtml.getAttribute('data-sitekey');
  }

  onSignupButtonClicked(email: string, password: string) {
    this.authService.signup(email, password, this.sitekey).subscribe(
      (res: HttpResponse<any>) => {
        this.router.navigate(['/lists']);
      },
      e => {
        // if (e.error.captcha) this.router.navigate(['/signup'], {
        //   queryParams: {
        //     captcha: true
        //   }
        // });
        this.captcha = e.error.captcha;
      }
    );
  }
}
