const path = require('path')
const express = require('express')
const CategoryService = require('./category-service')

const CategoryRouter = express.Router()
const JsonParser = express.json()

const serializeCategory = category => ({
    id: category.id,
    name: category.name
})

CategoryRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        CategoryService.getAllCategory(knexInstance)
            .then(Category => {
                res.json(Category.map(serializeCategory))
            })
            .catch(next)
    })
    .post(JsonParser, (req, res, next) => {
        const { name } = req.body;
        const newcategory = { name }

        if(!name) {
            return res.status(400).json({
                error: {
                    message: `Missing Category name madame or Sir!`
                }
            });
        }

        CategoryService.insertcategory(
            req.app.get('db'),
            newcategory
        )
        .then(folder => {
            res 
                .status(201)
                .location(path.posix.join(req.originalUrl, `/${category.id}`))
                .json(serializeCategory(category))
        })
        .catch(next)
    })
    CategoryRouter
        .route('/:categoryid')
        .all((reql, res, next) => {
            CategoryService.getById(
                req.app.get('db'),
                req.params.categoryid
            )
                .then(category => {
                    if(!category) {
                        return res.status(404).json({
                            error: {message: `OOPS! Cant find category, Sorry`}
                        })
                    }
                    res.category = category
                    next()
                })
                .catch(next)
        })

        .get((req, res, next) => {
            res.json(serializeCategory(res.category))
        })
        .delete((req, res, next) => {
            CategoryService.deletecategory(
                req.app.get('db'),
                req.params.categoryid
            )
            .then(category => {
                res.status(204).json(category)
            })
            .catch(next)
        })

        module.exports = CategoryRouter
        
      