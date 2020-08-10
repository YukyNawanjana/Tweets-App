//Variables
const tweetList = document.getElementById('tweet-list');


// Event Listeners
eventListeners();


function eventListeners(){
    //form Submission
    document.querySelector('#form').addEventListener('submit', newTweet);

    //Remove Tweet from the list
    tweetList.addEventListener('click', removeTweet);

    //Document
    document.addEventListener('DOMContentLoaded', localStorageOnload);
}


// Functions

function newTweet(e){
    e.preventDefault();
    
    //Read the Textarea Value
    const tweet = document.getElementById('tweet').value;

    //create the remove btn
    const removeBtn = document.createElement('a');
    removeBtn.classList = 'remove-tweet';
    removeBtn.textContent = 'X';

    //Create an <li> element
    const li = document.createElement('li');
        li.textContent = tweet;
        

 
    //Add The Remove Button

    li.appendChild(removeBtn);

    //Add to the list
    tweetList.appendChild(li);

    //add tweet local storage
    addTweetLocalStorage(tweet);

    //print the alert
    alert("Tweet Added");

    this.reset();
}


//Remove Tweet from the Dom

function removeTweet(e){
    if(e.target.classList.contains('remove-tweet')){
        e.target.parentElement.remove();

    }
    

    //Remove From Storage
    removeTweetLoaclStorage(e.target.parentElement.textContent);
}

//add tweet local storage
function addTweetLocalStorage(tweet){
    let tweets = getTweetFromStorage();

    //Add The tweets into the array
    tweets.push(tweet);
    
    //convers tweet array into string
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function getTweetFromStorage(){

    let tweets;
    const tweetsLS =localStorage.getItem('tweets');
    //get the values, if null is retuned then we create an empty array

    if(tweetsLS === null){
        tweets = [];
    }else{
        tweets = JSON.parse(tweetsLS);
    }

    return tweets;

}

//print Local storage tweets on Load

function localStorageOnload(){
    let tweets = getTweetFromStorage();

    // loop throught storage and print the values
    tweets.forEach(tweet =>{
            //create the remove btn
        const removeBtn = document.createElement('a');
        removeBtn.classList = 'remove-tweet';
        removeBtn.textContent = 'X';

        //Create an <li> element
        const li = document.createElement('li');
            li.textContent = tweet;
            

        //remove Form text
        document.getElementById('tweet').value = "";
        //Add The Remove Button

        li.appendChild(removeBtn);

        //Add to the list
        tweetList.appendChild(li);
    });
}

//Removers the tweet from Local storage
function removeTweetLoaclStorage(tweet){
    //get tweets from storage
    let tweets =  getTweetFromStorage();

    //Reomive  the X from the tweet
    const tweetDelete = tweet.substring(0, tweet.length -1);

    //loop throught the tweet and remove
    tweets.forEach(function(tweetLS, index){
        if(tweetDelete === tweetLS){
            tweets.splice(index, 1);
            
        }
    });


    //Save The Data
    localStorage.setItem('tweets', JSON.stringify(tweets));

}