-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 16, 2024 at 03:34 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sports_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` int(10) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `title`, `description`, `photo`, `created_at`) VALUES
(1, 'The Rise of University Football', 'University football has seen significant growth in recent years, becoming a popular sport among students across the country. With the increase in participation and support, university football programs have gained more attention from fans, sponsors, and media outlets.', 'http://localhost:5000/uploads/photos/img1-1713088478979.jpg', '2024-04-15 04:30:56'),
(2, 'Challenges in University Football', 'Despite its popularity, university football faces several challenges, including funding issues, maintaining academic standards for athletes, and balancing sports with academic commitments. These challenges require innovative solutions to ensure the continued success and growth of university football programs.', 'http://localhost:5000/uploads/photos/img1-1713088478979.jpg', '2024-04-15 04:30:56'),
(3, 'The Impact of University Football on Campus Life', 'University football brings together students, faculty, and alumni, creating a sense of community and school spirit on campus. The excitement and camaraderie associated with game days contribute to a vibrant campus life, fostering connections and memories that last a lifetime.', 'http://localhost:5000/uploads/photos/img1-1713088478979.jpg', '2024-04-15 04:30:56'),
(5, 'Tesitng the blogs', 'Blog descriptions', 'https://www.tbsnews.net/sites/default/files/styles/infograph/public/images/2023/06/28/iubat_picture.jpg', '2024-04-15 06:10:22');

-- --------------------------------------------------------

--
-- Table structure for table `lineups`
--

CREATE TABLE `lineups` (
  `lineup_id` int(11) NOT NULL,
  `match_id` int(11) DEFAULT NULL,
  `team_id` int(11) DEFAULT NULL,
  `player_id` int(11) DEFAULT NULL,
  `is_starting` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lineups`
--

INSERT INTO `lineups` (`lineup_id`, `match_id`, `team_id`, `player_id`, `is_starting`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 2, 0, '2024-03-27 09:59:00', '2024-03-27 09:59:00');

-- --------------------------------------------------------

--
-- Table structure for table `matches`
--

CREATE TABLE `matches` (
  `match_id` int(11) NOT NULL,
  `home_team_id` int(11) DEFAULT NULL,
  `away_team_id` int(11) DEFAULT NULL,
  `match_date` datetime DEFAULT NULL,
  `match_time` time DEFAULT NULL,
  `venue` varchar(255) DEFAULT NULL,
  `referee_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `matches`
--

INSERT INTO `matches` (`match_id`, `home_team_id`, `away_team_id`, `match_date`, `match_time`, `venue`, `referee_id`, `created_at`, `updated_at`) VALUES
(8, 6, 7, '2024-04-30 00:00:00', '12:00:00', 'IUBAT', 31, '2024-04-14 10:22:16', '2024-04-14 10:22:16'),
(9, 7, 6, '2024-04-25 00:00:00', '10:00:00', 'IUBAT', 31, '2024-04-15 00:10:01', '2024-04-15 00:10:01');

-- --------------------------------------------------------

--
-- Table structure for table `match_results`
--

CREATE TABLE `match_results` (
  `result_id` int(11) NOT NULL,
  `match_id` int(11) DEFAULT NULL,
  `home_team_score` int(11) DEFAULT NULL,
  `away_team_score` int(11) DEFAULT NULL,
  `winner_team_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `match_results`
--

INSERT INTO `match_results` (`result_id`, `match_id`, `home_team_score`, `away_team_score`, `winner_team_id`, `created_at`, `updated_at`) VALUES
(5, 8, 3, 3, 0, '2024-04-14 19:35:16', '2024-04-14 19:35:16');

-- --------------------------------------------------------

--
-- Table structure for table `notices`
--

CREATE TABLE `notices` (
  `id` int(10) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notices`
--

INSERT INTO `notices` (`id`, `title`, `description`, `created_at`) VALUES
(7, 'Final Match Comming', 'We invite all of you..', '2024-04-15 02:20:05'),
(8, 'Urgent Meeting', 'We have a urgent meeting at 2PM . ', '2024-04-15 02:38:30');

-- --------------------------------------------------------

--
-- Table structure for table `players`
--

CREATE TABLE `players` (
  `player_id` int(11) NOT NULL,
  `team_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `jersey_number` int(11) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `players`
--

INSERT INTO `players` (`player_id`, `team_id`, `user_id`, `position`, `jersey_number`, `date_of_birth`, `created_at`, `updated_at`) VALUES
(18, 6, 32, 'CF', 11, '2000-01-01', '2024-04-14 11:19:40', '2024-04-14 11:19:40'),
(19, 6, 33, 'CB', 22, '1999-01-02', '2024-04-14 12:20:34', '2024-04-14 12:20:34'),
(20, 7, 34, 'CF', 12, '0000-00-00', '2024-04-14 19:10:42', '2024-04-14 19:10:42');

-- --------------------------------------------------------

--
-- Table structure for table `referees`
--

CREATE TABLE `referees` (
  `referee_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `certification_level` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `referees`
--

INSERT INTO `referees` (`referee_id`, `user_id`, `certification_level`, `created_at`, `updated_at`) VALUES
(1, 1, 'IUBATx Certified', '2024-03-27 12:23:20', '2024-03-27 12:23:20'),
(2, 2, 'AIUBx Certified', '2024-03-27 12:41:56', '2024-03-27 12:41:56');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`) VALUES
(1, 'user'),
(2, 'admin'),
(3, 'referee'),
(4, 'player'),
(5, 'coach');

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `team_id` int(11) NOT NULL,
  `team_name` varchar(255) DEFAULT NULL,
  `coach_id` int(11) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`team_id`, `team_name`, `coach_id`, `logo`, `created_at`, `updated_at`) VALUES
(6, 'IUBAT X1', 29, 'http://localhost:5000/uploads/photos/barcelona-1713089393491.png', '2024-04-14 10:09:53', '2024-04-14 10:09:53'),
(7, 'IUBAT X2', 30, 'http://localhost:5000/uploads/photos/real-madrid-1713089729818.jpg', '2024-04-14 10:15:29', '2024-04-14 10:15:29');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `photo` varchar(255) DEFAULT NULL,
  `role_id` int(11) DEFAULT 1,
  `status` varchar(50) DEFAULT 'pending',
  `dob` varchar(50) DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `id_no` varchar(50) DEFAULT NULL,
  `dept` varchar(50) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `conditions` varchar(50) DEFAULT NULL,
  `experience` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `email`, `created_at`, `updated_at`, `photo`, `role_id`, `status`, `dob`, `gender`, `id_no`, `dept`, `address`, `conditions`, `experience`, `phone`) VALUES
