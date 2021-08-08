import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

interface ItemModal {
  name: string;
  price: string | number;
  sold: string | number;
  date: any;
}

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  public itemsList: ItemModal[] = [];
  public billInfo = [];
  public itemsList$ = new BehaviorSubject([]);
  public billOrder$ = new BehaviorSubject([]);
  public soldOrderUpdate$ = new BehaviorSubject([]);

  constructor(private http: HttpClient) {}

  addItemService(data): Observable<any> {
    return this.http.post('http://localhost:3001/items', data);
  }

  updateItem(data): Observable<any> {
    return this.http.patch('http://localhost:3001/items/' + data.id, data);
  }

  getAllItems(): Observable<any> {
    return this.http.get('http://localhost:3001/items');
  }

  orderBill(data): Observable<any> {
    return this.http.post('http://localhost:3001/orderItems', data);
  }

  getAllBills(): Observable<any> {
    return this.http.get('http://localhost:3001/orderItems');
  }
}

