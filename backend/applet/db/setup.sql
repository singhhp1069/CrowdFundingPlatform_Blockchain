CREATE TABLE accounts(
   id SERIAL UNIQUE PRIMARY KEY NOT NULL,
   account_address TEXT,
   project_owner_address TEXT,
   backer_address TEXT
);

