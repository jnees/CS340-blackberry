**

# Project Blackberry [Live Demo](https://cs340-blackberry.herokuapp.com/)

This is a class project for Oregon State University's CS340 Databases course. The goal was to design and implement an end-to-end data management solution for a hypothetical organization in order to track the things that they care about. As denizens of the Puget Sound, we decided to create an organization that would track whale sightings in the area.

## Collaborators

 - [Erin Eckerman](https://github.com/eckermania)
 - [Joshua Nees](https://github.com/jnees)


## Components
This project consists of the following components:

 - Relational database (Postgres)
 - API for executing CRUD operations (Node.js/Express)
 - Client user interface (React)

## Entities Tracked

 - Whales
 - Whale Species
 - Researchers
 - Organizations
 - Sightings


## Database Entity Relationship Diagram

**![](https://lh4.googleusercontent.com/Mj7J8X8LE-Ks3IzZtkdVxIYe8HqbtdoOlrmL9nKp-SckWlKRlFq3RXqiauhdBXuKfXpWeIOUyz5F372EemFEhUFAMrOHoNgXa7v7ayXmy1eOANxD8g2b7M3hrgn_ijUJj11a7971ZpmQ0OwI9w)**
## UI Screenshots

This series of screen shots shows the UI components involved in some example CRUD operations.


### Read Sightings_Whales
![](https://lh5.googleusercontent.com/GfXeCHZzhkyTTNN5qkBH-Pvw1tetbgIw2APQkvW82BUn4aI108qmLVFNioP2nZxfIn34-GNLfQsH9ehstMYa8zfYTWW5sTTksWr93FRjBHXMktYSvodziPs0cGZZlysABXLDtxbK6Ft-apUl9w)

### Create Whales
**![](https://lh6.googleusercontent.com/bUK3esF_4GosNqnCUFlE8z7cCI4Ii96bFnBsSsbOusuyuXlecE13OUtw2G548-CZKF8BDR32TEPyyzXS9-P5x0zpzlIGuRpxjVW8Qdn-cihNJhwSrCe7HwLiolkRpYnbrToSbdkOHwbQRjfQHA)**
### Update Whales
**![](https://lh5.googleusercontent.com/pO2ZSxMH-WCvpAssgY6HhRIa8hL5gTL9ASweBJDzBsG_KmmjDrzfi5j72f8gSthAntTaWaauzG6rpEp1594Uy0jyWgBqB-WCHxVNTwFhoab78S79YaovywrlrznABmjLqLG2d4ExP_wpJL76vw)**
### Delete Whales
**![](https://lh6.googleusercontent.com/21IHmlxTLZDhc5EvX5nP3XoD7721dE4UsZNnA32ld8j-OytK4oJnjXF3BrkAaawOh-usE_l0REnz8KSs0rwY5cClYYLf2pe7Dkbbnsamlz1jp3e1qsH5EaKKpTmWHtm9_qXBrW8WlOergdiq-w)**

## Installation for local development

Note: This assumes that you have heroku credentials in your environment for this project. If you are forking this project you will need to configure your own heroku/db credentials.

 1. Install Server from the project directory
 ```npm install```
 
 2. Run server
 ```nodemon server.js```
 
 3. Install Client
```cd client```
```npx install```

4. Run client
```npm start```
	 
## What does this have to do with Blackberries?
Nothing. Blackberry is the name of one of our favorite orcas in the J-Pod of the famous [Southern Resident Killer Whales](https://en.wikipedia.org/wiki/Southern_resident_killer_whales).
