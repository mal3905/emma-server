const CategoryService = {
    getAllCategory(knex) {
      return knex.select('*').from('category')
    },
  
    insertcategory(knex, newcategory) {
      return knex
        .insert(newCategory)
        .into('category')
        .returning('*')
        .then(rows => {
          return rows[0]
        })
    },
  
    getById(knex, id) {
      return knex
        .from('category')
        .select('*')
        .where('id', id)
        .first()
    },
  
    deletecategory(knex, id) {
      return knex('category')
        .where({ id })
        .delete()
    },
  
    updatecategory(knex, id, newCategoryFields) {
      return knex('category')
        .where({ id })
        .update(newCategoryFields)
    },
  }
  
  module.exports = CategoryService