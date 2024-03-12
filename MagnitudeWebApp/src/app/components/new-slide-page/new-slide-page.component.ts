import { Component, OnInit, Input, EventEmitter, Output  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import {  NgZone } from '@angular/core';
import Chart from 'chart.js/auto';

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
  inCountData: number[] = [];
  outCountData: number[] = [];
  inCount: number = 0;
  outCount: number = 0;

  constructor(private route: ActivatedRoute, private router: Router,private service: AuthService,private http: HttpClient,private ngZone: NgZone) { }
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
            ActivityId: 11859,
            AppUserId: 5866,
            IsOut: true
        };
        
        this.http.post<any>('https://webapi.qc.magnitudefb.com/api/Common/GetInOutGraphData', requestData).subscribe(
            (dataArray) => {
                const data = dataArray[0];
                console.log(data);
                this.inCountData = data.InCount ? data.InCount.split(',').map(Number).reverse() : [];
                this.outCountData = data.OutCount ? data.OutCount.split(',').map(Number).reverse() : [];
                this.inCount = this.inCountData.reduce((a, b) => a + b, 0); 
                this.outCount = this.outCountData.reduce((a, b) => a + b, 0); 
                if(this.inCountData.length>0 || this.outCountData.length>0){
                this.ngZone.runOutsideAngular(() => {
                this.createChart(this.inCountData, this.outCountData);
              });
              } 
            },
            (error) => {
                console.error('Error fetching data:', error);
            }
        );
    }
     
  createChart(inCountData: number[], outCountData: number[]) {
    var ctx = (document.getElementById('myChart') as HTMLCanvasElement | null)?.getContext('2d');
   
    if (ctx) {
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array.from({ length: inCountData.length }, (_, i) => (i + 1).toString()),
                datasets: [
                    {
                        label: 'Out Count',
                        data: outCountData,
                        backgroundColor: 'rgba(255, 0, 0, 0.2)',
                        borderColor: 'rgba(255, 0, 0, 1)',
                        borderWidth: 2,
                        pointBackgroundColor: 'rgba(255, 0, 0, 1)',
                        pointBorderColor: 'rgba(255, 0, 0, 1)'
                    },
                    {
                        label: 'In Count',
                        data: inCountData,
                        backgroundColor: 'rgba(20, 169, 20, 0.2)',
                        borderColor: 'rgba(20, 169, 20, 1)',
                        borderWidth: 1,
                        pointBackgroundColor: 'rgba(20, 169, 20, 1)',
                        pointBorderColor: 'rgba(20, 169, 20, 1)'
                    }
                ]
            },
            options: {
                animation: {
                    duration: 1500,
                    easing: 'easeInOutQuart'
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: '#025764'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#025764'
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Last 30 Days',
                        color: '#025764',
                        position: 'bottom',
                        font: {
                            size: 20
                        }
                    },
                    legend: {
                        labels: {
                            color: '#025764'
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        titleColor: 'white',
                        bodyColor: 'white',
                        borderColor: 'white',
                        borderWidth: 1,
                        caretPadding: 10
                    }
                }
            }
        });
    } else {
        console.error("Could not find canvas element with id 'myChart'");
    }
}
}
