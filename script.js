

// getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");
/////////////////////////////////////
const getTasks = ()=>JSON.parse(localStorage.getItem('New Todo')) || [];
const setTasks = (array)=>localStorage.setItem("New Todo", JSON.stringify(array));
const pushTask = (value) => {
    const array = getTasks()
    array.push(value)
    setTasks(array)
}
///////////////////////////////////////
// onkeyup event
inputBox.onkeyup = ()=>{
  let userEnteredValue = inputBox.value; //getting user entered value
  //trim -->retirer les blancs en début et fin de chaîne.
  
  if(userEnteredValue.trim() != 0){ //if the user value isn't only spaces
    addBtn.classList.add("active"); //active the add button
  }else{
    addBtn.classList.remove("active"); //unactive the add button
  }
}
 
addBtn.onclick = ()=>{ //when user click on plus icon button
  let userEnteredValue = inputBox.value; //getting input field value
   listArray =getTasks();
 
  const value = {
    task:userEnteredValue,
    checked: false
}
  listArray.push(value); //pushing or adding new value in array
    setTasks(listArray);
  showTasks(); //calling showTask function
  addBtn.classList.remove("active"); //unactive the add button once the task added
}


///////////////////
const checked_changed = () => {
    
 
        const list = document.querySelectorAll(".todoList li");
              

        const array = []
        list.forEach((child) => {
            const taskTxt = child.querySelector("label").innerText;
            const taskStatus = child.querySelector("input[type='checkbox']").checked;
             
            array.push({
                task: taskTxt,
                checked: taskStatus
            });
        })
        setTasks(array);
         update() ;
    }

 
 
 
///////////////////////////////////////////
    function update() {
        const list = document.querySelectorAll(".todoList li");
        const listArray =getTasks();
        let count = 0;
        let pendingTask = 0;
        let doneTask = 0;
        const getcount = ()=> count++;
        const getpendingTask = ()=> pendingTask++;
        const getdoneTask = ()=> doneTask++;
     list.forEach((child)  => {
        let ind=getcount();
         
        listArray.forEach((value ,index)=> {
           
          if(ind==index){

          const taskTxt = child.querySelector("label").innerText;
          
           const taskStatus = value.checked;
         

          if(taskStatus){
          child.querySelector("label").innerHTML=taskTxt.strike();
         child.querySelector("input[type='checkbox']").checked="true";
         getdoneTask();
          }
         else
          {
              child.querySelector("label").innerHTML=taskTxt;
             getpendingTask();
              }
              
       } 
   
    })
})
const pendingTasksNumb = document.querySelector(".pendingTasks");
pendingTasksNumb.textContent = getpendingTask(); //passing the array 
const doneTasksNumb = document.querySelector(".doneTasks");
doneTasksNumb.textContent = getdoneTask(); //passing the array 
       
         }
       
    
    

function showTasks(){
     listArray =getTasks();
 
  const totalTasksNumb = document.querySelector(".totalTasks");
  totalTasksNumb.textContent = listArray.length; //passing the array length in pendingtask
  if(listArray.length > 0){ //if array length is greater than 0
    deleteAllBtn.classList.add("active"); //active the delete button
  }else{
    deleteAllBtn.classList.remove("active"); //unactive the delete button
  }
  let newLiTag = "";
  listArray.forEach((value, index) => {
      
    newLiTag += `<li><span> <input  type="checkbox" class="btnCheck form-check-input"  onclick="checked_changed()"  ></span>
    <label >${value.task}</label><span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span> 
     </li>`;
        
     
     
  });
  todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
  inputBox.value = ""; //once task added leave the input field blank
   
   update();
 
}
 
function loadSession() {
  let session =localStorage.getItem('session');
  if (session == "false" ) 
  window.location.href = "home.html";
}
  
function load(){
  loadSession() 
    showTasks();
  
    }


// delete task function
function deleteTask(index){
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1); //delete or remove the li
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks(); //call the showTasks function
}
// delete all tasks function
deleteAllBtn.onclick = ()=>{
  listArray = []; //empty the array
  localStorage.setItem("New Todo", JSON.stringify(listArray)); //set the item in localstorage
  showTasks(); //call the showTasks function
}