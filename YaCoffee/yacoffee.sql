-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 05, 2016 at 03:56 AM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 5.6.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `yacoffee`
--

-- --------------------------------------------------------

--
-- Table structure for table `branches`
--

CREATE TABLE `branches` (
  `idBranch` int(10) NOT NULL,
  `phone` varchar(14) DEFAULT '',
  `Address` varchar(50) DEFAULT '',
  `Description` varchar(1000) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `branches`
--

INSERT INTO `branches` (`idBranch`, `phone`, `Address`, `Description`) VALUES
(1, '086235666', '497 Hoa Hao Street tpHCM', NULL),
(2, '096235667', '20 Phu Dong Thien Vuong Ha Noi', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ordertable`
--

CREATE TABLE `ordertable` (
  `idOrder` int(10) NOT NULL,
  `idTable` int(10) NOT NULL,
  `idUser` int(10) NOT NULL,
  `time` datetime NOT NULL,
  `phone` varchar(14) NOT NULL,
  `name` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(10) NOT NULL,
  `name` varchar(14) NOT NULL,
  `price` int(14) NOT NULL,
  `imageDirect` varchar(200) DEFAULT '',
  `description` varchar(1000) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `imageDirect`, `description`) VALUES
(1, 'Coffee1', 10000, 'products/coffee01.jpg', NULL),
(2, 'Coffee2', 20000, 'products/coffee02.jpg', NULL),
(3, 'Coffee3', 30000, 'products/coffee03.jpg', NULL),
(4, 'Coffee4', 40000, 'products/coffee04.jpg', NULL),
(5, 'Coffee5', 50000, 'products/coffee05.jpg', NULL),
(6, 'Coffee6', 60000, 'products/coffee06.jpg', NULL),
(7, 'Coffee7', 70000, 'products/coffee07.jpg', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tables`
--

CREATE TABLE `tables` (
  `idTable` int(10) NOT NULL,
  `idBranch` int(10) NOT NULL,
  `description` varchar(1000) DEFAULT '',
  `imageDirect` varchar(200) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tables`
--

INSERT INTO `tables` (`idTable`, `idBranch`, `description`, `imageDirect`) VALUES
(1, 1, '1', '/Image/Tables/1'),
(2, 1, '2', '/Image/Tables/2'),
(3, 1, '3', '/Image/Tables/3'),
(4, 2, '1', '/Image/Tables/4'),
(5, 2, '2', '/Image/Tables/5');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) NOT NULL,
  `username` varchar(30) DEFAULT '',
  `password` varchar(100) DEFAULT '',
  `idGoogle` varchar(40) DEFAULT NULL,
  `idFacebook` varchar(40) DEFAULT NULL,
  `name` varchar(40) NOT NULL DEFAULT '',
  `phone` varchar(14) DEFAULT '',
  `email` varchar(40) DEFAULT '',
  `address` varchar(50) DEFAULT '',
  `role` varchar(10) DEFAULT 'member'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `idGoogle`, `idFacebook`, `name`, `phone`, `email`, `address`, `role`) VALUES
(1, 'normal', '123', NULL, NULL, 'normal user', '01699924568', 'gacon@yahoo.com', NULL, 'member'),
(2, NULL, NULL, '113551191017950459231', NULL, 'google user', '01699924568', 'gacon@yahoo.com', NULL, 'admin'),
(3, NULL, NULL, NULL, '100009062588234', 'facebook user', '01699924568', 'gacon@yahoo.com', NULL, 'manager');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `branches`
--
ALTER TABLE `branches`
  ADD PRIMARY KEY (`idBranch`);

--
-- Indexes for table `ordertable`
--
ALTER TABLE `ordertable`
  ADD PRIMARY KEY (`idOrder`),
  ADD KEY `idTable` (`idTable`),
  ADD KEY `idUser` (`idUser`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tables`
--
ALTER TABLE `tables`
  ADD PRIMARY KEY (`idTable`),
  ADD KEY `idBranch` (`idBranch`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `branches`
--
ALTER TABLE `branches`
  MODIFY `idBranch` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `ordertable`
--
ALTER TABLE `ordertable`
  MODIFY `idOrder` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `tables`
--
ALTER TABLE `tables`
  MODIFY `idTable` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `ordertable`
--
ALTER TABLE `ordertable`
  ADD CONSTRAINT `ordertable_ibfk_1` FOREIGN KEY (`idTable`) REFERENCES `tables` (`idTable`),
  ADD CONSTRAINT `ordertable_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`);

--
-- Constraints for table `tables`
--
ALTER TABLE `tables`
  ADD CONSTRAINT `tables_ibfk_1` FOREIGN KEY (`idBranch`) REFERENCES `branches` (`idBranch`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
