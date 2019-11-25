CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
   
        categoryid INTEGER
        REFERENCES category(id) ON DELETE CASCADE NOT NULL 
);
