import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,  Validators } from '@angular/forms';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  itemForm: FormGroup;
  submitted = false;
  itemsList = [];
  isItemShow = true;

  constructor(private listService: ItemsService, private FormBuilder:FormBuilder) { }

  /**
   * ngOnInit() life cycle method
   * to initialize the add item form and get the list of items from db
   */
  ngOnInit(): void {
    
    this.itemForm = this.FormBuilder.group({
      name: ['',Validators.required],
      price: ['', Validators.required]
    })

    this.getAllItemsList();

    this.listService.soldOrderUpdate$.subscribe((data) => {
      this.getAllItemsList();
    })
  }

  /**
   * Get all list items from server
   */
  getAllItemsList() {
    this.listService.getAllItems().subscribe((itemsList) => {
      this.itemsList = itemsList;
      this.listService.itemsList$.next(itemsList);
    }, (err) => {
      console.log('Error while getting all list items');
    });
  }

  get f(){
    return this.itemForm.controls;
  }

  /**
   * Form submit action
   * @returns
   */
  onSubmit() {
    this.submitted = false;
    if (this.itemForm.valid) {
      const anyDuplicate = this.itemsList.filter((item) => item.name === this.itemForm.value.name);
      if (anyDuplicate.length > 0) {
        alert('item is already exist, try another one');
        return;
      }
      const requestData = {
        name: this.itemForm.value.name,
        price: this.itemForm.value.price,
        date: new Date(),
        sold: "0"
      };
      this.listService.addItemService(requestData).subscribe((data) => {
        this.itemsList.push(requestData);
        this.itemForm.reset();
        this.isItemShow = !this.isItemShow;
      }, err => {
        alert('Error in while submiting data, try again');
      })
    } else {
      this.submitted = true;
    }
    
  }

}
