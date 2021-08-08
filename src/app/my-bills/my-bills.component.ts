import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-my-bills',
  templateUrl: './my-bills.component.html',
  styleUrls: ['./my-bills.component.scss']
})
export class MyBillsComponent implements OnInit {

  bills = [];
  constructor(private listService: ItemsService) { }

  /**
   * ngOnInit life cycle method
   * to get the all bill details list
   */
  ngOnInit(): void {
    this.getOrders();
    this.listService.billOrder$.subscribe((data) => {
      this.getOrders();
    });
  }

  /**
   * Get the all bill order list
   */
  getOrders() {
    this.listService.getAllBills().subscribe((data) => {
      this.bills = data;
    }, (err) => {
      console.log(err);
    })
  }

  /**
   * Formt the date to readable string from DD/MM/YYYY
   * @param dateString
   * @returns 
   */
  getDate(dateString: string) {
    const date = new Date(dateString);
    return date.getDate() + "/" + (date.getMonth() + 1) + '/' + date.getFullYear();
  }

}
