drop table if exists config cascade;
create table config (
  id varchar(100) not null
, name varchar(100) not null
, description varchar(4000)
, ordinal smallint not null
-- common columns
, deleted smallint not null default 0
, regist varchar(100) not null
, register varchar(100) not null
, registered timestamp not null
, amend varchar(100) not null
, amender varchar(100) not null
, updated timestamp not null
, constraint config_pk primary key(id, name)
);
