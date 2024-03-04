import { Component, OnInit, Input, EventEmitter, Output  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

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

  constructor(private route: ActivatedRoute, private router: Router) { }
  @Output() close = new EventEmitter<void>();

  closePopup() {
    this.close.emit();
  }
  GetContatlist(){
    this.router.navigate(['/contactlist']);
  }

    flexItems = [
      { icon: 'assignment', text: 'Capture', count: 10 , className: 'captureicon' },
      { icon: 'comment', text: 'Feedback', count: 5 , className: 'Feedbackicon'},
      { icon: 'assessment', text: 'Analysis', count: 0 , className:'Analysisicon'},
      { icon: 'description', text: 'Draft', count: 3 ,className: 'Drafticon'},
      { icon: 'description', text: 'Draft', count: 3 ,className: 'Drafticon'}
    ];
  
  
}
