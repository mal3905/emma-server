# Emma : Your Grocery List Assistant
# About
Server is used for back end of app and connects to client. 

### [Live Page](https://emma-app-f6xxigitj.now.sh/)

## Technoligies Used
Client side: React, Javascript, Zeit, HTML and CSS.

Server side: Express.js, Node.js, PostgreSQL and Heroku. 

[Client](https://github.com/mal3905/Emma-Client2.git) |
[Server](https://github.com/mal3905/emma-server.git)

## URL/ Endpoints: 


## /api/items
GET: Gets and renders items stored in database

        {
             
            items: String
        }
## /api/:item_id
GET: Gets specific item by auto generated id.  

        {
        item: string
        id: Interger
        }

Delete: deletes specified item by id. 

POST : Posts item to specific category linked by id

        {
        item: String
        }

### /api/category
GET: Retrieves all categories from database 
POST: Lets user create a new category 


    {
    category: String
    }

# Express Boilerplate!

This is a boilerplate project used for starting new projects!

## Set up

Complete the following steps to start a new project (NEW-PROJECT-NAME):

1. Clone this repository to your local machine `git clone BOILERPLATE-URL NEW-PROJECTS-NAME`
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `npm install`
5. Move the example Environment file to `.env` that will be ignored by git and read by the express server `mv example.env .env`
6. Edit the contents of the `package.json` to use NEW-PROJECT-NAME instead of `"name": "express-boilerplate",`

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.

shouldnt have .env file , first remove git histroy by : rm -rf .git , then re initialicze :  git intit, then run npm install, then  mv example.env .env (moves exapmple to actualy env), fianlly change package json name to project name  i.e pets api 