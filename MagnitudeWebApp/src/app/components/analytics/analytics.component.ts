import { Component, OnInit } from '@angular/core';
import * as chartJs from 'chart.js';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  analyticsChart!: Chart;

  ngOnInit() {
    this.analyticsChart = new Chart('analyticsChart', {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
          {
            label: 'My Analytics Dataset',
            data: [20, 39, 56, 42, 59],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  
  updateAnalyticsChart(newData: number[]) {
    this.analyticsChart.data.datasets[0].data = newData;
    this.analyticsChart.update();
  }
}
