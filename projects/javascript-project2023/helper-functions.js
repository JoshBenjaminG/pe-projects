import templates from './templates.js';

var seedData = [
		{
			id: 12341234,
			name: "mellow",
			description: "good pizza",
			rating: 5,
			belongsTo: "Mark"
		},
		{
			id: 6234624362,
			name: "KFC",
			description: "good chicken",
			rating: 5,
			belongsTo: "Tim"
		},
	]

var seedUser = [
		{
			id: 18250452345,
			name: "Josh",
			password: "admin",
		},
	]

function initialize() {
	if (!localStorage.getItem("reviews")) {
		localStorage.setItem("reviews", JSON.stringify(seedData));

	} if (!localStorage.getItem("users")) {
		localStorage.setItem("users", JSON.stringify(seedUser));
	}
	var users = getData("users");
	users.forEach(function(user) {
		user.logIn = false;
		console.log(users);
	});
}
initialize();

function logOut(){
	var users = getData("users");
	users.forEach(function(user) {
		if (user.logIn == true) {
			user.logIn = false;
			setData("users", users);
		}
	});
	console.log('you have logged out');
}


// function logIn(username, password) {
// 	var users = getData("users");
// 	users.forEach(function(user) {
//   		if (username.value.toLowerCase() == user.name.toLowerCase() && password.value == user.password) {
//   			user.logIn = true;
//   			console.log('you have been logged in');
//   			setData("users", users);
//   		} else {
//   			return false;
//   			console.log('failed');
//   		}
//   });
// }

function logIn(username, password) {
  var users = getData("users");
  var success = false;
  users.forEach(function(user) {
    if (username.value.toLowerCase() == user.name.toLowerCase() && password.value == user.password) {
      user.logIn = true;
      console.log('you have been logged in');
      setData("users", users);
      success = true;
      console.log('successful');
    }
  });
  if (!success) {
    console.log('failed');
    return false;
  }
  return true;
}

function renderPage(page) {
	document.querySelector('output').innerHTML = templates[page];
}

function getData(keyNameString) {
	return JSON.parse(localStorage.getItem(keyNameString) );
}

function setData(keyNameString, value) {
	return localStorage.setItem(keyNameString, JSON.stringify(value) );
}

function createUser(username, password) {
	var users = getData("users");
	const user = {
		id: Date.now(),
		name: username,
		password: password
	};
	users.push(user);
	setData("users", users);
}


// first chatbot suggestion
// function createUser(username, password) {
//     var users = getData("users");
//     const user = {
//         id: Date.now(),
//         name: username,
//         password: password,
//         logIn: true
//     };
//     users.push(user);
//     setData("users", users);
// }

// function createUser(username, password) {
//   var users = getData("users");
//   const user = {
//     id: Date.now(),
//     name: username,
//     password: password
//   };
//   users.push(user);
//   setData("users", users);
//   logIn(user.name, user.password);
// }

function add(name, description, rating, userId) { 
	var reviews = getData("reviews");
	const review = {
		id: Date.now(),
		name: name,
		description: description,
		rating: rating,
		belongsTo: userId
	};
	reviews.push(review);
	setData("reviews", reviews);
	renderReviews();
	console.log(review.belongsTo);
}

function remove(id) {
	const filtered = getData("reviews").filter(function(review) {
		return review.id != id;
	});
	setData("reviews", filtered);
	renderReviews();
}

function tester() {
	for(var i = 0; i < review.rating; i++) {
		console.log('testing');
	}
}



function renderReview(review) {
	var stars = "";
	for(var i = 0; i < review.rating; i++) {
	  var starClass;
	  if(review.rating >= 4) {
	    starClass = 'red';
	  } else if(review.rating >= 3) {
	    starClass = 'orange';
	  } else if(review.rating >= 1) {
	    starClass = 'light-orange';
	  }
	  stars += `<span class="fa fa-star checked ${starClass}"></span>`;
	}

	return `
		<li data-id=${review.id}>
			<card>
			<div class="card-header">
			<div class="review">
			  <i class="fa-regular fa-user"></i>
			  <div class="text">
			    <p class="name">${review.belongsTo}</p>
			    <p class="wrote">Wrote a review</p>
			  </div>
			</div>
			<p>${review.name}</p>
			<p>${review.description}</p>
			<p>${stars}</p>

			<actions>
				<button class="remove">remove</button>
			</actions>

			</card>
		</li>
	`;
}

function renderReviews(filter = null) {
	var template = "<ul>";
	if (!filter) {
		filter = getData("reviews");
	}
	filter.forEach (function(review) {
		template += renderReview(review);
		tester();
	});
	template += "</ul>";
	document.querySelector("outlet").innerHTML = template;
}

function renderName(review) {
	return `
		<li data-id=${review.id}>
			<card>
			<h2>${review.name}</h2>
			</card>
		</li>
	`;
}

function renderNames(filter = null) {
	var template = "<ul>";
	if (!filter) {
		filter = getData("reviews");
	}
	filter.forEach (function(review) {
		template += renderName(review);
	});
	template += "</ul>";
	document.querySelector("outlet").innerHTML = template;
}

export {
	add,
	remove,
	renderReview,
	renderReviews,
	renderPage,
	getData,
	renderName,
	renderNames,
	createUser,
	logIn,
	logOut
}