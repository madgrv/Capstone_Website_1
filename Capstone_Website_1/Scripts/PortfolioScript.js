/* TASK 29 JS */

//Create event listener to wait for the document content to load before reading the script
document.addEventListener("DOMContentLoaded", function() {
    comments = JSON.parse(sessionStorage.getItem("comments")) || [];
    displayComments();
  });

//Create a function to display a famouse quote from a free API and change it with a button
function getPhrase() {
    let motPhrase = document.getElementById("motPhrase")
    let phAuthor = document.getElementById("phAuthor")
    fetch("https://type.fit/api/quotes")
       .then((res) => res.json()) //changes the response into and object through json
       .then (function shuffleArray(array) { //Randomises the objects order within the array
           for (let i = array.length - 1; i > 0; i--) {
               let j = Math.floor(Math.random() * (i + 1));
               [array[i], array[j]] = [array[j], array[i]];
           }
           return array
       }) //Source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
           //[accessed 01/02/2023]
       .then((data) => {
           //Display result values in the html by id references
           motPhrase.innerHTML = JSON.stringify(data[0].text); //turns result back into a string
           if (data[0].author == null) { //where author info is not available display 'Unknown Author'
               data[0].author = "Unknown author"
               phAuthor.innerHTML = JSON.stringify(data[0].author)
           }
           phAuthor.innerHTML = JSON.stringify(data[0].author);
   
       }, (error) => { 
           console.log(error + "There was an error with the server"); //display error if server doesn't respond
       }); 
}
   
//Create a function to display a cat gif from a free API and change image by clicking on button
async function getCat() {
       let catIt = document.getElementById("catIt")
       let res = await fetch("https://api.thecatapi.com/v1/images/search")
       //Await API response to assign value to cat letiable before printing
       let cat = await res.json()
       .then((cat) => {catIt.src = cat[0].url
       })
       //Await API response to assign value to cat letiable before printing
}
   
//create array of images to add to the DOM, they will be objects containing the title and URL
let photosArray = [
    {title: "Gran Paradiso", path: "./imgs/GranParadiso.jpg"},
    {title: "Baita", path: "./imgs/Baita.jpg"},
    {title: "Hill", path: "./imgs/Hill.jpg"},
    {title: "Monte Bianco", path: "./imgs/MonteBianco.jpg"},
    {title: "IMG", path: "./imgs/IMG_0104.jpg"},
    {title: "View From Punta Hellbronner", path: "./imgs/Helbronner+View+Mont+Blanc.jpg"},
]

//Create an empty array to store the saved items
let savedForLater = []

//Reference the container to populate with the images
let parContainer = document.querySelector(".parContainer");

//Function to create an element for each image
function imgOnLoad(arrayRef) {
    //Loop through the array of img objects

    arrayRef.forEach((pic, index) => {
        //Create a box container
        let container = document.createElement("div");
        container.innerHTML = ""; // clear the container
        container.classList.add("box");
        //Create inner elements: title and image
        let title = document.createElement("h2");
        title.innerHTML = pic.title;
        let photo = document.createElement("img");
        photo.src = pic.path;
        photo.width = 100;
        photo.height = 100;
        //Add a function to create a temporary display to show full size images with click event listener
        photo.addEventListener("click", function() {
            // Create a new modal element
            let modal = document.createElement("div");
            modal.classList.add("modal");
            // Create a new modal content element
            let modalContent = document.createElement("div");
            modalContent.classList.add("modal-content");
            // Create a new image element
            let modalImg = document.createElement("img");
            modalImg.src = photo.src;
            // Append the image element to the modal content element
            modalContent.appendChild(modalImg);
            // Append the modal content element to the modal element
            modal.appendChild(modalContent);
            // Append the modal element to the document body
            document.body.appendChild(modal);
            // Close the modal when clicking outside of it
            modal.onclick = function() {
                modal.remove();
            }
        });

        //Create a like button with class toggle (refer to CSS)
        let like = document.createElement("div")
        like.classList.add("unliked")
        like.innerHTML = "&#x2665"
        like.addEventListener('click', function() {
        like.classList.toggle("liked");
        });
        // https://www.htmlsymbols.xyz/heart-symbols [accessed 02/03/2023]

        //Create a save for later button
        if (arrayRef == photosArray) {
            let button = addSaveButton(pic);
        } else {
            let button = addRemoveButton(pic, index);
        }

        container.appendChild(title);
        container.appendChild(photo);
        container.appendChild(like);
        container.appendChild(button);
        parContainer.appendChild(container);

    });
}

//Create a link to the saved items to be viewed
let savedPage = document.createElement("a")
savedPage.id = "savedList"
savedPage.href = "./Saved_items.html"
savedPage.innerHTML = "View Saved Items"
savedList.appendChild(savedPage);

//A function to display the saved items in a new page
function displaySaved() {
    //get session storage data
    parContainer.innerHTML = "";
    savedForLater = JSON.parse(sessionStorage.getItem("saved"));

    if (savedForLater === null || savedForLater.length === 0) {
        parContainer.innerHTML = "You have not saved any items.";
    } else {
        
    imgOnLoad(savedForLater)
    //display saved items
    }

    
}

