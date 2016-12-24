USE YACOFFEE;
DROP TABLE `OrderTable`;
DROP TABLE `Tables`;
DROP TABLE `Products`;
DROP TABLE `Users`  ;
DROP TABLE `Branches`;
DROP DATABASE YACOFFEE;

CREATE DATABASE YACOFFEE;
USE YACOFFEE;
CREATE TABLE `Users` (
`id` int(10) NOT NULL auto_increment,
`username` varchar(30) default '',
`password` varchar(100) default '',
`idGoogle` varchar(40),
`idFacebook` varchar(40),
`name` varchar(40) NOT NULL default '',
`phone` varchar(14) default '',
`email` varchar(40) default '',
`address` varchar(50) default '',
`role` varchar(10) default 'member',
PRIMARY KEY (`id`)
);

USE YACOFFEE;
CREATE TABLE `Branches` (
`idBranch` int(10) NOT NULL auto_increment,
`idManager` int(10) NOT NULL,
`phone` varchar(14) default '',
`Address` varchar(50) default '',
`Description` varchar(1000) default '',
`imageDirect` varchar(200) default '',
PRIMARY KEY (`idBranch`)
);

USE YACOFFEE;
CREATE TABLE `Tables` (
`idTable` int(10) NOT NULL auto_increment,
`idBranch` int(10) NOT NULL,
`code` varchar(3) NOT NULL,
`description` varchar(1000) default '',
`imageDirect` varchar(200) default '',
PRIMARY KEY (`idTable`),
FOREIGN KEY (idBranch) REFERENCES Branches(idBranch)
);

USE YACOFFEE;
CREATE TABLE `OrderTable`
(
`idOrder` int(10) NOT NULL auto_increment,
`idTable` int(10) NOT NULL,
`idUser` int(10) NOT NULL,
`date` date NOT NULL,
`startTime` time NOT NULL,
`endTime` time NOT NULL,
`phone` varchar(14) NOT NULL,
`name` varchar(40) NOT NULL,
`message` varchar(40),
PRIMARY KEY (`idOrder`),
FOREIGN KEY (idTable) REFERENCES Tables(idTable),
FOREIGN KEY (idUser) REFERENCES Users(id)
);

USE YACOFFEE;
CREATE TABLE `Products`
(
`id` int(10) NOT NULL auto_increment,
`name` varchar(14) NOT NULL,
`price` int(14) NOT NULL,
`imageDirect` varchar(200) default '',
`description` varchar(1000) default '',
PRIMARY KEY (`id`)
);

USE YACOFFEE;
CREATE TABLE `OrderDrink`
(
`idReceipt` int(10) NOT NULL auto_increment,
`idUser` int(10) NOT NULL,
`time` datetime NOT NULL,
`name` time NOT NULL,
`phone` time NOT NULL,
`address` varchar(14) NOT NULL,
PRIMARY KEY (`idReceipt`),
FOREIGN KEY (idUser) REFERENCES Users(id)
);

USE YACOFFEE;
CREATE TABLE `ReceiptInfo`
(
`idReceipt` int(10) NOT NULL,
`idProduct` int(10) NOT NULL,
`quantity` int(2) NOT NULL,
PRIMARY KEY (`idReceipt`,`idProduct`),
FOREIGN KEY (idProduct) REFERENCES Products(id),
FOREIGN KEY (idReceipt) REFERENCES OrderDrink(idReceipt)
);

INSERT INTO `Users` VALUES (null, 'normal', '123', null, null, 'normal user', '01699924568', 'gacon@yahoo.com', null, 'member');
INSERT INTO `Users` VALUES (null, 'manager1', '$2a$10$xlH.dc14/xOLTAUYlnZZOeVcq3U9jsrff0D8tWBjdicbhRW1a2xOm', null, null, 'manger user', '01693242368', 'manager@gmail.com', null, 'manager');
INSERT INTO `Users` VALUES (null, 'manager2', '$2a$10$xlH.dc14/xOLTAUYlnZZOeVcq3U9jsrff0D8tWBjdicbhRW1a2xOm', null, null, 'manger user', '01693242368', 'manager@gmail.com', null, 'manager');
INSERT INTO `Users` VALUES (null, 'manager3', '$2a$10$xlH.dc14/xOLTAUYlnZZOeVcq3U9jsrff0D8tWBjdicbhRW1a2xOm', null, null, 'manger user', '01693242368', 'manager@gmail.com', null, 'manager');
INSERT INTO `Users` VALUES (null, 'manager4', '$2a$10$xlH.dc14/xOLTAUYlnZZOeVcq3U9jsrff0D8tWBjdicbhRW1a2xOm', null, null, 'manger user', '01693242368', 'manager@gmail.com', null, 'manager');
INSERT INTO `Users` VALUES (null, 'manager5', '$2a$10$xlH.dc14/xOLTAUYlnZZOeVcq3U9jsrff0D8tWBjdicbhRW1a2xOm', null, null, 'manger user', '01693242368', 'manager@gmail.com', null, 'manager');
INSERT INTO `Users` VALUES (null, null, null, '113551191017950459231', null, 'google user', '01699924568', 'gacon@yahoo.com', null, 'admin');
INSERT INTO `Users` VALUES (null, null, null, null, '100009062588234', 'facebook user', '01699924568', 'gacon@yahoo.com', null, 'manager');

