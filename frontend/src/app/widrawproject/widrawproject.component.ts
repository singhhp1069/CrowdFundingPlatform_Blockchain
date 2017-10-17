import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute, Params} from '@angular/router';
import {RestapiService} from '../restapi.service';

@Component({
  selector: 'app-widrawproject',
  templateUrl: './widrawproject.component.html',
  styleUrls: ['./widrawproject.component.css']
})
export class WidrawprojectComponent implements OnInit {


	public project_address: any = '';
	public account_address : any = '';
  public result :any = '';
  public isLoading : boolean = true;

  constructor(private route : ActivatedRoute , private restservice : RestapiService , private router : Router) { this.isLoading = true; }


  ngOnInit() {
  	 this.account_address = this.route.snapshot.params['accountid'];
  	 this.project_address = this.route.snapshot.params['project_address'];
  	 if(this.account_address =="" || typeof this.account_address=='undefined'||
       this.project_address =="" || typeof this.project_address=='undefined'){
          this.router.navigate(["/login"], {relativeTo: this.route});
        }else {
            this.widraw_project(this.account_address ,this.project_address);
        }
  }

  public widraw_project(address : string , project_address: string){
    this.isLoading = true; 
    this.restservice.widraw_funding(address,project_address).subscribe(
      res=>{
        console.log("success widraw_funding"+JSON.stringify(res.json()));
        this.result = res.json();
        this.isLoading = false; 
      }, (err) => {
        console.log("falied widraw_funding");
      });
  }
}