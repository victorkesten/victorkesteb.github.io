#use stene; # Byt till eget användarnamn

#drop table bostader; # Om det finns en tidigare databas

CREATE TABLE bostader (
lan varchar(64),
objekttyp varchar(64),
adress varchar(64),
area float,
rum int,
pris float,
avgift float
);


insert into bostader values ('Stockholm','Bostadsrätt','Polhemsgatan 1',30,1,1000000,1234);

insert into bostader values ('Stockholm','Bostadsrätt','Polhemsgatan 2',60,2,2000000,2345);

insert into bostader values ('Stockholm','Villa','Stockholmorgatan 1',130,5,1000000,3456);

insert into bostader values ('Stockholm','Villa','Storgatan 2',160,6,1000000,3456);

insert into bostader values ('Uppsala','Bostadsrätt','Gröna gatan 1',30,1,500000,1234);

insert into bostader values ('Uppsala','Bostadsrätt','Gröna gatan 2',60,2,1000000,2345);

insert into bostader values ('Uppsala','Villa','Kungsängsvägen 1',130,5,1000000,3456);

insert into bostader values ('Uppsala','Villa','Kungsängsvägen 2',160,6,1000000,3456);

#Bostader new inserts. 8 Old + 9 
insert into bostader values ('Stockholm', 'Bostadsrätt', 'Kungstensgatan 32',25,1,2000000,1200);
insert into bostader values ('Stockholm', 'Bostadsrätt', 'Kungstensgatan 33',240,8,15000000,3410);
insert into bostader values ('Stockholm', 'Villa', 'Kungstensgatan 31',60,3,3500000,2210);
insert into bostader values ('Uppsala', 'Bostadsrätt', 'Röda gatan 2',140,3,1500000,1900);
insert into bostader values ('Uppsala', 'Villa', 'Kungsängsvägen 3',500,15,4000000,4800);
insert into bostader values ('Uppsala', 'Villa', 'Kungsängsvägen 4',93,4,1500000,6000);
insert into bostader values ('Göteborg', 'Bostadsrätt', 'Kungsgatan 1', 50, 2, 2500000, 2400);
insert into bostader values ('Göteborg', 'Bostadsrätt', 'Kungsgatan 2', 102, 4, 3000000, 5400);
insert into bostader values ('Göteborg', 'Villa', 'Storgatan 41', 400, 12, 8000000, 3400);

SELECT * FROM bostader