INSERT INTO `Branches` VALUES (null,2,'086235666','497 Hoa Hao Street tpHCM','View Dep','Branches/1');
INSERT INTO `Branches` VALUES (null,3,'096235667','20 Phu Dong Thien Vuong Ha Noi','Co bai giu xe rieng','Branches/2');
INSERT INTO `Branches` VALUES (null,4,'096253667','1 Tran Hung dao, HCM city',null,'Branches/3');
INSERT INTO `Branches` VALUES (null,5,'0962225667','80/2A Ngo Van tu, Quan 10, HCM city',null,'Branches/4');
INSERT INTO `Branches` VALUES (null,6,'0962543347','20 Vo Van Ngan, Thu Duc, HCM city',null,'Branches/5');

INSERT INTO `Tables` VALUES(null,1,'A01','1','Tables/1.jpg');
INSERT INTO `Tables` VALUES(null,1,'A02','1','Tables/2.jpg');
INSERT INTO `Tables` VALUES(null,1,'A03','1','Tables/3.jpg');
INSERT INTO `Tables` VALUES(null,2,'B01','2','Tables/4.jpg');
INSERT INTO `Tables` VALUES(null,2,'B02','2','Tables/5.jpg');
INSERT INTO `Tables` VALUES(null,1,'A04','1','Tables/6.jpg');
INSERT INTO `Tables` VALUES(null,1,'A05','1','Tables/7.jpg');
INSERT INTO `Tables` VALUES(null,1,'A06','2','Tables/8.jpg');
INSERT INTO `Tables` VALUES(null,3,'C01','2','Tables/9.jpg');
INSERT INTO `Tables` VALUES(null,3,'C02','2','Tables/10.jpg');
INSERT INTO `Tables` VALUES(null,3,'C03','2','Tables/11.jpg');
INSERT INTO `Tables` VALUES(null,4,'D01','2','Tables/12.jpg');
INSERT INTO `Tables` VALUES(null,4,'D02','2','Tables/13.jpg');
INSERT INTO `Tables` VALUES(null,5,'E01','2','Tables/14.jpg');
INSERT INTO `Tables` VALUES(null,5,'E02','2','Tables/15.jpg');
INSERT INTO `Tables` VALUES(null,5,'E03','2','Tables/16.jpg');
INSERT INTO `Tables` VALUES(null,5,'E04','2','Tables/17.jpg');

INSERT INTO `Products` VALUES (null,'Lemon Juice','50000','products/coffee01.jpg',null);
INSERT INTO `Products` VALUES (null,'Strawberry Juice','30000','products/coffee02.jpg',null);
INSERT INTO `Products` VALUES (null,'Blue Ocean','40000','products/coffee03.jpg',null);
INSERT INTO `Products` VALUES (null,'Orange Juice','55000','products/coffee04.jpg',null);
INSERT INTO `Products` VALUES (null,'Fruit Mixer','35000','/products/coffee05.jpg',null);
INSERT INTO `Products` VALUES (null,'Cappuchino','50000','products/coffee07.jpg',null);
INSERT INTO `Products` VALUES (null,'Whisper Rank','40000','products/coffee08.jpg',null);
INSERT INTO `Products` VALUES (null,'Green Rice','35000','products/coffee09.jpg',null);
INSERT INTO `Products` VALUES (null,'Dasani','25000','products/coffee10.jpg',null);
INSERT INTO `Products` VALUES (null,'Black Coffee','15000','products/coffee11.jpg',null);
INSERT INTO `Products` VALUES (null,'Chocolate Junk','25000','products/p8.jpg',null);
INSERT INTO `Products` VALUES (null,'Kiwi Kiwi','45000','products/p5.jpg',null);
INSERT INTO `Products` VALUES (null,'Soulmate','45000','products/coffee12.jpg',null);

INSERT INTO `OrderTable` VALUES (null, 1, 1, '2016-12-29', '02:13:00',  '17:46:00', '21312909', 'test1', 'send1');
INSERT INTO `OrderTable` VALUES (null, 2, 7, '2016-11-29', '03:13:00',  '18:46:00', '31312909', 'test2', 'send2');
INSERT INTO `OrderTable` VALUES (null, 3, 7, '2016-10-29', '04:13:00',  '19:46:00', '41312909', 'test3', 'send3');
INSERT INTO `OrderTable` VALUES (null, 4, 8, '2016-09-29', '05:13:00',  '20:46:00', '51312909', 'test4', 'send4');
INSERT INTO `OrderTable` VALUES (null, 5, 8, '2016-02-29', '06:13:00',  '21:46:00', '61312909', 'test5', 'send5');
