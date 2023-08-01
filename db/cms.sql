

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` tinyint(4) NOT NULL,
  `title` varchar(15) NOT NULL,
  `description` varchar(150) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `title`, `description`, `date`) VALUES
(10, 'adna', 'asdasdasdas\r\n', '2023-07-12'),
(12, 'adnan is here', 'asdasdasdasd', '2023-07-12'),
(13, 'sadasdasd', 'asdasdasd', '2023-07-12');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` tinyint(4) NOT NULL,
  `postId` int(11) NOT NULL,
  `author` varchar(15) NOT NULL,
  `comment` varchar(30) NOT NULL,
  `days` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `postId`, `author`, `comment`, `days`) VALUES
(1, 6, 'adnan', 'asdasdasda', '2023-07-12'),
(2, 6, 'adnan', 'asdsadasdas', '2023-07-12'),
(3, 10, 'adnan', 'asdasd', '2023-07-12'),
(4, 6, 'adnan', 'XZCzx', '2023-07-12'),
(5, 6, 'adnan', 'sadasdasd', '2023-07-12'),
(6, 6, 'adnan', 'asdasdasdad', '2023-07-12'),
(7, 12, 'adnan', 'asdsada', '2023-07-13'),
(8, 12, 'adnan', 'Helllo g', '2023-07-13'),
(9, 10, 'adnan', 'sdfsdafs', '2023-07-13');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `id` tinyint(4) NOT NULL,
  `username` varchar(15) NOT NULL,
  `password` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`id`, `username`, `password`) VALUES
(1, 'asdasda', 'asdasdasd'),
(3, 'adnanalikunbher', 'asdsaadsas'),
(4, 'adnan', 'adnan'),
(5, 'sabirali', 'sabirali'),
(6, 'adnanali', 'adnanali');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD KEY `id` (`id`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
