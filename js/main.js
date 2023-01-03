let nameInput = document.getElementById('name');
let urlInput = document.getElementById('url');
var btnDisplay = document.getElementById("btndisplay");
var tableBody = document.getElementById('tablebody');
var visitBtn = document.getElementById('visit');

var bookMarks ;
let mainIndex = 0 ;
if (localStorage.getItem('Bookmarks')==null){
    bookMarks = [];
}
else
{
    bookMarks = JSON.parse(localStorage.getItem('Bookmarks')) ;
    displayBook(bookMarks);
}
btnDisplay.onclick =  function(){
    if(btnDisplay.innerHTML == "submit"){
        var bookMark = {
            name: nameInput.value ,
            url: urlInput.value
        }
        bookMarks.push(bookMark);
    }
    else if(btnDisplay.innerHTML == "update"){
        var bookMark = {
            name: nameInput.value ,
            url: urlInput.value
        }
        bookMarks.splice(mainIndex,1,bookMark);
    }
    
    localStorage.setItem("Bookmarks" , JSON.stringify(bookMarks));
    displayBook(bookMarks);
    clearData(); 
}

function displayBook(anyArray){
    var marks =``;
    for(var i=0 ; i<anyArray.length ; i++){
        marks += `
        <tr>
            <td>${anyArray[i].name}</td>
            <td><button onclick="deleteBook(${i})" class="btn btn-outline-danger">delete</button></td>
            <td><button  class="btn btn-outline-info" onclick="visitUrl(${i})" id = "visit">visit</button></td>
            <td><button onclick="updateBook(${i})" class="btn btn-outline-warning">update</button></td>
        </tr>`
        
    }
    btnDisplay.innerHTML= 'submit';
    tableBody.innerHTML=marks ;  
}
function deleteBook(index){
    bookMarks.splice(index,1);
    localStorage.setItem("Bookmarks" , JSON.stringify(bookMarks));
    displayBook(bookMarks);
}
function visitUrl(index){
    window.location = `http://${bookMarks[index].url}`;
}
function clearData(){
    nameInput.value ="";
    urlInput.value = "";
}
function updateBook(index){

    nameInput.value = bookMarks[index].name ;
    urlInput.value = bookMarks[index].url;
    btnDisplay.innerHTML= 'update';
    mainIndex = index;
}

function search(term){
    var wantedBook = [];
    for(var i=0 ; i<bookMarks.length ; i++){
        if (bookMarks[i].name.toLowerCase().includes(term.toLowerCase())){
            wantedBook.push(bookMarks[i])
        }
    }
    displayBook(wantedBook);
}

var nameRegex = /^[a-zA-Z_]{1,}$/;
function isNameValid(){
    if (nameRegex.test(nameInput.value)){
        return true ; 
    }
    else{
        return false;
    }
}
var urlRegex = /^(http:\/\/)?(www\.)?[a-zA-z0-9_\.]{1,}\.[a-z]{3}$/;
function isUrlValid(){
    if (urlRegex.test(urlInput.value)){
        return true ; 
    }
    else{
        return false;
    }
}

nameInput.addEventListener('keyup' , function(){
    if (isNameValid() && isUrlValid()){
        btnDisplay.removeAttribute('disabled');
    }
    else{
        btnDisplay.disabled = 'true';
    }
})

urlInput.addEventListener('keyup' , function(){
    if (isNameValid() && isUrlValid()){
        btnDisplay.removeAttribute('disabled');
    }
    else{
        btnDisplay.disabled = 'true';
    }
})



