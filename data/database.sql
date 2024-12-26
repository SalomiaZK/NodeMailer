create database Jmaildb;
\c Jmaildb

create table "user" (
    id_user varchar(20) primary key , 
    username varchar(100) not null, 
    user_mail varchar(100) not null, 
    mdp varchar(100) not null

);



create table mail (
    id_mail varchar(100) primary key, 
    sender_mail varchar(100) not null, 
    receiver_mail varchar(100) not null, 
    "object" varchar(100), 
    instruction text, 
    id_user varchar(100), 
    constraint fk_mail_user foreign key (id_user) references "user"(id_user)
);

create table receive (
    id_user varchar(20), 
    id_mail varchar(20), 
    constraint fk_receiving_mail_user foreign key (id_user) references "user"(id_user), 
    constraint fk_receiving_mail_mail foreign key (id_mail) references mail(id_mail)
);