DROP TABLE IF EXISTS tasks;

CREATE TABLE tasks(
  id SERIAL PRIMARY KEY,
  todo_task varchar(255) NOT NULL,
  completed boolean NOT NULL DEFAULT FALSE
);

-- INSERT INTO
--   tasks(
--     todo_task
--   )
--   VALUES
--   (
--     'go to the store'
--   ),
--   (
--     'go to the dog park'
--   );

--
-- DROP TABLE IF EXISTS completed;