(28, 'Admin', 'sha1$526f270e$1$412064f1dc2c97a25ff9729994153371a6acbda8', 'admin@gmail.com', '2024-04-14 09:54:38', '2024-04-14 09:54:38', 'http://localhost:5000/uploads/photos/img1-1713088478979.jpg', 2, 'pending', '2000-02-02', 'male', '2000', 'cse', 'Dhaka', 'excellent', 'CF', '01925991263'),
(29, 'Coach1', 'sha1$906df0c7$1$1360a089e6082ff540b73b38be0afad0d0677f1a', 'coach1@gmail.com', '2024-04-14 10:00:47', '2024-04-14 10:00:47', 'http://localhost:5000/uploads/photos/user-1713088847489.png', 5, 'pending', '2001-02-02', 'male', '2001', 'cse', 'Dhaka', 'excellent', '2 times referee at IUBAT', '01923212345'),
(30, 'Coach2', 'sha1$b2494d61$1$49a0dd7bc94329c7f67a7fa7bc26917f2dd63c40', 'coach2@gmail.com', '2024-04-14 10:13:15', '2024-04-14 10:13:15', 'http://localhost:5000/uploads/photos/user-1713089595941.png', 5, 'pending', '1998-01-01', 'male', '2022', 'cse', 'Dhaka', 'excellent', '2 times coach at IUBAT', '01914323123'),
(31, 'Referee1', 'sha1$f8ef20c9$1$3599ad6029f2f4e825c6b58c21beee1f1c8f5de0', 'referee1@gmail.com', '2024-04-14 10:20:53', '2024-04-14 10:20:53', 'http://localhost:5000/uploads/photos/user-1713090053493.png', 3, 'pending', '2000-02-02', 'male', '2023', 'cse', 'Dhaka', 'excellent', '2 times referee at IUBAT', '01923234345'),
(32, 'Player1', 'sha1$4575820d$1$81c8e7e483d5b7fc2e52cbba5e9237a516f04781', 'player1@gmail.com', '2024-04-14 10:25:40', '2024-04-14 10:25:40', 'http://localhost:5000/uploads/photos/user-1713090340880.png', 4, 'pending', '2000-01-01', 'male', '2024', 'cse', 'Dhaka', 'excellent', 'CF', '01923232343'),
(33, 'Player2', 'sha1$e19c0c74$1$332463abc7ae4926d7fd5e60a8d149b21336843f', 'player2@gmail.com', '2024-04-14 11:15:38', '2024-04-14 11:15:38', 'http://localhost:5000/uploads/photos/user-1713093337552.png', 4, 'pending', '1999-01-02', 'male', '2025', 'cse', 'Dhaka', 'good', 'GK', '01812346545'),
(34, 'Player3', 'sha1$289d5cb1$1$663e0d2d54941e01c9135509009ffd6f84af48d6', 'player3@gmail.com', '2024-04-14 12:18:45', '2024-04-14 12:18:45', 'http://localhost:5000/uploads/photos/user-1713097125601.png', 4, 'pending', '1998-02-02', 'male', '2026', 'cse', 'Dhaka', 'good', 'CMF', '01935943231');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lineups`
--
ALTER TABLE `lineups`
  ADD PRIMARY KEY (`lineup_id`);

--
-- Indexes for table `matches`
--
ALTER TABLE `matches`
  ADD PRIMARY KEY (`match_id`);

--
-- Indexes for table `match_results`
--
ALTER TABLE `match_results`
  ADD PRIMARY KEY (`result_id`);

--
-- Indexes for table `notices`
--
ALTER TABLE `notices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`player_id`);

--
-- Indexes for table `referees`
--
ALTER TABLE `referees`
  ADD PRIMARY KEY (`referee_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`team_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `lineups`
--
ALTER TABLE `lineups`
  MODIFY `lineup_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `matches`
--
ALTER TABLE `matches`
  MODIFY `match_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `match_results`
--
ALTER TABLE `match_results`
  MODIFY `result_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `notices`
--
ALTER TABLE `notices`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `players`
--
ALTER TABLE `players`
  MODIFY `player_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `referees`
--
ALTER TABLE `referees`
  MODIFY `referee_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `team_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
