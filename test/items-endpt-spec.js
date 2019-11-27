const knex = require('knex')
const app = require('../src/app')
const { makeItemsArray} = require('./items.fixtures');
const {makeCategoriesArray} = require('./categories.fixtures');


describe('items Endpoints', function() {
  let db

  before('make knex instance', () => {

    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)

  });

  after('disconnect from db', () => db.destroy())

  before('clean the table', () => db.raw('TRUNCATE  category, items RESTART IDENTITY CASCADE'))

  afterEach('cleanup',() => db.raw('TRUNCATE  category, items RESTART IDENTITY CASCADE'))

  //GET: PASSING 
  describe(`GET /api/items`, () => {
    context(`Given no items`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/items')
          .expect(200, [])
      });
    });

    context('Given there are items in the database', () => {
      const testItems = makeItemsArray();
      const testcategories = makeCategoriesArray();

      beforeEach('insert cats', () => {
        return db
          .into('category')
          .insert(testcategories)
          .then(() => {
            return db
              .into('items')
              .insert(testItems)
          });
      });

      it('responds with 200 and all of the items', () => {
        return supertest(app)
          .get('/api/items')
          .expect(200, testItems)
      })
    })


  });
//GET BY ID: PASSING
  describe(`GET /api/items/:item_id`, () => {
    context(`Given no items`, () => {
      it(`responds with 404`, () => {
        const itemsId = 123456
        return supertest(app)
          .get(`/api/items/${itemsId}`)
          .expect(404, { error: { message: `item doesn't exist` } })
      })
    })

    context('Given there are items in the database', () => {
      const testItems = makeItemsArray();
      const testcategories = makeCategoriesArray();
      

      beforeEach('insert item', () => {
        return db
          .into('category')
          .insert(testcategories)
          .then(() => {
            return db
              .into('items')
              .insert(testItems) 
          })
      })

      it('responds with 200 and the specified item', () => {
        const itemsId = 2
        const expecteditems = testItems[itemsId - 1]
        return supertest(app)
          .get(`/api/items/${itemsId}`)
          .expect(200, expecteditems)
      })
    })
  })
 //POST: 
  describe(`POST /api/items`, () => {
    const testItems = makeItemsArray();
    const testcategories = makeCategoriesArray();

    beforeEach('insert items', () => {
      return db 
        .into('category')
        .insert(testcategories)
    })

    it(`creates an item, responding with 201 and the new items`, () => {
      const newitems = {
        name: 'Test new item',
        categoryid: 1
      }
      return supertest(app)
        .post('/api/items')
        .send(newitems)
        .expect(201)
        .expect(res => {
          expect(res.body.name).to.eql(newitems.name)
          expect(res.body.categoryid).to.eql(newitems.categoryid)          
          expect(res.body).to.have.property('id')
          expect(res.headers.location).to.eql(`/api/items/${res.body.id}`)   
         })
         .then(res =>
          supertest(app)
            .get(`/api/items/${res.body.id}`)
            .expect(res.body)
         )
    })

    const requiredFields = ['name', 'categoryid' ];

    requiredFields.forEach(field => {
      const newitems = {
        name: 'Test new item', 
        categoryid: 1,
        
        
      }

      it(`responds with 400 and an error message when the '${field}' is missing`, () => {
        delete newitems[field]

        return supertest(app)
          .post('/api/items')
          .send(newitems)
          .expect(400, {
            error: { message: `Missing '${field}' in request body` }
          })
      })
    })

  });

  describe(`DELETE /api/items/:categoryid`, () => {
    context(`Given no items`, () => {
      it(`responds with 404`, () => {
        const itemsId = 123456
        return supertest(app)
          .delete(`/api/items/${itemsId}`)
          .expect(404, { error: { message: `item doesn't exist` } })
      })
    });

    context('', () => {
      const testitems = makeItemsArray();
      const testcategories = makeCategoriesArray();
      beforeEach('insert items', () => {

            return db
              .into('category')
              .insert(testcategories)
              .then(() => {
                return db
                  .into('items')
                  .insert(testitems)
          })
      })

      it('responds with 204 and removes the items', () => {
        const idToRemove = 2
        const expecteditems = testitems.filter(items => items.id !== idToRemove)
        return supertest(app)
          .delete(`/api/items/${idToRemove}`)
          .expect(204)
          .then(res =>
            supertest(app)
              .get(`/api/items`)
              .expect(expecteditems)
          )
        });
      })
      
    });
      
  });