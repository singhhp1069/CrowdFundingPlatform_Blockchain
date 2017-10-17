import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute, Params} from '@angular/router';
import {RestapiService} from '../restapi.service';

@Component({
  selector: 'app-deleteproject',
  templateUrl: './deleteproject.component.html',
  styleUrls: ['./deleteproject.component.css']
})
export class DeleteprojectComponent implements OnInit {

	public project_address: any = '';
	public account_address : any = '';
  public result : any = '';
  public isLoading : boolean = true;


constructor(private route : ActivatedRoute , private restservice : RestapiService , private router : Router) { this.isLoading = true;}


  ngOnInit() {
  	 this.account_address = this.route.snapshot.params['accountid'];
  	 this.project_address = this.route.snapshot.params['project_address'];

     if(this.account_address =="" || typeof this.account_address=='undefined'||
       this.project_address =="" || typeof this.project_address=='undefined'){
          this.router.navigate(["/login"], {relativeTo: this.route});
        }else {
           this.project_delete(this.account_address ,this.project_address);
        }

  }

  public project_delete(address : string , project_address: string){
    this.isLoading = true;
  	console.log("project_owner_details called" +address);
    this.restservice.delete_project(address,project_address).subscribe(
      res=>{
        console.log("success project_owner_details"+JSON.stringify(res.json()));
        this.result = res.json();
        this.isLoading = false;
      }, (err) => {
        console.log("falied project_owner_details")
      });
  }
}
