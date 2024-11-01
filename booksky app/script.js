//selecting popupbox popupoverlay popupbutton
var popupoverlay=document.querySelector(".popup-overlay")
var popupbox=document.querySelector(".popup-box")
var addpopupbutton=document.getElementById("add-popup-button")
 addpopupbutton.addEventListener("click",function(){
    popupoverlay.style.display="block"
    popupbox.style.display="block"
 })
 var cancelbook=document.getElementById("cancel-book")
cancelbook.addEventListener("click",function(event){
   event.preventDefault()
   popupbox.style.display="none"
   popupoverlay.style.display="none"


})
//select container,add,book-title-input,book-author-input,book-description-input
var container=document.querySelector(".container")
var addbook=document.getElementById("add-book")
var booktitleinput=document.getElementById("book-title-input")
var bookauthorinput=document.getElementById("book-author-input")
var bookdescriptioninput=document.getElementById("book-description-input")

addbook.addEventListener("click",function(event){
   event.preventDefault()
   var div=document.createElement("div")
   div.setAttribute("class","book-container")
   div.innerHTML=(`<h2>${booktitleinput.value}</h2>
      <h5>${bookauthorinput.value}</h5>
      <p>${bookdescriptioninput.value}</p>
      <button onclick="deletebook(event)">delete</button>`
)
   container.append(div)
})
function deletebook(event)
{
   event.target.parentElement.remove()
}