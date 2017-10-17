import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute, Params} from '@angular/router';
import {RestapiService} from '../restapi.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-createproject',
  templateUrl: './createproject.component.html',
  styleUrls: ['./createproject.component.css']
})
export class CreateprojectComponent implements OnInit {

  address :any = '';
  project_title: any = '';
  funding_goal: any = '';
  token: any = '';
  project_end_date : any = '';
  project_end_time : any = '';
  project_creation_response : any ='';
  project_ends : any = '';
  public isLoading : boolean = true;


  constructor(private route : ActivatedRoute , private restservice : RestapiService , private router : Router , private location: Location) { 
    this.isLoading=true;
  }

  ngOnInit() {
  	
    this.address = this.route.snapshot.params['accountid'];
  	this.project_title = this.route.snapshot.params['project_title'];
  	this.funding_goal = this.route.snapshot.params['funding_goal'];
  	this.token = this.route.snapshot.params['token'];
    this.project_end_date = this.route.snapshot.params['project_end_date'];
  	this.project_end_time = this.route.snapshot.params['project_end_time'];
    this.project_ends = this.project_end_date+"T"+this.project_end_time;

    if(this.address =="" || typeof this.address=='undefined'||
       this.project_title =="" || typeof this.project_title=='undefined'||
       this.funding_goal =="" || typeof this.funding_goal=='undefined'||
       this.token =="" || typeof this.token=='undefined'||
       this.project_end_date =="" || typeof this.project_end_date=='undefined'||
       this.project_end_time =="" || typeof this.project_end_time=='undefined'){
          this.router.navigate(["/login"], {relativeTo: this.route});
        }else {
            this.create_project(this.address,this.project_title,this.funding_goal ,this.token,this.project_ends  );
        }
   }

  public create_project(address : string, _title:string , _funding_goal: number , _tokens : number , _project_end_date : string){
    
    this.isLoading=true;
    this.restservice.post_project_as_owner(address,_title,_funding_goal,_tokens,_project_end_date).subscribe(
      res=>{
      	res=> res.json();
      	this.project_creation_response = res.json();
         this.isLoading=false;
      }, (err) => {
        console.log("falied project_owner_details")
      });
  }


  public goBack(){
    this.location.back(); // <-- go back to previous location on cancel
  }
}
