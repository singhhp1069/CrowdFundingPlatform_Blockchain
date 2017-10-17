pragma solidity ^0.4.0;

contract Project_Owner {
    address public project_owner_address;
    address[] projects;
    
    modifier onlyCreator() {
        require(msg.sender == project_owner_address);
        _;
    }
    
    function Project_Owner() {
        project_owner_address = msg.sender;
    }
    
    function createProject(string project_title, uint funding_goal, uint tokens, uint day, uint month, uint year, uint hour, uint minute, uint second) onlyCreator returns (address){
        Project project = new Project(project_title, funding_goal, tokens, day, month, year, hour, minute, second);
        projects.push(project);
		return project;
    }

    function cancelProject(address project_address) onlyCreator{

        var index = projects.length;
        for(uint i = 0; i < projects.length; i++) {
            if(projects[i] == project_address) {
                Project project = Project(projects[i]);
                project.deleteProject();
                delete projects[i];
                index = i;
            }
        }

        if(index < projects.length){
                for (uint j = index; j<projects.length-1; j++){
                    projects[j] = projects[j+1];
                }
                delete projects[projects.length-1];
                projects.length--;
        }
    }
    
    function withdrawFundingFromProject(address project_address) returns(bool){
        for(uint i = 0; i < projects.length; i++) {
            if(projects[i] == project_address) {
                Project project = Project(projects[i]);
                if(project.getFundingGoalReached()){
                    return project.withdrawFunding();
                }
            }
        }
    }
    
    function receiveWithdrawing() payable returns (bool) {
        project_owner_address.send(msg.value/(10**18) * (1 ether));
        return true;
    }

    function deleteProject_Owner() onlyCreator {
        selfdestruct(project_owner_address);
    }

    function getProjectsCount() constant returns (uint) {
        return projects.length;
    }

    function getProject(uint index) constant returns (address) {
        return projects[index];
    }

    function() payable{
        //Ether sink
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

contract Project {
    struct Date {
        uint day;
        uint month;
        uint year;
        uint hour;
        uint minute;
        uint second;
    }

    struct Status {
        uint current_funding;
        uint funding_goal;
        bool goal_reached;
        uint tokens;
        bool tokens_shared;
    }

    struct ProjectBacker {
        address backer_address;
        uint fund_amount;
        uint tokens;
    }


    Status status;
    string title;
    address public creator;
    Date project_end;
    uint backer_count;
    bool alive;
    mapping(uint => ProjectBacker) backers;

    modifier onlyCreator() {
        require(msg.sender == creator);
        _;
    }

    function Project(string _project_title, uint _funding_goal, uint tokens, uint day, uint month, uint year, uint hour, uint minute, uint second) {
        title = _project_title;
        creator = msg.sender;
        backer_count = 0;
        status.funding_goal = _funding_goal;
        status.current_funding = 0;
        status.tokens = tokens;
        status.goal_reached = false;
        status.tokens_shared = false;
        alive = true;
        project_end = Date(day, month, year, hour, minute, second);
    }

    function getCurrentFunding() constant returns (uint) {
        return this.balance;
    }

    function getFundingGoal() constant returns (uint) {
        return status.funding_goal;
    }
    
    function getTokenAmount() constant returns (uint) {
        return status.tokens;
    }

    function getFundingGoalReached() constant returns (bool) {
        return status.current_funding >= status.funding_goal;
    }

    function getProjectTitle() constant returns (string) {
        return title;
    }
    
    function getProjectDate() constant returns (uint, uint, uint, uint, uint, uint) {
        return (project_end.day, project_end.month, project_end.year, project_end.hour, project_end.minute, project_end.second);
    }

    function deleteProject() onlyCreator {
        for (uint i = 0; i < backer_count; i++) {
            Backer backer = Backer(backers[i].backer_address);
            
            if(!backer.receiveCanceledFunds.value(backers[i].fund_amount * (1 ether))()){
                throw;
            }
        }
        selfdestruct(creator);
    }

    function isAlive() constant returns (bool) {
        return alive;
    }

    function withdrawFunding() onlyCreator returns(bool){
        Project_Owner project_owner = Project_Owner(creator);
        
        if(!project_owner.receiveWithdrawing.value(status.current_funding * (1 ether))()){
            throw;
        }
        
        status.current_funding = 0;
        alive = false;
        return true;
    }

    function fundProject() payable returns(bool){
        status.current_funding += msg.value/(10**18);
        
        if(status.current_funding >= status.funding_goal)
            status.goal_reached = true;
            
        bool backer_found = false;
        for (uint i = 0; i < backer_count; i++){
            if(backers[i].backer_address == msg.sender) {
                backers[i].fund_amount += msg.value/(10**18);
                backer_found = true;
            }
        }
        
        if(!backer_found) {
            backers[backer_count] = ProjectBacker(msg.sender, msg.value/(10**18), 0);
            backer_count++;
        }
        
        if(status.goal_reached && status.tokens > 0 && !status.tokens_shared) {
		
			uint originalTokenAmount = status.tokens;
			
            for (uint j = 0; j < backer_count; j++){
                uint tokens = originalTokenAmount * backers[j].fund_amount/status.funding_goal;
                if(status.tokens < tokens)
                    tokens = status.tokens;
                    
                backers[j].tokens = tokens;
                Backer backer = Backer(backers[j].backer_address);
                backer.receiveTokens(tokens);
                status.tokens -= tokens;
            }
            
            status.tokens_shared = true;
        }
        
        return true;
    }

    function() payable{
        //ether sink
    }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

contract Backer {
    address public backer_address;
    uint projects_count;
    mapping(uint => BackedProject) projects;
    
    struct BackedProject {
        address project_address;
        uint funding;
        uint tokens;
    }

    modifier onlyCreator() {
        require(msg.sender == backer_address);
        _;
    }

    function Backer() {
        backer_address = msg.sender;
        projects_count = 0;
    }

    function investProject(address project_address, uint amount) payable onlyCreator returns(bool) {

        bool project_found = false;
        
        for (uint i = 0; i < projects_count; i++){
            if(projects[i].project_address == project_address) {
                projects[i].funding += amount;
                project_found = true;
            }
        }
        
        if(!project_found) {
            projects[projects_count] = BackedProject(project_address, amount, 0);
            projects_count++;
        }
		
		Project project = Project(project_address);
        if(!project.fundProject.value(amount * (1 ether))()){
            throw;
        }
		
        return true;
    }

    function deleteBacker() onlyCreator {
        selfdestruct(backer_address);
    }

    function getProjectsCount() constant returns (uint) {
        return projects_count;
    }

    function getProject(uint index) constant returns (address) {
        return projects[index].project_address;
    }
    
    function getProjectTokens(uint index) constant returns (uint) {
        return projects[index].tokens;
    }
	
	function getProjectFunding(uint index) constant returns (uint) {
        return projects[index].funding;
    }
    
    function receiveTokens(uint tokenAmount) {
        for (uint i = 0; i < projects_count; i++){
            if(projects[i].project_address == msg.sender)
                projects[i].tokens += tokenAmount;
        }
    }
    
    function receiveCanceledFunds() payable returns (bool) {
        backer_address.send(msg.value/(10**18) * (1 ether));
        return true;
    }

    function() payable{
        //Ether sink
    }

}