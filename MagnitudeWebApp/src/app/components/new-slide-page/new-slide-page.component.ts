import { Component, OnInit, Input, EventEmitter, Output  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';
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
          debugger
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
          (dataArray) => {
            const data = dataArray[0];
            this.inCountData = data.InCount ? data.InCount.split(',').map(Number) : [];
            this.outCountData = data.OutCount ? data.OutCount.split(',').map(Number) : [];
            this.createChart(this.inCountData, this.outCountData);
          },
          (error) => {
            console.error('Error fetching data:', error);
          }
        );
      } 

      createChart(inCountData: number[], outCountData: number[]) {
        var ctx = document.getElementById('myChart') as HTMLCanvasElement | null;
        
        // Check if ctx is not null before creating the chart
        if (ctx) {
          var myChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: Array.from({ length: inCountData.length }, (_, i) => (i + 1).toString()), // Generate labels dynamically
              datasets: [
                {
                  label: 'Out Count', // Set label text directly
                  data: outCountData,
                  backgroundColor: 'rgba(255, 0, 0, 0.2)', // Change background color to red
                  borderColor: 'rgba(255, 0, 0, 1)', // Change border color to red
                  borderWidth: 1,
                  pointBackgroundColor: 'rgba(255, 0, 0, 1)', // Change point color to red
                  pointBorderColor: 'rgba(255, 0, 0, 1)' // Change point border color to red
                },
                {
                  label: 'In Count', // Set label text directly
                  data: inCountData,
                  backgroundColor: 'rgba(20, 169, 20, 0.2)', // Change background color to green
                  borderColor: 'rgba(20, 169, 20, 1)', // Change border color to green
                  borderWidth: 1,
                  pointBackgroundColor: 'rgba(20, 169, 20, 1)', // Change point color to green
                  pointBorderColor: 'rgba(20, 169, 20, 1)' // Change point border color to green
                }
             ]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    color: 'white' // Color of y-axis labels
                  }
                },
                x: {
                  ticks: {
                    color: 'white' // Color of x-axis labels
                  }
                }
              },
              plugins: {
                tooltip: {
                  callbacks: {
                    labelColor: (context: any) => ({
                      borderColor: 'white',
                      backgroundColor: 'white'
                    })
                  }
                }
              }
            }
          });
        } else {
          console.error("Could not find canvas element with id 'myChart'");
        }
      }
      
      
      
  
}
