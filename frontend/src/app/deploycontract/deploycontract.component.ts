import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute, Params} from '@angular/router';
import {RestapiService} from '../restapi.service';


@Component({
  selector: 'app-deploycontract',
  templateUrl: './deploycontract.component.html',
  styleUrls: ['./deploycontract.component.css']
})
export class DeploycontractComponent implements OnInit {

  constructor(private route : ActivatedRoute , private restservice : RestapiService , private router : Router) { }

  address :any = '';
  contract_details : any = '';

  //Layout String
  layout_info_project :string = '';
  layout_info_backer :string = '';
  layout_button_project :string = '';
  layout_button_backer :string = '';

  ngOnInit() {
  	this.address = this.route.snapshot.params['address'];
      if(this.address =="" || typeof this.address=='undefined'){
          this.router.navigate(["/login"], {relativeTo: this.route});
        }else {
        	this.getContractDetails(this.address);
        }
  }

  set_Layout(){
  	if(this.contract_details.project_owner_address!=null && this.contract_details.backer_address != null){
  		this.layout_info_project = "View As a Project Owner";
  		this.layout_info_backer = "View As a Backer";
  		this.layout_button_project = "View";
  		this.layout_button_backer = "View";
  	}else if(this.contract_details.project_owner_address){
  		this.layout_info_project = "View As a Project Owner";
  		this.layout_info_backer = "Deploy Contract As a Backer";
  		this.layout_button_project = "View";
  		this.layout_button_backer = "Deploy";
  	}else if(this.contract_details.backer_address){
  		this.layout_info_project = "Deploy Contract As a Project Owner";
  		this.layout_info_backer = "Deploy As a Backer";
  		this.layout_button_project = "Deploy";
  		this.layout_button_backer = "View";
  	}else{
  		this.layout_info_project = "Deploy Contract As a Project Owner";
  		this.layout_info_backer = "Deploy Contract As a Backer";
  		this.layout_button_project = "Deploy";
  		this.layout_button_backer = "Deploy";
  	}
  }


  public getContractDetails(account:string){
    this.restservice.get_contract_details(account).subscribe(
      res => {
            res=>res.json()
            this.contract_details = res.json();

            //Set a layout as per user information
            this.set_Layout();
          }, (err) => {
            console.log("error")
          });
  }
}