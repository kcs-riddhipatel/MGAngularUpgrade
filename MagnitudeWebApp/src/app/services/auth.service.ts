import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient,private dialog: MatDialog) { }

  apiUrl = environment.apiUrl;
  private jwtHelper = new JwtHelperService();
 
  login(username: string, password: string ) {
    const requestData = { UserName: username, Password: password , Resolution: "",
    AzureFlag: false,
    IMEID: "",
    TokenId: "",
    DeviceType: "",
    CurrentAppVersion: ""};
    return this.http.post<any>(`http://webtest.magnitudefb.com/api/Authentication/Login`, requestData).pipe(
      tap((response) => {
        console.log(response);
        if (response && response.UserInfo.JWTToken) {
          localStorage.setItem('access_token', response.UserInfo.JWTToken);
          localStorage.setItem('email', response.email);
        }
      },(err:HttpErrorResponse)=>{alert("Invalid username & password")})
    );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !this.jwtHelper.isTokenExpired(token);
  }
  logout() {
    localStorage.clear();
  }
  addContact(contact: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Contact`, contact);
  }
  getContact(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/Contact`);
  }
 
  getContactId(contactId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Contact/${contactId}`);
  }
  updateContact(contactId: number, contact: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Contact/${contactId}`, contact);
  }
  deleteContact(contactId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Contact/${contactId}`);
  }

  addCapture(newCapture: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Capture`, newCapture);
  }
  getcapture(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/Capture`);
  }
  GetQuestion(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/Question`);
  }
  GetDynamicFields(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/DynamicFields`);
  }
  GetIconMaster(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/IconMaster`);
  }
  GetFormResponses(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/FormResponses`);
  }
  PostFormResponses(newCapture: {questionID: string; fieldID: string; response: any; }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/FormResponses`, newCapture);
  }
  addCaptureform(formResponses: any[]): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log(formResponses);
    return this.http.post<any>(`${this.apiUrl}/FormResponses`, formResponses, { headers });
  }
}

