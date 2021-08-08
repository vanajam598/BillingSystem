import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,  Validators } from '@angular/forms';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-new-bill',
  templateUrl: './new-bill.component.html',
  styleUrls: ['./new-bill.component.scss']
})
export class NewBillComponent implements OnInit {

  itemsList = [];
  seleteItemForm: FormGroup;
  newBillItems = [];
  submitted = false;
  isNewBillShow = true;

  constructor(private listService: ItemsService, private FormBuilder:FormBuilder) { }

  /**
   * ngOnInit() life cycle method
   */
  ngOnInit(): void {
    
    this.seleteItemForm = this.FormBuilder.group({
      name: ['',Validators.required],
      quantity: ['', Validators.required]
    })

    this.listService.itemsList$.subscribe((data) => {
      this.itemsList = data;
    });
  }

  get f(){
    return this.seleteItemForm.controls;
  }

  /**
   * Calculate the total of all items in the cart
   * @returns
   */
  getTotal() {
    let total = 0;
    this.newBillItems.forEach((item) => {
      total+= Number(item.total)
    });
    return total;
  }

  /**
   * Select item sumit action
   * @returns
   */
  onSubmit() {
    this.submitted = false;
    if (this.seleteItemForm.valid) {
      const anyDuplicate = this.newBillItems.filter((item) => item.name === this.seleteItemForm.value.name);
      if (anyDuplicate.length > 0) {
        alert('item is already in cart, try another one');
        return;
      }
      const itemInfo = this.itemsList.filter((item) => item.name === this.seleteItemForm.value.name);
      const requestData = {
        id: itemInfo[0].id,
        sold: itemInfo[0].sold,
        name: this.seleteItemForm.value.name,
        price: itemInfo[0].price,
        quantity: this.seleteItemForm.value.quantity,
        total: Number(itemInfo[0].price) * Number(this.seleteItemForm.value.quantity),
        date: new Date()
      };
      this.newBillItems.push(requestData);
      this.seleteItemForm.reset();
      this.isNewBillShow = !this.isNewBillShow;
      
    } else {
      this.submitted = true;
    }
    
  }

  /**
   * Place order action and save the item in server (json-server)
   * @returns
   */
  checkout() {
    if (this.newBillItems.length == 0) {
      alert("Cart is empty, click plus symbol to add items");
      return;
    }
    let requestData = {
      billId: "BILL" + (new Date()).getTime(),
      orderDate: new Date(),
      items: this.newBillItems,
      total: this.getTotal()
    };
    this.listService.orderBill(requestData).subscribe((data) => {
      this.newBillItems = [];
      this.listService.billOrder$.next(data);
      // Update the sold vaue in selected items
      requestData.items.forEach((item, index) => {
        this.listService.updateItem({
          id: item.id,
          sold: Number(item.sold) + Number(item.quantity)
        }).subscribe((data) => {
          console.log(data);
          // trigger the event to refresh the itesm in the app-items component
          if (requestData.items.length === (index + 1)) {
            this.listService.soldOrderUpdate$.next(data);
          }
        });
      });
    }, err => {
      alert('Error in while submiting data, try again');
    })
  }

}
