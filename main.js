document.getElementById("inputIssueForm").addEventListener('submit', saveIssue);	// were making saveIssue() method a listener of the submit event

function saveIssue(e){	// e means event
	
		var issueDesc = document.getElementById("addDescription").value;
		var issueSeverity = document.getElementById("issueSeverity").value;
		var issueAssignedTo = document.getElementById("assignedTo").value;
		var issueId = chance.guid();
		var issueStatus = 'Open';
		
		var issue = {
			id: issueId,
			description: issueDesc,
			severity: issueSeverity,
			assignedTo: issueAssignedTo,
			status: issueStatus,
		};			
		
		if(localStorage.getItem('issues') == null ){
			console.log("wala pang laman ang local storage");
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
			console.log("may laman na ang json");
				
			
			for(var i; i < issues.length; i++){
				console.log("id: " + issues[i].id);
				console.log("desc: " + issues[i].description);
				console.log("severity: " +  	issues[i].severity);
			}

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
		
		
		issuesList.innerHTML += '<div class = "row issueCard"> ' +
								'<div class = "col"> </div>' +
								'<div class = "col-sm-12 col-md-11 col-lg-8">' +
								'<div class = "card issueCard">' +
								'<div class = "card-block issueCard">' +
								'<h6>Issue ID: ' + id + '</h6>' +
								'<p class = "label label-info">' + status + '</p>' +
								'<h3>' + desc + '</h3>' +
								'<p class ="fa fa-clock-o" aria-hidden="true"> ' + severity + '</p>' +
								'<p class ="fa fa-user-circle"> ' + assignedTo + '</p>' +
								'<a href="#" onclick = "setStatusClosed(\''+id+'\')" class = "btn btn-warning"> Close </a>' +
								'<a href="#" onclick = "deleteIssue(\''+id+'\')" class = "btn btn-danger"> Delete </a>' +
								'</div>' +	// closing tag for 'card-block' class
								'</div>' +	// closing tag for 'card' class
								'</div>' +  // closing for col class
								'<div class = "col"> </div>' + 
								'</div>';	// closing for the row
	}
}