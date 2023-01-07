\echo 'Delete and recreate movie_madness db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE movie_madness;
CREATE DATABASE movie_madness;
\connect movie_madness

\i src/scripts/movieMadnessSchema.sql


\echo 'Delete and recreate movie_madness_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE movie_madness_test;
CREATE DATABASE movie_madness_test;
\connect movie_madness_test

\i src/scripts/movieMadnessSchema.sql