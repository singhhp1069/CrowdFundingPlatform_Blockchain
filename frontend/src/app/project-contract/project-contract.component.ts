import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute, Params} from '@angular/router';
import {RestapiService} from '../restapi.service';

@Component({
  selector: 'app-project-contract',
  templateUrl: './project-contract.component.html',
  styleUrls: ['./project-contract.component.css']
})
export class ProjectContractComponent implements OnInit {

  constructor(private route : ActivatedRoute , private restservice : RestapiService , private router : Router ) { this.isLoading = true; }


  address :any = '';
  project_info : any = '';
  public project_title : string = '';
  public funding_goal : number = 0;
  public token : number = 0;
  public project_end_date : string = '' ;
  public project_end_time : string = '';
  public isLoading : boolean = true;
  public momentValue  : any = '';
 


  ngOnInit() {
  	this.address = this.route.snapshot.params['address'];
    if(this.address =="" || typeof this.address=='undefined'){
          this.router.navigate(["/login"], {relativeTo: this.route});
        }else {
            this.project_owner_details(this.address);
        }
  }

  public project_owner_details(address : string){
    this.isLoading = true;
  	console.log("project_owner_details called" +address);
    this.restservice.get_project_owner_details(address).subscribe(
      res=>{
      	this.project_info = res.json();
        // console.log("Result Project "+JSON.stringify(res.json()));
        this.isLoading = false;
      }, (err) => {
        console.log("falied project_owner_details")
      });
  }

}
