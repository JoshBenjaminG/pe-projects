<style>

@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

 body {
 		font-family: 'Roboto', sans-serif;;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #e3ddd5;
	}

body * {
/*	border: 2px solid red;*/
}

.inner-column {
	width: 100%;
	max-width: 1000px;
	margin-right: auto;
	margin-left: auto;
	padding: 10px;
}

form {
	display: flex;
	flex-direction: column;
	margin-top: 50px;
}

form button {
	margin-top: 10px;
}

label {
	margin-bottom: 10px;
	margin-top: 10px;
}

monster-card {
	background-color: red;
	margin: 20px;
	padding: 20px;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
}

img {
	width: 150px;
}

ul {
	list-style: none;
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-items: flex-start;
}

li {
	margin-bottom: 10px;
}

.magic-card {
	border: 2px solid red;
	padding: 20px;
	margin: 20px;
	background-color: green;
	color: black;
}

.red {
	background-color: red;
}
.white {
	background-color: white;
}
.green {
	background-color: green;
}
.blue {
	background-color: blue;
}
.black {
	background-color: black;
}

.stats {
	display: flex;
	justify-content: flex-end;
}
.stats p {
	margin-right: 10px;
}
.nameMana {
	display: flex;
	justify-content: space-between;
}
.text {
	min-height: 80px;
	border: 2px solid black;
}

html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  -webkit-font-smoothing: antialiased;
}

picture {
  display: block;
}

picture img {
  display: block;
  height: auto;
  width: 100%;
}

svg {
  display: block;
  width: 100%;
  height: 100%;
}

a {
  display: block;
  text-decoration: underline;
  color: inherit;
}

p a {
  display: inline;
  color: blue;
  text-decoration: underline;
}

strong {
  font-weight: bold;
}

em {
  font-style: italic;
}

mark {
  padding: 2px 5px;
  border-radius: 4px;
  background: #ffdd33;
}

main {
	max-width: 340px;
}
</style>