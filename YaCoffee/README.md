# YaCoffee Project Instruction
This is a website developed for customers to interact with coffee shops easily

# Technology included in project
* User Interface: ```HTML```, ```CSS``` (bootrapmin, swiper, etc)
* Frontend: ```Javascript```
* Backend: ```Nodejs``` (test by ```Mocha```)
* Database: ```MySQL```

# Install 
* Install all of these packets: ```NodeJS```, ```NPM```, ```MySQL```. You must install ```MySQL``` with username is ```root``` and password is ```toor``` to be able to connect database from ```NodeJS```)
* Install node modules at YaCoffee folder:
	```
	npm install
	```
* Create database run the scripts in source.sql. You could do as the following instruction
	* Open command promt right at YaCoffee folder
	* Access mySQL with 'toor' password: 
		```
		mysql -u root -p
		```
	* Run this command:
		```
		\. source.sql
		```
* Start server:
	```
	node app.js
	```
* Access localhost:3000 from your browser

# Test
To run test in folder Test, run this command:
	```
	./node_modules/mocha/bin/mocha
	```
