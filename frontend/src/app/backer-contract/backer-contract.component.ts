import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute, Params} from '@angular/router';
import {RestapiService} from '../restapi.service';
@Component({
  selector: 'app-backer-contract',
  templateUrl: './backer-contract.component.html',
  styleUrls: ['./backer-contract.component.css']
})
export class BackerContractComponent implements OnInit {

  address :any = '';
  backer_info : any = '';
  project_info : any = '';
  public invest_amount : any = '';
  public isLoading : boolean = true;
  public isBackerLoading : boolean = true;

  constructor(private route : ActivatedRoute , private restservice : RestapiService , private router : Router ) { this.isLoading = true; this.isBackerLoading = true;}

  ngOnInit() {
  	this.address = this.route.snapshot.params['address'];
     if(this.address =="" || typeof this.address=='undefined'){
          this.router.navigate(["/login"], {relativeTo: this.route});
        }else {
              this.getProjects();
        }
  }


   public backers_details( address : string ){
     this.isBackerLoading = true;
    this.restservice.get_backers_details(address).subscribe(
      res=>{
      	this.backer_info = res.json();
       this.isBackerLoading = false;
      }, (err) => {
        console.log("falied backers_details")
      });
  }


    public getProjects(){
    this.isLoading = true;
    this.restservice.get_projects().subscribe(
      res=>{
        this.project_info = res.json();
        console.log("projects are :"+JSON.stringify(res.json()));
        this.isLoading = false;
        this.backers_details(this.address);
      }, (err) => {
        console.log("falied backers_details")
      });
  }

}
