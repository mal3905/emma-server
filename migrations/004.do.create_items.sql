CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    
    listid INTEGER
        REFERENCES list(id) ON DELETE CASCADE NOT NULL,
    categoryid INTEGER
        REFERENCES category(id) ON DELETE CASCADE NOT NULL 
);
