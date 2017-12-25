document.getElementById("inputIssueForm").addEventListener('submit', saveIssue);	// were making saveIssue() method a listener of the submit event

function saveIssue(e){	// e means event
	
		var issueDesc = document.getElementById("addDescription").value;
		var issueSeverity = document.getElementById("issueSeverity").value;
		var issueAssignedTo = document.getElementById("assignedTo").value;
		var issueId = chance.guid();
		var issueStatus = 'Open';
		
	// form validation
	issueDesc = issueDesc.replace(/^\s+/, '').replace(/\s+$/, '');
	issueAssignedTo = issueAssignedTo.replace(/^\s+/, '').replace(/\s+$/, '');
	
	if (issueDesc === '' || issueAssignedTo === '') {
		// text was all whitespace
		alert("Empty content! Please input values.");
		e.preventDefault();	
		return;	// so the function stops. it doesn't proceed on adding the 'issue' object
	}
	else {
		// text has real content, now free of leading/trailing whitespace
	}		
		var issue = {
			id: issueId,
			description: issueDesc,
			severity: issueSeverity,
			assignedTo: issueAssignedTo,
			status: issueStatus,
		};			
		
		if(localStorage.getItem('issues') == null ){
			var issues = [];
			issues.push(issue);
			
			//now we will add it to local storage,
			// set 'issues' as the key of the item,
			// convert the value of the issues object to string
			// by using JSON.stringify()
			localStorage.setItem('issues', JSON.stringify(issues) );	
			
			/*
			A common use of JSON is to exchange data to/from a web server.
			When sending data to a web server, the data has to be a string.
			Convert a JavaScript object into a string with JSON.stringify().
			
			source:
			https://www.w3schools.com/js/js_json_stringify.asp
			*/
		}
		else{	// if theres already something on the local storage
			var issues = JSON.parse(localStorage.getItem('issues') );
			issues.push(issue);
			localStorage.setItem('issues', JSON.stringify(issues) );
			
			var issues = JSON.parse(localStorage.getItem('issues') );

		}
		
		var issuesList = document.getElementById("issuesList");			
		document.getElementById("inputIssueForm").reset();	// reset all elements in the form
		
		fetchIssues();			// to display the newly added issue
		
		e.preventDefault();		// to prevent form from submitting and refreshing the page		
}

function fetchIssues(){
	var issues = JSON.parse(localStorage.getItem('issues') );
	var issuesList = document.getElementById("issuesList");
	
	issuesList.innerHTML = "";
	
	for( var i = 0; i < issues.length; i++){
		var id = issues[i].id;
		var desc = issues[i].description;
		var severity = issues[i].severity;
		var assignedTo = issues[i].assignedTo;
		var status = issues[i].status;
		
		var temp;
		temp = '<div class = "row issueCard"> ' +
								'<div class = "col"> </div>' +
								'<div class = "col-sm-12 col-md-11 col-lg-8">' +
								'<div class = "card issueCard">' +
								'<div class = "card-block issueCard">' +
								'<h6>Issue ID: ' + id + '</h6>'
								if(status !== "Closed"){
									temp += '<p> <span class = "badge badge-info">' + status + '</span></p>';	
								}
								else{ // if status is "Closed"
									temp += '<p> <span class = "badge badge-default">' + status + '</span></p>'	
								}
		temp +=	'<h3>' + desc + '</h3>' +
								'<p class ="fa fa-clock-o" aria-hidden="true"> ' + severity + '</p>' +
								'<p class ="fa fa-user-circle"> ' + assignedTo + '</p>'
								if(status !== "Closed"){ // if issue is still open, show button to Close issue
									temp += '<a href="#" onclick = "setStatusClosed(\''+id+'\')" class = "btn btn-warning"> Close </a>'
								}
		temp +=	'<a href="#" onclick = "deleteIssue(\''+id+'\')" class = "btn btn-danger"> Delete </a>' +
								'</div>' +	// closing tag for 'card-block' class
								'</div>' +	// closing tag for 'card' class
								'</div>' +  // closing for col class
								'<div class = "col"> </div>' + 
								'</div>';	// closing for the row
								
		issuesList.innerHTML += temp;
	}
}

function deleteIssue(id){
	// use JSON.parse to convert a text from web server into a javascript object, so u can use it in your program
	var issues = JSON.parse(localStorage.getItem("issues") );
	
	for(var i = 0; i < issues.length; i++){
		if(issues[i].id === id){
			issues.splice(i, 1);	// remove the item from the array
			localStorage.setItem("issues", JSON.stringify(issues) );	// set again the "issues" key with the newly changed array
			
		}
	}
	
	fetchIssues();
}

function setStatusClosed(id){
	
	var issues = JSON.parse(localStorage.getItem("issues") );
	
	for(var i = 0; i < issues.length; i++){
		if(issues[i].id === id){
			issues[i].status = "Closed";
			localStorage.setItem("issues", JSON.stringify(issues) );
		}
	}
	
	fetchIssues();
}

function keme(){
	var p = document.getElementById("test");
	
	for(var i = 0; i < 3; i++){
		p.innerHTML += 'hi' + 'yow'
		p.innerHTML += 'second time' + 'ganern'
	}
}