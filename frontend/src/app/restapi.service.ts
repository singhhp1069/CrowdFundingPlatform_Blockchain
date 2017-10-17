import { Injectable } from '@angular/core';
import { Http , Response ,Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class RestapiService {


  public _url:string ="http://localhost:8080/";

  constructor(private http: Http) { }

    /* GET API 
    *********
    *********
    *******/
	
  	// Returns json array about available accounts on testrpc.
  	public get_contracts() {
    return this.http.get(this._url);
  	}

  	// Returns json data about account (project_owner_address, backer_address).
  	public get_contract_details(accountid : string) {
	  return this.http.get(this._url+accountid);
  	}


    /* BAKERS API 
    ***********
    **********
    *********/
   
  	// Returns json data about a backer. and deploy contract as backer
  	public get_backers_details(accountid : string) {
	  return this.http.get(this._url+'backer/backer/'+accountid);
  	}

    // Returns json data about successful funding.
    public fund_project_as_backer(accountid : string , projectid : string , _funding :number){
    let post_url = this._url+'backer/'+accountid;
    let body = { project_address : projectid , funding:_funding };
    let headers : Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(post_url , body , {headers: headers})
    .catch(this.error_handler);
    }

     /* PROJECT API 
    ***********
    **********
    *********/

  	// Returns json data about project owner. and deploy contract as project owner
  	public get_project_owner_details(accountid : string) {
	  return this.http.get(this._url+'project_owner/'+accountid);
  	}

  	// Returns json data about project owner.
  	public post_project_as_owner(accountid : string , _title:string , _funding_goal: number , _tokens : number , _project_end_date : string) {
  	let post_url = this._url+'project_owner/'+accountid;
  	let body = { project_title : _title , project_funding_goal:_funding_goal , tokens : _tokens , project_end_date : _project_end_date };
  	let headers : Headers = new Headers();
    headers.append('Content-Type', 'application/json');
  	return this.http.post(post_url , body , {headers: headers})
  	.catch(this.error_handler);
  	}

  	// Returns json data about successful deletion of a project.
  	public delete_project(accountid : string , projectid : string){
  	let post_url = this._url+'project_owner/'+accountid;
  	let body = { project_address : projectid };
  	let headers : Headers = new Headers();
    headers.append('Content-Type', 'application/json');
	  return this.http.delete(post_url ,new RequestOptions({
   	headers: headers,
   	body: body}))
  	.catch(this.error_handler);
  	}

    // Returns json data about successful withdrawing.
    public widraw_funding(accountid : string , projectid : string ){
    let post_url = this._url+'project_owner/'+accountid;
    let body = { project_address : projectid};
    let headers : Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(post_url , body , {headers: headers})
    .catch(this.error_handler);
    }



    //Get the List of project
    public get_projects() {
    return this.http.get(this._url+'backer/projects');
    }


  	
    /*  API ERROR HANDLER 
    ***********
    **********
    *********/

  	//Error Handler in Response
  	private error_handler(err: Response){
  		console.log('Error occurred :' + err);
  		return Observable.throw (err || 'some error on server');
  	}
}

