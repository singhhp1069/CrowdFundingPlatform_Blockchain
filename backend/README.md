# Backend

## Description

Backend for the AEC project.

## Backend API endpoints

**Get all available testrpc accounts**
----
  Returns json array about available accounts on testrpc.

* **URL**

  * `/`

* **Method:**

  * `GET`

* **Success Response:**

   * **Content:** `["0x95c6296220947fbe84b2deb44d2b760ed62b13da",
    "0x095e205ca33dac67ab53f36c2740a617e95d3dde",
    "0xc33e49f8533cec7f7370a12d45a4c64d63799718",
    "0x9f06b701b4f098b3ac76900507665ef49d09b804",
    "0x5bc45bdb86038bbcc67fc32a824fef3c64bbae7d",
    "0x882603ab7b7d03c1f939b02b840cb70c27805ed9",
    "0xbc35aca0403ab3bbca09d8dbdea15065f0f78591",
    "0x4c8573602c0f8631aa3c0154b65ffc4594a3241b",
    "0xcc56404da487e3c3628769cfcef758e01a8875db",
    "0xf5405d6f853501a770b8bd284f1018f5abc8709e"]`

* **Sample Call:**

  * `/`

**Get all addresses of an account**
----
  Returns json data about account (project\_owner\_address, backer\_address).

* **URL**

  * `/:address`

* **Method:**

  * `GET`
  
*  **URL Params**
 
  * `address=[string]`

* **Success Response:**

   * **Content:** `{
    "id": 1,
    "account_address": "0x95c6296220947fbe84b2deb44d2b760ed62b13da",
    "project_owner_address": null,
    "backer_address": null
}`

* **Sample Call:**

  * `/0x95c6296220947fbe84b2deb44d2b760ed62b13da`

**Get Backer information**
----
  Returns json data about a backer.

* **URL**

  * `/backer/:address`

* **Method:**

  * `GET`
  
*  **URL Params**
 
   * `address=[string]`

* **Success Response:**

  * **Content:** `{
    "created": false,
    "projects": [
        {
            "project_address": "0x832418a999087c2ea76d8ab8b6862c2aa4704dd0",
            "project_title": "Test Projectssswqwrqrqs",
            "project_funding_goal": "20 ether",
            "project_current_funding": "15 ether",
            "invested_funds": "15 ether",
            "share_token_ownership_amount": "20 share tokens"
        }
    ],
    "success": true,
    "contract_balance": "0 ether",
    "account_balance": "84.999999999998101198 ether"
}`

* **Sample Call:**

  * `/backer/0x95c6296220947fbe84b2deb44d2b760ed62b13da`


**Fund a project as a backer**
----
  Returns json data about successful funding.

* **URL**

  * `/backer/:address`

* **Method:**

  * `PUT`
  
*  **URL Params**
 
   * `address=[string]`

* **Data Params**

  * `{ 
  "project_address": "0x832418a999087c2ea76d8ab8b6862c2aa4704dd0",
  "funding": 15
}`

* **Success Response:**

  * **Content:** `{
    "Succes": true,
    "Result": "0x18a50ddf4b42034c92d55f0436eb83079c817384f61255ec421ea32339dcfb70"
}`
 
* **Error Response:**

  * **Content:** `{
    "Succes": false,
    "Result": "0x18a50ddf4b42034c92d55f0436eb83079c817384f61255ec421ea32339dcfb70"
}`

* **Sample Call:**
  * `/backer/0x95c6296220947fbe84b2deb44d2b760ed62b13da`

**Get information about project owner**
----
  Returns json data about project owner.

* **URL**

  * `/project_owner/:address`

* **Method:**

  * `GET`
  
*  **URL Params**
 
   * `address=[string]`

* **Success Response:**

  * **Content:** `{
    "created": false,
    "success": true,
    "contract_balance": "0",
    "account_balance": "99.999999999998252992",
    "projects": [
        {
            "project_address": "0x832418a999087c2ea76d8ab8b6862c2aa4704dd0",
            "alive": true,
            "project_title": "Test Projectssswqwrqrqs",
            "project_end_date": "2017-06-29T12:50:00",
            "project_funding_goal": "20 ether",
            "project_current_funding": "0 ether",
            "project_share_token": "20 share tokens"
        }
    ]
}`

* **Sample Call:**
  * `/project_owner/0x95c6296220947fbe84b2deb44d2b760ed62b13da`

**Create new project as a project owner**
----
  Returns json data about successful creation of a project.

* **URL**

  * `/project_owner/:address`

* **Method:**

  * `POST`
  
*  **URL Params**
 
   * `address=[string]`

* **Data Params**

  * `{ 
  "project_title": "Test Projectssswqwrqrqs",
  "project_funding_goal": 20,
  "tokens": 20,
  "project_end_date": "2017-06-29T12:50:00"
}`

* **Success Response:**

  * **Content:** `{
    "Succes": true,
    "Result": "0x895d7768dba2fa70c5284e249fd331e57fe0be01f9cb3db6d007c4c38a6b276c"
}`
 
* **Error Response:**

  * **Content:** `{
    "Succes": false,
    "Result": "0x895d7768dba2fa70c5284e249fd331e57fe0be01f9cb3db6d007c4c38a6b276c"
}`

* **Sample Call:**
  * `/project_owner/0x95c6296220947fbe84b2deb44d2b760ed62b13da`

**Withdraw funding of succesful funded project as project owner**
----
  Returns json data about successful withdrawing.

* **URL**

  * `/project_owner/:address`

* **Method:**

  * `PUT`
  
*  **URL Params**
 
   * `address=[string]`

* **Data Params**

  * `{ 
  "project_address": "0x832418a999087c2ea76d8ab8b6862c2aa4704dd0"
}`

* **Success Response:**

  * **Content:** `{
    "success": true,
    "data": "0x52f13b4ab74beceb2704b86273e6f90d61dfcee777cc27db13bfe2b70b7b8dc7"
}`
 
* **Error Response:**

  * **Content:** `{
    "success": false,
    "data": "Get an project owner contract first with GET/project_owner/:youraddress"
}`
  * **Content:** `{
    "success": false,
    "data": "0x52f13b4ab74beceb2704b86273e6f90d61dfcee777cc27db13bfe2b70b7b8dc7"
}`

* **Sample Call:**
  * `/project_owner/0x95c6296220947fbe84b2deb44d2b760ed62b13da`

**Delete project as a project owner**
----
  Returns json data about successful deletion of a project.

* **URL**

  * `/project_owner/:address`

* **Method:**

  * `DELETE`
  
*  **URL Params**
 
   * `address=[string]`

* **Data Params**

  * `{ 
  "project_address": "0x832418a999087c2ea76d8ab8b6862c2aa4704dd0"
}`

* **Success Response:**

  * **Content:** `{
    "success": true,
    "data": "0x52f13b4ab74beceb2704b86273e6f90d61dfcee777cc27db13bfe2b70b7b8dc7"
}`
 
* **Error Response:**
  
  * **Content:** `{
    "success": false,
    "data": "Get an project owner contract first with GET/project_owner/:youraddress"
}`
  * **Content:** `{
    "success": false,
    "data": "0x52f13b4ab74beceb2704b86273e6f90d61dfcee777cc27db13bfe2b70b7b8dc7"
}`

* **Sample Call:**
  * `/project_owner/0x95c6296220947fbe84b2deb44d2b760ed62b13da`

## Usage
1. Start testrpc (normally starts at localhost:8545)
2. Change the entry ETHEREUM_CLIENT_IP in docker-compose.yml to your local IP (ip testrpc is running on)
3. docker-compose up --build