CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25),
  password VARCHAR(25) NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  guest_session TEXT NOT NULL
);

CREATE TABLE follows (
  user_following_id INTEGER
   REFERENCES users ON DELETE CASCADE,
  user_being_followed_id INTEGER
   REFERENCES users ON DELETE CASCADE,
   PRIMARY KEY (user_following_id, user_being_followed_id)
  
);

CREATE TABLE queue (
  user_id INTEGER
    REFERENCES users ON DELETE CASCADE,
  movie_id INTEGER NOT NULL,
  PRIMARY KEY (user_id)
    
  
);

CREATE TABLE watchlist (
  user_id INTEGER
    REFERENCES users ON DELETE CASCADE,
  movie_id INTEGER NOT NULL,
  PRIMARY KEY (user_id)
);