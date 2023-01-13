-- `tumulus-api`.Asset definition

CREATE TABLE `Asset` (
  `sno` int(11) NOT NULL AUTO_INCREMENT,
  `assetId` bigint(20) DEFAULT '0',
  `fileName` varchar(255) NOT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) DEFAULT NULL,
  PRIMARY KEY (`sno`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `Asset_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- `tumulus-api`.TxLog definition

CREATE TABLE `TxLog` (
  `no` int(11) NOT NULL AUTO_INCREMENT,
  `method` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `gasUsed` int(11) DEFAULT NULL,
  `id` bigint(20) DEFAULT NULL,
  `owner` varchar(255) DEFAULT NULL,
  `viewer` varchar(255) DEFAULT NULL,
  `announcer` varchar(255) DEFAULT NULL,
  `assetId` bigint(20) DEFAULT NULL,
  `bit` int(11) DEFAULT NULL,
  `data` varchar(255) DEFAULT NULL,
  `sno` int(11) DEFAULT NULL,
  `value` int(11) DEFAULT NULL,
  `arguments` varchar(255) DEFAULT NULL,
  `transactionHash` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`no`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- `tumulus-api`.`User` definition

CREATE TABLE `User` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `emailAsId` varchar(255) NOT NULL,
  `vcode` varchar(255) DEFAULT NULL,
  `walletAddress` text,
  `safeKey` text,
  `publicKey` text,
  `privateKey` text,
  `status` varchar(255) DEFAULT 'NEW',
  `hash` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
