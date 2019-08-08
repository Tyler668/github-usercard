/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [
  'tetondan',
  'dustinmyers',
  'justsml',
  'luishrd',
  'bigknell'
];


const container = document.querySelector('.cards');

function createCard(profileObj){
  // Create elements ===
  const card = document.createElement('div');
  const proPic = document.createElement('img');
  const cardInfo = document.createElement('div');
  const name = document.createElement('h3');
  const username = document.createElement('p');
  const location = document.createElement('p');
  const profile = document.createElement('p');
  const linkToPage = document.createElement('a');
  const followers = document.createElement('p');
  const following = document.createElement('p');
  const bio = document.createElement('p');

  // Structure elements ===
  card.appendChild(proPic);
  card.appendChild(cardInfo);
  cardInfo.appendChild(name);
  cardInfo.appendChild(username);
  cardInfo.appendChild(location);
  cardInfo.appendChild(profile);
  profile.appendChild(linkToPage);
  cardInfo.appendChild(followers);
  cardInfo.appendChild(following);
  cardInfo.appendChild(bio);

  // Element class assignment ===
  card.classList.add('card');
  cardInfo.classList.add('card-info');
  name.classList.add('name');
  username.classList.add('username');

  // Element content ===
  proPic.src = profileObj.avatar_url;
  name.textContent = profileObj.name;
  username.textContent = profileObj.Login;
  location.textContent = `Location: ${profileObj.location}`;
  profile.textContent = `Profile: `;
  linkToPage.href = profileObj.html_url;
  linkToPage.textContent = `Go to user's page`;
  followers.textContent = `Followers: ${profileObj.followers}`;
  following.textContent = `Following: ${profileObj.following}`;
  bio.textContent = `Bio: ${profileObj.bio}`;

  return card;
}

// This gets my profile and makes the card ===
axios.get('https://api.github.com/users/Tyler668')
.then( response =>{
  container.appendChild(createCard(response.data));
  console.log(response.data);
});

// This finds all my followers and makes cards for them ===
axios.get('https://api.github.com/users/Tyler668')
.then( response =>{
  const followersURL = response.data.followers_url;
  axios.get(followersURL)
  .then(response =>{
    response.data.forEach(e =>{
      container.appendChild(createCard(e));
      // console.log(e);
    })
  });

});


// This found all the professor profiles using the array of just their handles, then makes cards for 'em ===
followersArray.forEach(item =>{
const urlString = `https://api.github.com/users/${item}`;
axios.get(urlString)
.then(response =>{
  container.appendChild(createCard(response.data));
});
});


/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
