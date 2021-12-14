-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 14, 2021 at 01:52 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ubayaverse`
--

-- --------------------------------------------------------

--
-- Table structure for table `action`
--

CREATE TABLE `action` (
  `idaction` int(11) NOT NULL,
  `action` enum('Like','Comment') NOT NULL,
  `action_at` datetime NOT NULL,
  `comment` text,
  `idpost` int(11) NOT NULL,
  `username` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `collection`
--

CREATE TABLE `collection` (
  `idcollection` int(11) NOT NULL,
  `nama_collection` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `collection_post`
--

CREATE TABLE `collection_post` (
  `idpost` int(11) NOT NULL,
  `idcollection` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `follow`
--

CREATE TABLE `follow` (
  `username` varchar(45) NOT NULL,
  `following` varchar(45) NOT NULL,
  `isMuted` int(11) NOT NULL,
  `follow_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `idpost` int(11) NOT NULL,
  `caption` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `uploaded_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `username` varchar(45) NOT NULL,
  `nama` varchar(45) NOT NULL,
  `gender` enum('Laki','Perempuan') NOT NULL,
  `password` varchar(45) NOT NULL,
  `tanggal_lahir` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `lokasi` varchar(45) DEFAULT NULL,
  `bio` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`username`, `nama`, `gender`, `password`, `tanggal_lahir`, `email`, `lokasi`, `bio`) VALUES
('billy', 'Billy', 'Laki', '123', '2021-12-15', 'billy@gmail.com', 'Surabaya', 'Hi! Billy\'s here.'),
('kenneth', 'Kenneth', 'Laki', '123', '2021-12-14', 'kenneth@gmail.com', 'Surabaya', 'Hi! Kenneth\'s here.'),
('mario', 'Mario', 'Laki', '123', '2021-12-16', 'mario@gmail.com', 'Surabaya', 'Hi! Mario\'s here.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `action`
--
ALTER TABLE `action`
  ADD PRIMARY KEY (`idaction`),
  ADD KEY `fk_post_has_user_user1_idx` (`username`),
  ADD KEY `fk_post_has_user_post1_idx` (`idpost`);

--
-- Indexes for table `collection`
--
ALTER TABLE `collection`
  ADD PRIMARY KEY (`idcollection`),
  ADD KEY `fk_collection_user1_idx` (`username`);

--
-- Indexes for table `collection_post`
--
ALTER TABLE `collection_post`
  ADD PRIMARY KEY (`idpost`,`idcollection`),
  ADD KEY `fk_post_has_collection_collection1_idx` (`idcollection`),
  ADD KEY `fk_post_has_collection_post1_idx` (`idpost`);

--
-- Indexes for table `follow`
--
ALTER TABLE `follow`
  ADD PRIMARY KEY (`username`,`following`),
  ADD KEY `fk_user_has_user_user1_idx` (`following`),
  ADD KEY `fk_user_has_user_user_idx` (`username`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`idpost`),
  ADD KEY `fk_post_user1_idx` (`username`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `action`
--
ALTER TABLE `action`
  MODIFY `idaction` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `collection`
--
ALTER TABLE `collection`
  MODIFY `idcollection` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `idpost` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `action`
--
ALTER TABLE `action`
  ADD CONSTRAINT `fk_post_has_user_post1` FOREIGN KEY (`idpost`) REFERENCES `post` (`idpost`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_post_has_user_user1` FOREIGN KEY (`username`) REFERENCES `user` (`username`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `collection`
--
ALTER TABLE `collection`
  ADD CONSTRAINT `fk_collection_user1` FOREIGN KEY (`username`) REFERENCES `user` (`username`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `collection_post`
--
ALTER TABLE `collection_post`
  ADD CONSTRAINT `fk_post_has_collection_collection1` FOREIGN KEY (`idcollection`) REFERENCES `collection` (`idcollection`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_post_has_collection_post1` FOREIGN KEY (`idpost`) REFERENCES `post` (`idpost`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `follow`
--
ALTER TABLE `follow`
  ADD CONSTRAINT `fk_user_has_user_user` FOREIGN KEY (`username`) REFERENCES `user` (`username`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_user_has_user_user1` FOREIGN KEY (`following`) REFERENCES `user` (`username`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `fk_post_user1` FOREIGN KEY (`username`) REFERENCES `user` (`username`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
