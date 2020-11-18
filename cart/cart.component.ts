import { Component, OnInit } from '@angular/core';
import {  UserCrudService } from "../../components/user-crud.service";
import { AuthService } from 'src/app/shared/services/auth.service';
import { DishesComponent } from '../dishes/dishes.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  Items:any;
  ItemName:string;
  ItemImage:string;
  ItemDescription:string;
  ItemCost:number;
  message:string;
  payMode=false;
  cartMode=true;
  cardModeCod=false;
  cardModeOnline=false;
  constructor(public authService: AuthService,private usercrudservice:UserCrudService) { }


  ngOnInit(): void {
    this.usercrudservice.get_AllitemCart().subscribe(data => {
      this.Items = data.map( e => {
        return{
          isEdit:false,
          id:e.payload.doc.id,
          ItemName:e.payload.doc.data()['Itemname'],
          ItemImage:e.payload.doc.data()['ItemImage'],
          ItemDescription:e.payload.doc.data()['ItemDescription'],
          ItemCost:e.payload.doc.data()['ItemCost']
        };
      })
      console.log(this.Items);
    })
  }

  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.maxLength(4),
      Validators.minLength(4)
    ]),
    phone1: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(10)
    ]),
    date1: new FormControl('', [
      Validators.required
    ])
   });

   form2 = new FormGroup({
     firstName: new FormControl('', Validators.required),
     lastName: new FormControl('', Validators.required),
     email: new FormControl('', [
       Validators.required,
       Validators.email
     ]),
     phone1: new FormControl('', [
       Validators.required,
       Validators.maxLength(10),
       Validators.minLength(10)
     ]),
     address: new FormControl('', Validators.required),
    });

  DeleteRecordCart(itemId){
    this.usercrudservice.delete_item(itemId);
  }
  goPay(){
    this.payMode=true;
    this.cartMode=false;
  }

  goCart(){
    this.payMode=false;
    this.cartMode=true;
    this.cardModeCod=false;
    this.cardModeOnline=false;
  }
  goCardCod(){
    this.cardModeCod=true;
    this.cardModeOnline=false;
  }
  goCardOnline(){
    this.cardModeCod=false;
    this.cardModeOnline=true;
  }

total=0;
i=0;
   sums(){
     this.i=0;
     this.total=0;
     while(this.Items[this.i].ItemCost){
        this.total=this.total+Number(this.Items[this.i].ItemCost);
        this.i=this.i+1;
      }
 }
payed(){
  alert('payment success')
  this.form.reset();
  this.i=0;
  while(this.Items[this.i]){
  this.usercrudservice.delete_item(this.Items[this.i].id);
  this.i=this.i+1;
}
this.i=0;
this.total=0;
this.payMode=false;
this.cartMode=true;
this.cardModeCod=false;
this.cardModeOnline=false;
}
 }
