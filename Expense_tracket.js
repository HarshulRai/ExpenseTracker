function saveToLocalStorage(event) {
    event.preventDefault();
    const itemAmount = event.target.amount.value;
    const itemDescription = event.target.description.value;
    const categoryType = event.target.favourite.value;
    
    const obj = {
        itemAmount,
        itemDescription,
        categoryType
    }

    axios.post("https://crudcrud.com/api/d2be38a3fffe4760b891f480e9b7e474/appointmentData", obj)
        .then((response) => {
            showNewExpenseOnScreen(response.data)
            console.log(response)
        })
        .catch((err) => {
            console.log(err)
        })
}

function favTutorial() {  
    var mylist = document.getElementById("myList");  
    document.getElementById("favourite").value = mylist.options[mylist.selectedIndex].text;  
    }  

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/d2be38a3fffe4760b891f480e9b7e474/appointmentData")
        .then((response) => {
            console.log(response)
            for(var i=0; i<response.data.length; i++){
                showNewExpenseOnScreen(response.data[i]) 
            }
                
        })
        .catch((err) => {
            console.log(err)
        })

})

function showNewExpenseOnScreen(expense){
    document.getElementById('amount').value = '';
    document.getElementById('description').value = '';
    document.getElementById('favourite').value ='';
    
    if(localStorage.getItem(expense.itemDescription) !== null){
        removeExpensefromScreen(expense.itemDescription)
    }

    const parentNode = document.getElementById('listOfUsers');
    const childHTML = `<li id=${expense._id}> ${expense.itemAmount} - ${expense.categoryType} - ${expense.itemDescription}
                            <button onclick=deleteExpense('${expense._id}')> Delete</button>
                            <button onclick=editExpenseDetails('${expense.itemDescription}','${expense.itemAmount}','${expense.categoryType}','${expense._id})>Edit </button>
                         </li>`

    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}



function editExpenseDetails(itemDescription, itemAmount, categoryType, expenseID){

    document.getElementById('description').value = itemDescription;
    document.getElementById('amount').value = itemAmount;
    document.getElementById('favourite').value = categoryType;
    

    deleteExpense(expenseID)
 }



function deleteExpense(expenseID){
    axios.delete(`https://crudcrud.com/api/d2be38a3fffe4760b891f480e9b7e474/appointmentData/${expenseID}`)
        .then((response) => {
            removeExpensefromScreen(expenseID);
        })
        .catch((err) => {
            console.log(err)
        })     

}

function removeExpensefromScreen(expenseID){
    const parentNode = document.getElementById('listOfUsers');
    const childNodeToBeDeleted = document.getElementById(expenseID);
    if(childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }
}