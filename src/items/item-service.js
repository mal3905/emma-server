const itemService = {
   
    getByCategory(knex, id) {
        return knex.select('*').from('items')
            .where('categoryid', id) 
    },
   
    getAllItems(knex) {
        return knex.select('*').from('items')
    },

    insertItem(knex, newItems){
        return knex 
            .insert(newItems)
            .into('items')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
                
    },

    getById(knex, id) {
        return knex
          .from('items')
          .select('*')
          .where('id', id)
          .first()
      },

      deleteItem(knex, id) {
        return knex('items')
          .where({ id })
          .delete()
      },

      updateItem(knex, id, newItemsFields) {
        return knex('items')
          .where({ id })
          .update(newItemsFields)
      },
       
}

module.exports = itemService