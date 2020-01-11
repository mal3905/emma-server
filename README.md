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

