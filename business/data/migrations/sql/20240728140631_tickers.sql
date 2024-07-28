-- migrate:up

CREATE TABLE tickers (
    ticker uuid not null primary key,
    'name' Text,

)

-- migrate:down
DROP TABLE tickers;