import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {AuthenticationService} from "./authentication.service";
import {Router} from "@angular/router";
import {NotyfService} from "../notyf/notyf.service";
import {Injectable} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class ClientInterceptor implements HttpInterceptor{

  constructor(private authService : AuthenticationService, private router: Router, private notyfService: NotyfService, private translateService: TranslateService,) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const access_token = this.authService.getToken();
    req = this.addToken(req, access_token);

    return next.handle(req).pipe(
      catchError(
        (err: HttpErrorResponse) => {

          if(err.status === 500){
            this.doUnknown(err.message);
          }

          else if( err.status === 401 ){

            this.doExpiredSession();

          } else if( err.status === 403 ){

            this.doForbiddenAccess();

          } else if (err.status === 400) {
            this.notyfService.showNotyf("error", 'bad credentials');
          }

          return throwError("Unknown Error");
        }
      )
    );
  }

  private addToken (request : HttpRequest<any> , token : string) {
    return request.clone({
      setHeaders: {
        Authorization : `Bearer ${token}`
      }
    });
  }

  private doExpiredSession(){

    this.notyfService.showNotyf("warning", this.translateService.instant('notyf.session-expired'));
    this.notyfService.showNotyf("warning", this.translateService.instant('notyf.session-expired'));
    this.notyfService.showNotyf("warning", this.translateService.instant('notyf.session-expired'));
    this.authService.logout();

    this.router.navigate(["/login"]);
  }

  private doForbiddenAccess() {

    this.notyfService.showNotyf("error", this.translateService.instant('forbidden-access-page.popup'));
    this.notyfService.showNotyf("error", this.translateService.instant('forbidden-access-page.popup'));
    this.notyfService.showNotyf("error", this.translateService.instant('forbidden-access-page.popup'));

    this.router.navigate(["/forbidden"]);
  }

  private doUnknown(message : string) {

    this.notyfService.showNotyf("error", message);
    this.notyfService.showNotyf("error", message);
    this.notyfService.showNotyf("error", message);
  }
}
