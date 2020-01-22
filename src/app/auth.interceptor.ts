import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<HttpEventType.Response>> {
    // const authReq = req.clone({
    //   setHeaders: { Authorization: `Bearer authtest` }
    // });
    // console.log('intercept');
    console.log(req);
    // console.log(next);
    return next.handle(req);
  }

}
