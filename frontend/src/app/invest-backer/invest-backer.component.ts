import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute, Params} from '@angular/router';
import {RestapiService} from '../restapi.service';

@Component({
  selector: 'app-invest-backer',
  templateUrl: './invest-backer.component.html',
  styleUrls: ['./invest-backer.component.css']
})
export class InvestBackerComponent implements OnInit {



 public isLoading : boolean = true;
 invest_amount : any = '';
 backer_address :any = '';
 project_address: any = '';
 public invest_info : any = '';

  constructor(private route : ActivatedRoute , private restservice : RestapiService , private router : Router) { 
    this.isLoading=true;
  }


  ngOnInit() {
  	this.backer_address = this.route.snapshot.params['accountid'];
  	this.project_address = this.route.snapshot.params['project_address'];
  	this.invest_amount = this.route.snapshot.params['invest_amount'];

    if(this.backer_address =="" || typeof this.backer_address=='undefined'
      ||this.project_address =="" || typeof this.project_address=='undefined'
      ||this.invest_amount =="" || typeof this.invest_amount=='undefined'){
          this.router.navigate(["/login"], {relativeTo: this.route});
        }else {
              this.invest_backer(this.backer_address , this.project_address , this.invest_amount);
        }
  }

  public invest_backer( backer_address : string  , project_address : string , invest_amount: number){
    this.isLoading = true;
    this.restservice.fund_project_as_backer(backer_address,project_address , invest_amount).subscribe(
      res=>{
      	this.invest_info = res.json();
      	console.log("investment result "+JSON.stringify(this.invest_info));
       this.isLoading = false;
      }, (err) => {
        console.log("falied backers_details")
      });
  }
}