function addSaveButton(pic) {
    button = document.createElement("button");
    button.classList.add("button")
    button.innerHTML = "Save for later";
    //Add event listener to button
    button.addEventListener("click", function(){
        //A function to save items and alert the user of which image was saved and how many have been saved in total
        if (sessionStorage.getItem("saved") === null) {
            sessionStorage.setItem("saved", JSON.stringify([]));
        } //Check if a session storage file exists and create one if not
        //Retrieve sessionStorage content
        savedForLater = JSON.parse(sessionStorage.getItem("saved"));
        //Add new saved item
        savedForLater.push(pic)
        //Update sessionStorage
        sessionStorage.setItem("saved", JSON.stringify(savedForLater))

        //Create alert lightbox:

        // Create a new modal element
        let modal = document.createElement("div");
        modal.classList.add("modal");
        // Create a new modal content element
        let modalContent = document.createElement("div");
        modalContent.classList.add("modal-content");
        modalContent.classList.add("box");
        // Create an alert message
        modalContent.innerHTML = `${pic.title} saved for later \nYou have ${savedForLater.length} items saved`;
        //Create a link to the display saved page
        let goToSaved = document.createElement("a")
        goToSaved.href = "./Saved_items.html"
        goToSaved.innerHTML = "View All Items"
        modalContent.appendChild(goToSaved);
        // Append the modal content element to the modal element
        modal.appendChild(modalContent);
        // Append the modal element to the document body
        document.body.appendChild(modal);
        // Close the modal when clicking outside of it
        modal.onclick = function() {
            modal.remove();
        }
    })
    return button;
    
}

function addRemoveButton(pic, index) {
    button = document.createElement("button");
    button.classList.add("button");
    button.innerHTML = "Remove from saved";
    //Add event listener to button
    button.addEventListener("click", function(){
        //Clear dom display
        if (sessionStorage.getItem("saved") === null) {
            sessionStorage.setItem("saved", JSON.stringify([]));
        } //Check if a session storage file exists and create one if not.
        //Retrieve sessionStorage content
        savedForLater = JSON.parse(sessionStorage.getItem("saved"));
        //Remove clicked saved item
        savedForLater.splice(index, 1);
        //Update sessionStorage
        sessionStorage.setItem("saved", JSON.stringify(savedForLater));

        if (savedForLater.length === 0) { 
            sessionStorage.removeItem("saved");
        } else {
            sessionStorage.setItem("saved", JSON.stringify(savedForLater))
        } 
        //Display refresh
        displaySaved();
    });

    return button
}

//Comments section creator
let comments = []
function addComment() {

    if (sessionStorage.getItem("comments") === null) {
        sessionStorage.setItem("comments", JSON.stringify([]));
    } //Check if a session storage file exists and create one if not
    //Retrieve sessionStorage content
    let nameInput = document.getElementById("userName").value;
    let userComment = document.getElementById("userComment").value;

    if (!userComment || !nameInput) {
        alert("Please add a comment and your name");
    }

    comments = JSON.parse(sessionStorage.getItem("comments"));

    let newComment = {user: nameInput, addedComment: userComment}

    comments.push(newComment);

    sessionStorage.setItem("comments", JSON.stringify(comments));

   displayComments();
}


function displayComments() {
    let commContainer = document.getElementById("commentSection");
    // commContainer = document.createElement("div")
    commContainer.innerHTML = ""; // Clear existing comments


    comments.forEach((item, index) => {
        commContainer.classList.add("box");

        let commentBox = document.createElement("div");
        commentBox.id = "com" + index;
        let userName = document.createElement("h2");
        let comment = document.createElement("p");

        userName.innerHTML = item.user + " says:";
        comment.innerHTML = item.addedComment;

        //Create a like button with class toggle (refer to CSS)
        let like = document.createElement("div");
        like.classList.add("unliked");
        like.innerHTML = "&#x2665";
        like.addEventListener('click', function() {
        like.classList.toggle("liked");
        });
        // https://www.htmlsymbols.xyz/heart-symbols [accessed 02/03/2023]

        commentBox.appendChild(like);
        commContainer.appendChild(commentBox);
        commContainer.appendChild(userName);
        commContainer.appendChild(comment);
    })
}

//A function that takes the user input from the form and populates the default email app with the user's input from the form 
function sendEmail() { //asked advise on how to do this to a friend
    // Get the values from the form inputs
    let name = document.getElementById('name').value;
    let email = document.getElementById('emailForm').value;
    let message = document.getElementById('message').value;
    let subject = document.getElementById('subject').value;
    
  
    // Construct the email message with the form data
    // let subject = 'New message from ' + name;
    let body = message + '\n\nFrom: ' + name + '\nEmail: ' + email;
  
    // Create the email link with the pre-filled message
    let mailtoLink = 'mailto:matteogalesi@icloud.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  
    // Open the user's email client with the pre-filled message
    window.location.href = mailtoLink;
  }




/**  
 * https://www.htmlsymbols.xyz/heart-symbols 
 *  [accessed 02/03/2023]
 * 
 * https://www.w3docs.com/snippets/html/how-to-create-an-html-button-that-acts-like-a-link.html
 *  *  [accessed 02/03/2023]
 * 
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
 *  *  [accessed 05/03/2023]
 * 
 */