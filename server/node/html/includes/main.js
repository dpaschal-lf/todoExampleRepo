
$(document).ready( initializeApp );

function initializeApp(){
	getTaskDataAndRender()
}
/* create a single dom section for a single todo task*/
/* input: task object
output: task dom element to attach to page
*/
/*	<div class="todoTask">
		<div class="title">buy egss</div> 
		<div class="date">5-1-2018 5:00pm</div>
		<div class="description">Buy a dozen eggs from ...</div>
		
		<div class="controls">
			<input type="checkbox" name="complete"><button>delete</button>
		</div>
	</div>*/
function createTaskItem(taskObject){
	const taskContainer = $("<div>",{
		'class': 'todoTask'
	});
	const title = $("<div>",{
		'class': 'title',
		text: taskObject.title
	});
	const date = $("<div>",{
		'class': 'date',
		text: taskObject.dueDate
	});
	const description = $("<div>",{
		'class': 'description',
		text: shortenString(taskObject.description, 20)
	});
	const controlContainer = $("<div>",{
		'class': 'controls'
	});
	const completed = $("<input>",{
		type: 'checkbox',
		name: 'complete',
		'class': 'completed'
	});
	const deleteButton = $("<button>",{
		'class': 'deleteButton',
		text: 'delete'
	});
	controlContainer.append(completed, deleteButton);
	taskContainer.append(title, date, description, controlContainer);
	return taskContainer;
}

/* render all tasks to the dom, clear the dom first, then render all
input: array of tasks
output: none
*/
function renderAllTasks(taskArray){
	const taskElements = [];
	for(let i=0; i<taskArray.length; i++){
		let element = createTaskItem( taskArray[i]);
		taskElements.push(element);
	}
	$("#todoTasks").append(taskElements);
}
/* get all task data from resources and then render tasks to dom
input: none
output: none
*/
function getTaskDataAndRender(){
	$.ajax({
		url: 'todoitems',
		dataType: 'json',
		data: {
			//itemID: 3
		},
		method: 'post',
		success: function(response){
			if(response.tasks.length>0){
				renderAllTasks(response.tasks);
			}
		},
		error: function(){
			console.log('something happened');
		}
	})
	
}

function shortenString(string, maxLength){
  
  var stringSection = string.slice(0, maxLength);
  var lastSpacePos = stringSection.lastIndexOf(' ');
  if(lastSpacePos!==-1){
    output = stringSection.slice(0, lastSpacePos);
  } else {
    output = stringSection;
  }
  return output+'...';
}








