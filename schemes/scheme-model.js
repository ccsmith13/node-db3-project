const db = require('../data/dbConfig.js');

module.exports = {
    find,
    findById,
    findSteps,
    add, 
    update,
    remove
}

//resolves to an array of schemes
function find(){
    return db('schemes')
}

//resolves to single user or null if id is invalid
function findById(id){
    return db('schemes').where({id}).first();
}

//resolves to an array of all correctly ordered step for the given scheme
function findSteps(id){
    return db('schemes as s')
        .join('steps as p', 's.id', 'p.scheme_id')
        .select('p.id', 's.scheme_name', 'p.step_number','p.instructions')
        .orderBy([
            { column: 's.scheme_name' }, 
            { column: 'p.step_number', order: 'asc' }
          ])
}

// Inserts scheme into the database. Resolves to the newly inserted scheme, including `id`.
function add(scheme){
    return db('schemes').insert(scheme)
}

// Updates the scheme with the given id. Resolves to the newly updated scheme object.
function update(scheme,id){
    return db('schemes').where({id}).update(scheme)
}

// Resolves to the removed scheme. Resolves to `null` on an invalid id.
function remove(id){
    return db('schemes').where({id}).del()
}