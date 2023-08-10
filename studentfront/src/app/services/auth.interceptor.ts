import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
      constructor(private login:LoginService){}
      intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("hello");
    if(this.login.getToken()!=null){
      console.log(this.login.getToken());
    request = request.clone({ 
      setHeaders: {  
        Authorization: `${this.login.getToken()}`
      }  
    });  
  }  return next.handle(request); 
  }  
  }


//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     // Add the token to the Authorization header
//     let authReq = request;
//     const token = this.login.getToken();
//     if(token!=null){
//         authReq = authReq.clone({setHeaders:{Authorization:`${token}`},
//     });
//     }
//     return next.handle(authReq);
//   }
// }

