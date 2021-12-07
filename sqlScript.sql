-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema awa
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema awa
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `awa` DEFAULT CHARACTER SET utf8 ;
USE `awa` ;

-- -----------------------------------------------------
-- Table `awa`.`restaurants`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `awa`.`restaurants` (
  `idRestaurant` INT(11) NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(255) NULL DEFAULT NULL,
  `PriceLevel` INT(4) NULL DEFAULT NULL,
  `Address` VARCHAR(255) NULL,
  `OperatingHours` VARCHAR(255) NULL,
  `Foods` VARCHAR(255) NULL,
  `FoodsPrices` VARCHAR(255) NULL COMMENT '\n',
  PRIMARY KEY (`idRestaurant`),
  UNIQUE INDEX `idRestaurant_UNIQUE` (`idRestaurant` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `awa`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `awa`.`users` (
  `idUser` INT(11) NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(255) NOT NULL,
  `Password` VARCHAR(255) NULL DEFAULT NULL,
  `AdminAccount` TINYINT(4) NULL DEFAULT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE INDEX `idCustomer_UNIQUE` (`idUser` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `awa`.`orderhistory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `awa`.`orderhistory` (
  `idOrderHistory` INT(11) NOT NULL AUTO_INCREMENT,
  `Price` DOUBLE NULL DEFAULT NULL,
  `Date` DATE NULL DEFAULT NULL,
  `Users_idUser` INT(11) NOT NULL,
  `Restaurants_idRestaurant` INT(11) NOT NULL,
  `OrderedItems` VARCHAR(255) NULL,
  PRIMARY KEY (`idOrderHistory`),
  UNIQUE INDEX `idOrderHistory_UNIQUE` (`idOrderHistory` ASC) VISIBLE,
  INDEX `fk_OrderHistory_Users1_idx` (`Users_idUser` ASC) VISIBLE,
  INDEX `fk_OrderHistory_Restaurants1_idx` (`Restaurants_idRestaurant` ASC) VISIBLE,
  CONSTRAINT `fk_OrderHistory_Restaurants1`
    FOREIGN KEY (`Restaurants_idRestaurant`)
    REFERENCES `awa`.`restaurants` (`idRestaurant`),
  CONSTRAINT `fk_OrderHistory_Users1`
    FOREIGN KEY (`Users_idUser`)
    REFERENCES `awa`.`users` (`idUser`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

USE `awa` ;

-- -----------------------------------------------------
-- procedure CreateOrderHistory
-- -----------------------------------------------------

DELIMITER $$
USE `awa`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateOrderHistory`(IN inOrderedItems VARCHAR(255), IN inPrice DOUBLE,IN inUserID INT, IN inRestaurantID INT )
BEGIN

INSERT INTO OrderHistory(idOrderHistory,Price,Date,Users_idUser,Restaurants_idRestaurant,OrderedItems) VALUES (0,inPrice,current_date(),inUserID,inRestaurantID,inOrderedItems);

END$$

DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
