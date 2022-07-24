function saveToLocalStorage(event) {
    event.preventDefault();
    const name = event.target.username.value;
    const email = event.target.emailId.value;
    const phonenumber = event.target.phonenumber.value;
    // localStorage.setItem('name', name);
    // localStorage.setItem('email', email);
    // localStorage.setItem('phonenumber', phonenumber)
    const obj = {
        name,
        email,
        phonenumber
    }

    axios.post("https://crudcrud.com/api/259478e92ad7480e85f021791b9ef906/appointmentData", obj)
        .then((response) => {
            showNewUserOnScreen(response.data)
            console.log(response)
        })
        .catch((err) => {
            console.log(err)
        })

    // localStorage.setItem(obj.email, JSON.stringify(obj))
    // showNewUserOnScreen(obj)
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/259478e92ad7480e85f021791b9ef906/appointmentData")
        .then((response) => {
            console.log(response)
            for(var i=0; i<response.data.length; i++){
                showNewUserOnScreen(response.data[i]) 
            }
                
        })
        .catch((err) => {
            console.log(err)
        })

})

function showNewUserOnScreen(user){

    document.getElementById('email').value = '';
    document.getElementById('username').value = '';
    document.getElementById('phonenumber').value ='';
    // console.log(localStorage.getItem(user.emailId))
    if(localStorage.getItem(user.email) !== null){
        removeUserFromScreen(user.email)
    }

    const parentNode = document.getElementById('listOfUsers');
    const childHTML = `<li id=${user._id}> ${user.name} - ${user.email}
                            <button onclick=deleteUser('${user._id}')> Delete User </button>
                            <button onclick=editUserDetails('${user._id}','${user.name}','${user.phonenumber}')>Edit User </button>
                         </li>`

    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

//Edit User

function editUserDetails(emailId, name, phonenumber){

    document.getElementById('email').value = emailId;
    document.getElementById('username').value = name;
    document.getElementById('phonenumber').value =phonenumber;

    deleteUser(emailId)
 }

// deleteUser('abc@gmail.com')

function deleteUser(userID){
    
    axios.delete(`https://crudcrud.com/api/259478e92ad7480e85f021791b9ef906/appointmentData/${userID}`)
        .then((response) => {
            removeUserFromScreen(userID);
        })
        .catch((err) => {
            console.log(err)
        })        

}

function removeUserFromScreen(userID){
    const parentNode = document.getElementById('listOfUsers');
    const childNodeToBeDeleted = document.getElementById(userID);
    if(childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }
}