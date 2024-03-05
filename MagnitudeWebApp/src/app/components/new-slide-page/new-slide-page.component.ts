import { Component, OnInit, Input, EventEmitter, Output  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private route: ActivatedRoute, private router: Router,private service: AuthService) { }
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
        });
      }
      Screen(text: string) {
        if(text == "Capture"){
          this.router.navigate(['/contactlist']);
        }
        alert(text);
      }      
}
