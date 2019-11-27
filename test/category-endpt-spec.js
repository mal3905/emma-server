const knex = require('knex');
const app = require('../src/app');
const { makeCategoriesArray } = require('./categories.fixtures');

describe('Cat Endpoints', function() {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)
  });

  after('disconnect from db', () => db.destroy())

  before('clean the table', () => db.raw('TRUNCATE category, items RESTART IDENTITY CASCADE'));

  afterEach('cleanup',() => db.raw('TRUNCATE category, items RESTART IDENTITY CASCADE'));
  
  //GET: 
  describe(`GET /api/category`, () => {
    //passing 
    context(`Given no Cats`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/category')
          .expect(200, [])
      })
  });

    context('Given there are cats in the database', () => {
      const testCategories = makeCategoriesArray();

      beforeEach('insert cats', () => {
        return db
          .into('category')
          .insert(testCategories)
      })

      it('responds with 200 and all of the cats', () => {
        return supertest(app)
          .get('/api/category')
          .expect(200, testCategories)
      })
    });


  });
//GET By ID
  describe(`GET /api/category/:categoryid`, () => {
    context(`Given no cats`, () => {
      it(`responds with 404`, () => {
        const categoryid = 123456
        return supertest(app)
          .get(`/api/category/${categoryid}`)
          .expect(404, { error: { message: `Sorry, category doesn't exist` } })
  
      })
    });

    context('Given there are categories in the database', () => {
      const testCategories = makeCategoriesArray()

      beforeEach('insert category', () => {
        return db
          .into('category')
          .insert(testCategories)
      })

      it('responds with 200 and the specified cats', () => {
        const categoryid = 2
        const expectedCategories = testCategories[categoryid - 1]
        return supertest(app)
          .get(`/api/category/${categoryid}`)
          .expect(200, expectedCategories)
      });
    });



//POST
//passing 
  describe(`POST /api/category`, () => {
    it(`creates cat, responding with 201 and the new cat`, () => {
      const newCategory = {
        name: 'Test new cat name',
        date_created: 'Test cats date created'
      }
      return supertest(app)
        .post('/api/category')
        .send(newCategory)
        .expect(201)
        .expect(res => {
          expect(res.body.name).to.eql(newCategory.name)
          expect(res.body).to.have.property('id')
        })
        .then(res =>
          supertest(app)
            .get(`/api/category/${res.body.id}`)
            .expect(res.body)
        )
    });

    const requiredFields = ['name'];

    requiredFields.forEach(field => {
      const newCategory = {
        name: 'Test new cat name',
        date_created: 'Test cats date created'
      }

      it(`responds with 400 and an error message when the '${field}' is missing`, () => {
        delete newCategory[field]

        return supertest(app)
          .post('/api/category')
          .send(newCategory)
          .expect(400, {
            error: { message: `Missing Category ${field}` }
          })
      })
    });

  });

  describe(`DELETE /api/category/:categoryid`, () => {
      const testCategories = makeCategoriesArray();

      beforeEach('insert cats', () => {
        return db
          .into('category')
          .insert(testCategories)
        })

      it('responds with 204 and remove the cat', () => {
        const idToRemove = 2;
        const testCategories = makeCategoriesArray();
        const expectedCategories = testCategories.filter(category => category.id !== idToRemove);
        return supertest(app)
          .delete(`/api/category/${idToRemove}`)
          .expect(204)
          .then(res =>
            supertest(app)
              .get(`/api/category`)
              .expect(expectedCategories)
          )
      });
    })

    context(`Given no cats`, () => {
      it(`responds with 404`, () => {
        const categoryid = 123456;
        return supertest(app)
          .delete(`/api/category/${categoryid}`)
          .expect(404, { 
            error: { 
              message: `Sorry, category doesn't exist` 
            }
          })
      })
    });
  
})
}) 