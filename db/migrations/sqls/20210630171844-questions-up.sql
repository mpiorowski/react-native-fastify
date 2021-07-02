CREATE TABLE questions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
  question text,
  number numeric,
  answer1 text,
  answer2 text,
  answer3 text,
  answer4 text,
  correct numeric,
  date timestamptz,
  active boolean DEFAULT TRUE,
  created timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated timestamptz
);

CREATE TABLE answers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
  username text unique,
  q1 numeric,
  q2 numeric,
  q3 numeric,
  q4 numeric,
  q5 numeric,
  q6 numeric,
  q7 numeric,
  q8 numeric,
  q9 numeric,
  q10 numeric,
  q11 numeric,
  q12 numeric,
  q13 numeric,
  q14 numeric,
  q15 numeric,
  q16 numeric,
  active boolean DEFAULT TRUE,
  created timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated timestamptz
);

insert into questions (question,
  number,
  answer1,
  answer2,
  answer3,
  answer4,
  correct,
  date) values (
    'W których roku urodził się Mateusz', 1, '1992', '1993', '1994', '1995', 1, '2021-01-01'
  );

  insert into questions (question,
  number,
  answer1,
  answer2,
  answer3,
  answer4,
  correct,
  date) values (
    'W których roku urodziła się Agata', 2, '1768', 'Nikt tego nie wie', 'Ona żyje wiecznie', 'A kto ot Agata?', 1, '2021-01-01'
  );
