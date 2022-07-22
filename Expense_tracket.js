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
    localStorage.setItem(obj.itemDescription, JSON.stringify(obj))
    showNewExpenseOnScreen(obj)
}

function favTutorial() {  
    var mylist = document.getElementById("myList");  
    document.getElementById("favourite").value = mylist.options[mylist.selectedIndex].text;  
    }  

window.addEventListener("DOMContentLoaded", () => {
    const localStorageObj = localStorage;
    const localstoragekeys  = Object.keys(localStorageObj)

    for(var i =0; i< localstoragekeys.length; i++){
        const key = localstoragekeys[i]
        const expenseDetails = localStorageObj[key];
        const expenseDetailsObj = JSON.parse(expenseDetails);
        showNewExpenseOnScreen(expenseDetailsObj)
    }
})

function showNewExpenseOnScreen(expense){
    document.getElementById('amount').value = '';
    document.getElementById('description').value = '';
    document.getElementById('favourite').value ='';
    
    if(localStorage.getItem(expense.itemDescription) !== null){
        removeExpensefromScreen(expense.itemDescription)
    }

    const parentNode = document.getElementById('listOfUsers');
    const childHTML = `<li id=${expense.itemDescription}> ${expense.itemAmount} - ${expense.categoryType}
                            <button onclick=deleteExpense('${expense.itemDescription}')> Delete </button>
                            <button onclick=editExpenseDetails('${expense.itemDescription}','${expense.itemAmount}','${expense.categoryType}')>Edit </button>
                         </li>`

    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}



function editExpenseDetails(itemDescription, itemAmount, categoryType){

    document.getElementById('description').value = itemDescription;
    document.getElementById('amount').value = itemAmount;
    document.getElementById('favourite').value =categoryType;

    deleteExpense(itemDescription)
 }



function deleteExpense(itemDescription){
    console.log(itemDescription)
    localStorage.removeItem(itemDescription);
    removeExpensefromScreen(itemDescription);

}

function removeExpensefromScreen(itemDescription){
    const parentNode = document.getElementById('listOfUsers');
    const childNodeToBeDeleted = document.getElementById(itemDescription);
    if(childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }
}