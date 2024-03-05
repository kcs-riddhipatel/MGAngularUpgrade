import { Component, OnInit, Input, EventEmitter, Output  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
interface IconItem {
  icon: string;
  text: string;
  className: string;
  count: number;
}
@Component({
  selector: 'app-new-slide-page',
  templateUrl: './new-slide-page.component.html',
  styleUrls: ['./new-slide-page.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('3s cubic-bezier(0.25, 0.8, 0.25, 1)', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('3s cubic-bezier(0.25, 0.8, 0.25, 1)', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
 
})

export class NewSlidePageComponent{
  @Input() image: any;
  @Input() activityName!: string;

  constructor(private route: ActivatedRoute, private router: Router,private service: AuthService,private http: HttpClient) { }
  @Output() close = new EventEmitter<void>();

  closePopup() {
    this.close.emit();
  }
  GetContatlist(){
    this.router.navigate(['/contactlist']);
  }
  flexItems: IconItem[] = [];
  
      ngOnInit(): void {
        this.service.GetIconMaster().subscribe((fields: IconItem[]) => {
          this.flexItems = fields;
          console.log(fields);
        });
        this.getData();
      }
      Screen(text: string) {
        if(text == "Capture"){
          this.router.navigate(['/contactlist']);
        }
      }     

      getData() {
        const requestData = {
          ActivityId: 12237,
          AppUserId: 24701,
          IsOut: true
        };
      
        this.http.post<any>('http://webapi.test2.magnitudefb.com/api/Common/GetInOutGraphData', requestData).subscribe(
          (data) => {
            console.log(data);
          },
          (error) => {
            console.error('Error fetching data:', error);
          }
        );
      }
      
}
