const path = require('path')
const express = require('express')
const itemsService = require('./item-service')
 
const itemsRouter = express.Router()
const jsonParser = express.json()

const serializeitem = item => ({
    id: item.id,
    name: item.name
})

itemsRouter
    .route('/:categoryid')
    .get((req, res, next) => {
        const KnexInstance = req.app.get('db')
        itemsService.getByCategory(KnexInstance, req.params.categoryid)
        .then( items => {
       
            return res.json(items.map(serializeitem))
        })
        .catch(next)
    })
    //POST
    .post(jsonParser, (req, res, next) => {
        
        const requiredFields = ['name']
        const { name } = req.body
        console.log(req.body)
        const newItem = { 
            name,
            listid,
            categoryid
        
        };
        for (const field of requiredFields){
            if(!(field in req.body)) {
                return res.status(400).json({
                    error: {message: `Missing '${field}' in request body`}
                })
            }
        }
        itemsService.insertItem(
            req.app.get('db'),
            newItem
        )
        .then(item => {
            res
                .status(200)
                .location(path.posix.join(req.originalUrl + `/${item.id}`))
                .json(serializeitem(item))

        })
        .catch(next)
    })

    itemsRouter
        .route('/:item_id')
        .all((req, res, next) => {
            itemsService.getById(
                req.app.get('db'),
                req.params.item_id
            )
            .then(item => {
                console.log(req.params.item_id, 'sdfdsfs')
                    if(!item){
                        return res.status(400).json({
                            error: {message: `OOPS! item doesnt exist, you probably never added it `}
                        })
        
                    }
                    res.item = item
                    next()
            })
            .catch(next)
        })

        .get((req, res, next) => {
            res.json(serializeitem(res.item))
        })
        .delete((req, res, next) => {
            itemsService.deleteItem(
                req.app.get('db'),
                req.params.item_id
            )
            .then(item => {
                res.status(204).json(item)
            })
            .catch(next)
        })
        .patch(jsonParser, (req, res, next) => {
            const {name} = req.body
            const itemToUpdate = {name}

            const numberofValues = Object.values(itemToUpdate).filter(Boolean).length
            if(numberofValues === 0)
            return res.status(400).json({
                error: {
                    message: `Request body must contain name please :)`
                }
            })

            itemsService.updateItem(
                req.app.get('db'),
                req,params.item_id,
                itemToUpdate
            )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
        })

        module.exports = itemsRouter 