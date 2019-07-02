import { Component, OnDestroy, ChangeDetectorRef, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { Subject, timer } from 'rxjs';
import { AccountLogin } from 'src/app/shared/interfaces/account';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './page-login.component.html',
    styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void>;

    submitted: boolean;
    loging: boolean;
    formLogin: FormGroup;
    message: string;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private cd: ChangeDetectorRef,
        private user: UserService
    ) { }

    ngOnInit(): void {
        this.destroy$ = new Subject();
        this.submitted = false;
        this.loging = false;
        this.formLogin = this.formBuilder.group({
            password: ['', [Validators.required, Validators.minLength(4)]]
        });

        this.message = "";
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    // convenience getter for easy access to form fields
    get f() { return this.formLogin.controls; }

    submitLogin(): void {
        this.submitted = true;

        // stop here if form is invalid
        if (this.formLogin.invalid) return;

        if (this.loging) return;
        this.loging = true;
        let value = this.formLogin.value;
        let createDate = new Date();
        let expires = new Date();
        expires.setMonth(expires.getMonth() + 2);

        const acc: AccountLogin = {
            password: value['password'],
            createDate: createDate,
            expires: expires
        }

        timer(1000).pipe(takeUntil(this.destroy$)).subscribe({
            next: _ => {
                this.user.login(acc).subscribe({
                    next: _ => {
                        // update local storage
                        localStorage.setItem('account', JSON.stringify(acc));
                        this.router.navigate(['/']);
                        // update status form
                        this.message = "";
                        this.loging = false;
                        this.cd.markForCheck();
                    },
                    error: err => {
                        // update status form
                        this.message = "Đăng nhập thất bại :( !";
                        this.loging = false;
                        this.cd.markForCheck();
                    }
                })
            }
        })
    }
}
