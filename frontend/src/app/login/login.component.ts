import { Component, OnInit } from '@angular/core';
import {RestapiService} from '../restapi.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  inputs : ['account_ids'],
})
export class LoginComponent implements OnInit {

  public account_ids:any= '';
  public accountid : any = '';
  public contract_details : any = '';
  public isLoading : boolean = true;
  public isGetInfo : boolean = false;
  public isAddress : boolean = true;


  constructor(private restservice : RestapiService) { this.isLoading = true; this.isGetInfo = false; this.isAddress = true}

  ngOnInit() {  
   this.getContracts();   
  }


  public getContracts(){
    this.isLoading = true;
    this.restservice.get_contracts().subscribe(
      res=>{
        console.log("success")
        this.account_ids = res.json();
        this.isLoading = false;
      }, (err) => {
        console.log("falied")
      });
  }

  public getContractDetails(account:string){

    if(account!=''){
    this.isAddress= true;
    this.isLoading = true;
    this.restservice.get_contract_details(account).subscribe(
      res => {
            res=>res.json();
            this.contract_details = res.json();
            console.log("success"+JSON.stringify(res.json()));
            this.isGetInfo = true;
            this.isLoading = false;
          }, (err) => {
            console.log("error")
          });
    }else{
      console.log("no");
      this.isAddress= false;
    }
  }

  public onclick(account_id : string){
    console.log("Accountid is :"+account_id);
    this.accountid = account_id;
  }

}
