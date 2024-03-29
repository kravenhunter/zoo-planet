-- CreateTable
CREATE TABLE `Education` (
    `id` VARCHAR(191) NOT NULL,
    `timeStamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `imageBgLink` VARCHAR(191) NOT NULL,
    `imagePreviewLink` VARCHAR(191) NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `extraeDscription` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FightingExtinction` (
    `id` VARCHAR(191) NOT NULL,
    `timeStamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `imageBgLink` VARCHAR(191) NOT NULL,
    `imagePreviewLink` VARCHAR(191) NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `extraeDscription` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AboutUs` (
    `id` VARCHAR(191) NOT NULL,
    `timeStamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `imageBgLink` VARCHAR(191) NOT NULL,
    `imagePreviewLink` VARCHAR(191) NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `extraeDscription` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContactUs` (
    `id` VARCHAR(191) NOT NULL,
    `timeStamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `imageBgLink` VARCHAR(191) NOT NULL,
    `imagePreviewLink` VARCHAR(191) NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `extraeDscription` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `socialLink_1` VARCHAR(191) NULL,
    `socialLink_2` VARCHAR(191) NULL,
    `socialLink_3` VARCHAR(191) NULL,
    `socialLink_4` VARCHAR(191) NULL,
    `socialLink_5` VARCHAR(191) NULL,
    `copyright` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ticket` (
    `id` VARCHAR(191) NOT NULL,
    `timeStamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `imageBgLink` VARCHAR(191) NOT NULL,
    `imagePreviewLink` VARCHAR(191) NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `extraeDscription` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TicketPrice` (
    `id` VARCHAR(191) NOT NULL,
    `timeStamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `adult` VARCHAR(191) NOT NULL,
    `childCategoryFirst` VARCHAR(191) NOT NULL,
    `childCategorySecond` VARCHAR(191) NOT NULL,
    `concession` VARCHAR(191) NOT NULL,
    `seniors` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Membership` (
    `id` VARCHAR(191) NOT NULL,
    `timeStamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `imageBgLink` VARCHAR(191) NOT NULL,
    `imagePreviewLink` VARCHAR(191) NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `extraeDscription` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MembershipPrice` (
    `id` VARCHAR(191) NOT NULL,
    `timeStamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `adult` VARCHAR(191) NOT NULL,
    `childCategoryFirst` VARCHAR(191) NOT NULL,
    `childCategorySecond` VARCHAR(191) NOT NULL,
    `concession` VARCHAR(191) NOT NULL,
    `seniors` VARCHAR(191) NOT NULL,
    `teacher` VARCHAR(191) NOT NULL,
    `supporter` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `id` VARCHAR(191) NOT NULL,
    `timeStamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `title` VARCHAR(191) NOT NULL,
    `imageBgLink` VARCHAR(191) NOT NULL,
    `imagePreviewLink` VARCHAR(191) NULL,
    `description` VARCHAR(191) NOT NULL,
    `category` ENUM('Education', 'FightingExtinction', 'News', 'Species') NOT NULL,
    `extraeDscription` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContentPages` (
    `id` VARCHAR(191) NOT NULL,
    `timeStamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `imageBgLink` VARCHAR(191) NOT NULL,
    `imagePreviewLink` VARCHAR(191) NULL,
    `title` VARCHAR(191) NOT NULL,
    `subTitle` VARCHAR(191) NULL,
    `shortDescription` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `extraeDscription` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Specie` (
    `id` VARCHAR(191) NOT NULL,
    `timeStamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `title` VARCHAR(191) NOT NULL,
    `imageBgLink` VARCHAR(191) NOT NULL,
    `imagePreviewLink` VARCHAR(191) NULL,
    `habitain` VARCHAR(191) NOT NULL,
    `populationTrend` ENUM('Decreasing', 'Increasing', 'Stable') NOT NULL,
    `countLeft` VARCHAR(191) NOT NULL,
    `conservationStatus` ENUM('LC', 'NT', 'VU', 'EN', 'CR', 'EW', 'EX') NOT NULL,
    `shordDescription` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `extraeDscription` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlanPrice` (
    `id` VARCHAR(191) NOT NULL,
    `timeStamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `title` VARCHAR(191) NOT NULL,
    `admission` VARCHAR(191) NOT NULL,
    `faunaPark` VARCHAR(191) NOT NULL,
    `adultRatio` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
