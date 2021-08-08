import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  today = 0;
  thisMonth = 0;
  thisYear = 0;

  constructor(private listService: ItemsService) { }

  /**
   * ngOnInt() life cycle method
   */
  ngOnInit(): void {
    this.getOrders();
    this.listService.billOrder$.subscribe((data) => {
      this.getOrders();
    });
  }

  /**
   * Get the all order bill details
   */
  getOrders() {
    
    this.listService.getAllBills().subscribe((data = []) => {
      this.today = this.thisMonth = this.thisYear = 0;
      data.forEach(billItem => {
          let date = new Date(billItem.orderDate);
          let today = new Date();
          let daysDiff = this.findNoOfDays(today, date);
          if (daysDiff === 0) { // today
            this.today += Number(billItem.total);
          }
          if (daysDiff <= 30) { // this month
            this.thisMonth += Number(billItem.total);
          }
          if(daysDiff <=365) { // this year
            this.thisYear += Number(billItem.total);
          }
      });
    }, (err) => {
      console.log(err);
    })
  }

  /**
   * Calculate the days between two dates
   * @param today
   * @param date 
   * @returns 
   */
  findNoOfDays(today, date) {
    return Math.round((today - date) / (1000 * 3600 * 24));
  }

}
