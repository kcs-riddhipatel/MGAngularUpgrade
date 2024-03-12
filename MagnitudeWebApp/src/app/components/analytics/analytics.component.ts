import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
 
  userWiseActivityList: any[] = [];
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.getActivities();
}
getActivities(): void {
  const url = 'http://webtest.magnitudefb.com/api/Analytics/GetActivities?AppUserId=5337&GroupId=1911';
  this.http.get(url).subscribe(
    (response: any) => {
      console.log('API Response:', response);
      this.userWiseActivityList = response.userWiseActivityList; // Assign the response to userWiseActivityList
    },
    (error) => {
      console.error('Error occurred:', error);
    }
  );
}
}