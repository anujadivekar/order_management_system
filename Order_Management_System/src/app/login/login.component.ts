import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  public userDetails = [
    {
      name: "Anuja",
      address: "Warvand,Pune",
      phoneNo: "9876543211",
      order: [
        {
          orderNo: "1",
          orderItem: "Mobile",
          orderDueDate: "04-05-2022"
        },
        {
          orderNo: "2",
          orderItem: "TV",
          orderDueDate: "05-05-2022"
        },
      ]
    },

    {
      name: "Rutuja",
      address: "Wakad,Pune",
      phoneNo: "7876543211",
      order: [
        {
          orderNo: "1",
          orderItem: "TV",
          orderDueDate: "05-05-2022"
        }
      ]
    },

    {
      name: "Gayatri",
      address: "Mumbai",
      phoneNo: "7776543211",
      order: [
        {
          orderNo: "1",
          orderItem: "Mobile",
          orderDueDate: "06-05-2022"
        },
        {
          orderNo: "2",
          orderItem: "TV",
          orderDueDate: "07-05-2022"
        },
        {
          orderNo: "3",
          orderItem: "Laptop",
          orderDueDate: "08-05-2022"
        }
      ]
    },
  ]

  ngOnInit(): void {
    debugger
    let userName: any = (<HTMLInputElement>document.getElementById('userName'));
    let password: any = (<HTMLInputElement>document.getElementById('password'));
    userName.value = localStorage.getItem("userName");
    password.value = localStorage.getItem("password");
    
    let newUser = localStorage.getItem('newUser');
    if(newUser){
      this.userDetails.push(JSON.parse(newUser));
    }

    localStorage.setItem('newUser','')
    localStorage.setItem('userDetails',JSON.stringify(this.userDetails))

  }

  public validateCredentials() {
    let userName = (<HTMLInputElement>document.getElementById('userName')).value;
    let password = (<HTMLInputElement>document.getElementById('password')).value;
    let rememberMe = (<HTMLInputElement>document.getElementById("rememberMe"));
    if(userName.length<3){
      alert("User name should be minimum 3 char long")
    }
    if(password.length<3){
      alert("Password should be minimum 3 char long")
    }

    if ((userName != null) && (password != null)) {
      let ind=0;
      for(let i of this.userDetails){
        if(i.name.toLowerCase() == userName.toLowerCase()){
          ind = 0
        }
        else{
          ind = ind + 1;
        }
      }
      debugger
      if(this.userDetails.length == ind){
        alert("User name is not registered")
        return;
      }
      sessionStorage.setItem("userName", userName);
      sessionStorage.setItem("password", password);
      if (rememberMe.checked) {
        localStorage.setItem("userName", userName);
        localStorage.setItem("password", password);
      } else {
        localStorage.setItem("userName", "");
        localStorage.setItem("password", "");
      }
      this.router.navigate(['/order']);
    }

  }
}
