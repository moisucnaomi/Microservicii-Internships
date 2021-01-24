import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private snackBar: MatSnackBar,
                private router:Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 400) {
                switch(err.error.Message){
                    case "Error.ExistingEmail":
                    {
                        this.openSnackBar("There is already an user with this email. Please choose a different one and try again!");
                        break;
                    }
                    case "Error.InvalidCredentials":
                    {
                        this.openSnackBar("Invalid email or password!");
                        break;
                    }
                    default:
                            this.openSnackBar("An error has occured!");
                }
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }

    private openSnackBar(message: string) {
        this.snackBar.open(message, '', {verticalPosition: "top", duration: 6000});
      }
}