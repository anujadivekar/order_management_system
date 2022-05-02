import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  public customerName: any;
  public currentUser: any;
  public orderIndex = 4;
  public currentOrderDetails: any = {
    orderId: ""
  };
  public dates = ["03-05-2022","04-05-2022","05-05-2022","06-05-2022","07-05-2022"];
  public productList = ["Mobile", "TV", "Laptop", "Fridge", "Oven", "Table", "Fan"];
  
  public userDetails:any;
  constructor() { }

  ngOnInit(): void {
    let userString:any = localStorage.getItem('userDetails')
    this.userDetails = JSON.parse(userString);

    let ind = 1;
    for (let i of this.userDetails) {
      if (i.name.toLowerCase() == sessionStorage.getItem("userName")?.toLowerCase()) {
        this.currentUser = i;
        ind = 0
      }
      // ind = ind + 1;
    }
    // if(this.userDetails.length == ind){
    //  let newUser =  {
    //     name: localStorage.getItem("userName"),
    //     address: "",
    //     phoneNo: "",
    //     order: [
    //       {
    //         orderNo: "1",
    //         orderItem: "Mobile",
    //         orderDueDate: "04-05-2022"
    //       },
    //       {
    //         orderNo: "2",
    //         orderItem: "TV",
    //         orderDueDate: "05-05-2022"
    //       },
    //     ]
    //   } 
    // }
  }

  editRecord(orderId: any) {
    this.currentUser.order[parseInt(orderId) - 1].orderItem = (<HTMLInputElement>document.getElementById("product")).value;

    let random = Math.floor(Math.random() * this.dates.length);
    this.currentUser.order[parseInt(orderId) - 1].orderDueDate = this.dates[random];
  }

  deleteRecord(orderId: any) {
    if(confirm("Do you really want to remove this item?")){
      this.currentUser.order.splice(parseInt(orderId), 1)
    }
  }

  getOrderDetails(orderId: any) {
    this.currentOrderDetails = this.currentUser.order[orderId]
  }

  placeOrder(){
    let newProduct = {
      orderNo:"",
      orderItem:"",
      orderDueDate:""
    }
    newProduct.orderItem=(<HTMLInputElement>document.getElementById("newProduct")).value;
    let random = Math.floor(Math.random() * this.dates.length);
    newProduct.orderDueDate = this.dates[random]; 
    newProduct.orderNo = this.currentUser.order.length+1;

    this.currentUser.order.push(newProduct);
  }
}
