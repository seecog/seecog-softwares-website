-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: seecogsoftwares_website
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

use  seecogsoftwares_website;
--
-- Table structure for table `admin_users`
--

DROP TABLE IF EXISTS `admin_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(120) DEFAULT NULL,
  `email` varchar(190) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_users`
--

LOCK TABLES `admin_users` WRITE;
/*!40000 ALTER TABLE `admin_users` DISABLE KEYS */;
INSERT INTO `admin_users` VALUES (1,'Admin','admin@seecogsoftwares.com','$2b$10$dfDz71Xpj6neE6nApEGEY.5THg8m0UqyRvN.gpAwYUfvZ8QwjRXae',1,'2026-02-12 17:39:19','2026-02-12 17:39:19');
/*!40000 ALTER TABLE `admin_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_applications`
--

DROP TABLE IF EXISTS `job_applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_applications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `job_id` int NOT NULL,
  `full_name` varchar(160) NOT NULL,
  `email` varchar(190) NOT NULL,
  `linkedin_url` varchar(255) NOT NULL,
  `portfolio_url` varchar(255) DEFAULT NULL,
  `resume_path` varchar(255) NOT NULL,
  `resume_original_name` varchar(255) DEFAULT NULL,
  `resume_mime` varchar(100) DEFAULT NULL,
  `resume_size` int DEFAULT NULL,
  `status` enum('RECEIVED','REVIEWING','SHORTLISTED','REJECTED','HIRED') NOT NULL DEFAULT 'RECEIVED',
  `applied_at` datetime NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `job_id` (`job_id`),
  CONSTRAINT `job_applications_ibfk_1` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_applications`
--

LOCK TABLES `job_applications` WRITE;
/*!40000 ALTER TABLE `job_applications` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `slug` varchar(220) NOT NULL,
  `department` varchar(120) DEFAULT NULL,
  `location` varchar(120) DEFAULT NULL,
  `job_type` enum('FULL_TIME','PART_TIME','CONTRACT','INTERN') NOT NULL DEFAULT 'FULL_TIME',
  `description` longtext,
  `status` enum('DRAFT','PUBLISHED','CLOSED') NOT NULL DEFAULT 'DRAFT',
  `posted_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `jobs_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `run_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'001_create_admin_users.sql','2026-02-12 17:39:08'),(2,'002_create_site_profile.sql','2026-02-12 17:39:08'),(3,'003_create_social_links.sql','2026-02-12 17:39:08'),(4,'004_create_jobs.sql','2026-02-12 17:39:08'),(5,'005_create_job_applications.sql','2026-02-12 17:39:08');
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resume_templates`
--

DROP TABLE IF EXISTS `resume_templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resume_templates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `summary` text,
  `content` text NOT NULL,
  `technologies` json NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resume_templates`
--

LOCK TABLES `resume_templates` WRITE;
/*!40000 ALTER TABLE `resume_templates` DISABLE KEYS */;
INSERT INTO `resume_templates` VALUES (1,'Node.js Backend Standard','Experienced Backend Developer proficient in Node.js and Nest.js. Proven track record in building scalable APIs.','\n          <h3>PROFESSIONAL SUMMARY</h3>\n          <p>--------------------------------------------------</p>\n          <p>Backend Developer with <strong>{{experience}}</strong> years of experience in designing and implementing scalable APIs using Node.js and Express. Proven expertise in database management and microservices architecture.</p>\n          \n          <h3>TECHNICAL SKILLS</h3>\n          <p>--------------------------------------------------</p>\n          <ul>\n            <li><strong>Languages:</strong> JavaScript, TypeScript, SQL</li>\n            <li><strong>Frameworks:</strong> Node.js, Express, Nest.js</li>\n            <li><strong>Databases:</strong> PostgreSQL, MongoDB, Redis</li>\n            <li><strong>Tools:</strong> Docker, Kubernetes, AWS, Git</li>\n          </ul>\n\n          <h3>EXPERIENCE</h3>\n          <p>--------------------------------------------------</p>\n          <p><strong>Senior Backend Engineer | TechCorp Inc.</strong></p>\n          <p>2020 - Present</p>\n          <ul>\n            <li>Architected and maintained microservices using Node.js and gRPC.</li>\n            <li>Optimized database queries, reducing response time by 40%.</li>\n            <li>Mentored junior developers and conducted code reviews.</li>\n          </ul>\n        ','[\"Node.js\", \"NestJS\", \"Express\"]','2026-02-13 07:12:50','2026-02-13 07:12:50'),(2,'Node.js Microservices Base','Specialized in Microservices architecture using Node.js and Docker containerization.','\n          <h3>PROFESSIONAL SUMMARY</h3>\n          <p>Node.js Expert focusing on Microservices and high-availability systems.</p>\n          <p>{{summary}}</p>\n        ','[\"Node.js\", \"Docker\", \"Kubernetes\"]','2026-02-13 07:12:50','2026-02-13 07:12:50'),(3,'Node.js Serverless Function','Serverless enthusiast with deep knowledge of AWS Lambda and Node.js runtime environments.','\n          <h3>AWS LAMBDA SPECIALIST</h3>\n          <p>Cloud-native developer with expertise in serverless architectures.</p>\n        ','[\"Node.js\", \"AWS Lambda\"]','2026-02-13 07:12:50','2026-02-13 07:12:50'),(4,'Node.js API Boilerplate','To leverage expertise in Express.js and Node.js to deliver high-performance RESTful APIs.','\n          <h3>RESTFUL API DEVELOPER</h3>\n          <p>Expert in building secure and performant REST APIs.</p>\n        ','[\"Node.js\", \"Express\"]','2026-02-13 07:12:50','2026-02-13 07:12:50'),(5,'Next.js','','<p>Seecog Softwares Private Limited.</p>\r\n\r\n<p>Address : <a href=\"https://www.google.com/maps/place/seecog+softwares/@12.950505,77.6074284,15z/data=!4m5!3m4!1s0x0:0xf12507f444878834!8m2!3d12.950505!4d77.6074284\"><u>Site No. 26, Prestige Cube Building, Laskar, Hosur Rd, Adugodi, Koramangala, Bengaluru, Karnataka 560030</u></a><u>&nbsp;</u></p>\r\n\r\n<p>Phone No :&nbsp; +91 7348820668 / +91&nbsp; 7625067691</p>\r\n\r\n<p>Email :&nbsp; <a href=\"mailto:resume@seecogsoftwares.com\"><u>resume@seecogsoftwares.com</u></a>&nbsp;</p>\r\n\r\n<p>LinkedIn : <a href=\"https://www.linkedin.com/company/76618183/admin/dashboard\"><u>https://www.linkedin.com/company/76618183</u></a></p>\r\n\r\n<p>Website : <a href=\"https://seecogsoftwares.com\"><u>https://seecogsoftwares.com</u></a>&nbsp;</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><strong>MUKESH KUMARH</strong></p>\r\n\r\n<p>Java Backend Developer &mdash; Spring Boot | REST APIs | MySQL</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><strong>EXECUTIVE SUMMARY</strong></p>\r\n\r\n<p>Java Backend Developer with 3+ years of experience building production-ready Spring Boot services at Seecog Softwares Pvt. Ltd. Strong in REST API design, Spring Data JPA/Hibernate, and MySQL schema modeling. Comfortable in Agile teams, code reviews, debugging, and delivering reliable features end-to-end.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><strong>EDUCATION</strong></p>\r\n\r\n<table cellspacing=\"0\" style=\"border-collapse:collapse; width:602px\">\r\n	<tbody>\r\n		<tr>\r\n			<td style=\"border-bottom:1px solid #000000; border-left:1px solid #000000; border-right:1px solid #000000; border-top:1px solid #000000; vertical-align:top\">\r\n			<p>Qualification</p>\r\n			</td>\r\n			<td style=\"border-bottom:1px solid #000000; border-left:1px solid #000000; border-right:1px solid #000000; border-top:1px solid #000000; vertical-align:top\">\r\n			<p>Institution</p>\r\n			</td>\r\n			<td style=\"border-bottom:1px solid #000000; border-left:1px solid #000000; border-right:1px solid #000000; border-top:1px solid #000000; vertical-align:top\">\r\n			<p>Year</p>\r\n			</td>\r\n		</tr>\r\n		<tr>\r\n			<td style=\"border-bottom:1px solid #000000; border-left:1px solid #000000; border-right:1px solid #000000; border-top:1px solid #000000; vertical-align:top\">\r\n			<p>Bachelor of Computer Applications (BCA)</p>\r\n			</td>\r\n			<td style=\"border-bottom:1px solid #000000; border-left:1px solid #000000; border-right:1px solid #000000; border-top:1px solid #000000; vertical-align:top\">\r\n			<p>Berhampur University&nbsp;</p>\r\n			</td>\r\n			<td style=\"border-bottom:1px solid #000000; border-left:1px solid #000000; border-right:1px solid #000000; border-top:1px solid #000000; vertical-align:top\">\r\n			<p>2019 - 2022</p>\r\n			</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n\r\n<p><br />\r\n&nbsp;</p>\r\n\r\n<p><strong>EXPERIENCE&nbsp;</strong></p>\r\n\r\n<table cellspacing=\"0\" style=\"border-collapse:collapse; width:602px\">\r\n	<tbody>\r\n		<tr>\r\n			<td style=\"border-bottom:1px solid #000000; border-left:1px solid #000000; border-right:1px solid #000000; border-top:1px solid #000000; vertical-align:top\">\r\n			<p>Company</p>\r\n			</td>\r\n			<td style=\"border-bottom:1px solid #000000; border-left:1px solid #000000; border-right:1px solid #000000; border-top:1px solid #000000; vertical-align:top\">\r\n			<p>Designation</p>\r\n			</td>\r\n			<td style=\"border-bottom:1px solid #000000; border-left:1px solid #000000; border-right:1px solid #000000; border-top:1px solid #000000; vertical-align:top\">\r\n			<p>Experience</p>\r\n			</td>\r\n		</tr>\r\n		<tr>\r\n			<td style=\"border-bottom:1px solid #000000; border-left:1px solid #000000; border-right:1px solid #000000; border-top:1px solid #000000; vertical-align:top\">\r\n			<p>Seecog Softwares Pvt. Ltd.</p>\r\n			</td>\r\n			<td style=\"border-bottom:1px solid #000000; border-left:1px solid #000000; border-right:1px solid #000000; border-top:1px solid #000000; vertical-align:top\">\r\n			<p>Java Backend Developer&nbsp;</p>\r\n			</td>\r\n			<td style=\"border-bottom:1px solid #000000; border-left:1px solid #000000; border-right:1px solid #000000; border-top:1px solid #000000; vertical-align:top\">\r\n			<p>2022 &ndash; Present</p>\r\n			</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n\r\n<p><br />\r\n&nbsp;</p>\r\n\r\n<p><strong>PROJECTS Summary</strong></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<h1><strong>1.Project Name : payvault-core &mdash; FinTech Wallet &amp; Payment Processing System</strong></h1>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<hr />\r\n<h2><strong>Project Description :</strong></h2>\r\n\r\n<p>Designed and built a secure FinTech Wallet &amp; Payment Processing System to manage digital wallet balances, peer-to-peer transfers, merchant payments, and transaction settlements. Developed robust backend services to handle high-volume financial transactions with strict validation, ACID compliance, and audit-ready ledger management.</p>\r\n\r\n<p>Implemented double-entry bookkeeping logic to ensure financial consistency and prevent balance mismatches. Designed idempotent transaction processing to avoid duplicate payments and incorporated fraud detection rules for suspicious activity monitoring. Improved platform reliability through structured service-layer architecture, transactional integrity, optimized indexing for high-frequency queries, and secure role-based access control.</p>\r\n\r\n<p>Built the system to support horizontal scalability and integration with external banking gateways, KYC services, and payment processors.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<hr />\r\n<h2><strong>Project Modules :</strong></h2>\r\n\r\n<h3><strong>Frontend (Admin / Operations Panel) :</strong></h3>\r\n\r\n<ul>\r\n	<li>User &amp; Wallet Monitoring<br />\r\n	&nbsp;</li>\r\n	<li>Transaction Logs &amp; Audit Trails<br />\r\n	&nbsp;</li>\r\n	<li>Fraud Alerts &amp; Risk Monitoring<br />\r\n	&nbsp;</li>\r\n	<li>Settlement &amp; Reconciliation Dashboard<br />\r\n	&nbsp;</li>\r\n	<li>Reports &amp; Revenue Analytics<br />\r\n	&nbsp;</li>\r\n</ul>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<hr />\r\n<h3><strong>Frontend (User Portal / API Consumer) :</strong></h3>\r\n\r\n<ul>\r\n	<li>Wallet Balance View<br />\r\n	&nbsp;</li>\r\n	<li>Add Money / Withdraw<br />\r\n	&nbsp;</li>\r\n	<li>Peer-to-Peer Transfers<br />\r\n	&nbsp;</li>\r\n	<li>Merchant Payments<br />\r\n	&nbsp;</li>\r\n	<li>Transaction History<br />\r\n	&nbsp;</li>\r\n	<li>Payment Notifications<br />\r\n	&nbsp;</li>\r\n</ul>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<hr />\r\n<h2><strong>Backend (Services / APIs) :</strong></h2>\r\n\r\n<p><strong>Auth &amp; RBAC Service</strong></p>\r\n\r\n<ul>\r\n	<li>JWT-based Authentication<br />\r\n	&nbsp;</li>\r\n	<li>Role-Based Access Control (Admin / User / Merchant)<br />\r\n	&nbsp;</li>\r\n	<li>Session &amp; Access Validation<br />\r\n	&nbsp;</li>\r\n</ul>\r\n\r\n<p><strong>Wallet Service</strong></p>\r\n\r\n<ul>\r\n	<li>Wallet Creation &amp; Management<br />\r\n	&nbsp;</li>\r\n	<li>Balance Inquiry<br />\r\n	&nbsp;</li>\r\n	<li>Ledger Entry Handling<br />\r\n	&nbsp;</li>\r\n</ul>\r\n\r\n<p><strong>Transaction Service</strong></p>\r\n\r\n<ul>\r\n	<li>P2P Transfers<br />\r\n	&nbsp;</li>\r\n	<li>Merchant Payment Processing<br />\r\n	&nbsp;</li>\r\n	<li>Idempotent Transaction Handling<br />\r\n	&nbsp;</li>\r\n	<li>Status Tracking (Pending / Success / Failed)<br />\r\n	&nbsp;</li>\r\n</ul>\r\n\r\n<p><strong>Ledger &amp; Accounting Service</strong></p>\r\n\r\n<ul>\r\n	<li>Double-Entry Bookkeeping<br />\r\n	&nbsp;</li>\r\n	<li>Debit/Credit Validation<br />\r\n	&nbsp;</li>\r\n	<li>Balance Reconciliation<br />\r\n	&nbsp;</li>\r\n</ul>\r\n\r\n<p><strong>Fraud &amp; Risk Service</strong></p>\r\n\r\n<ul>\r\n	<li>Rule-Based Risk Detection<br />\r\n	&nbsp;</li>\r\n	<li>Suspicious Activity Flags<br />\r\n	&nbsp;</li>\r\n	<li>Transaction Limits &amp; Velocity Checks<br />\r\n	&nbsp;</li>\r\n</ul>\r\n\r\n<p><strong>Settlement Service</strong></p>\r\n\r\n<ul>\r\n	<li>Merchant Settlement Processing<br />\r\n	&nbsp;</li>\r\n	<li>Batch Settlement Jobs<br />\r\n	&nbsp;</li>\r\n	<li>Reconciliation Reports<br />\r\n	&nbsp;</li>\r\n</ul>\r\n\r\n<p><strong>Notification Service</strong></p>\r\n\r\n<ul>\r\n	<li>Transaction Alerts<br />\r\n	&nbsp;</li>\r\n	<li>Payment Confirmation<br />\r\n	&nbsp;</li>\r\n	<li>Failure &amp; Refund Notifications<br />\r\n	&nbsp;</li>\r\n</ul>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<hr />\r\n<h2><strong>Database Layer :</strong></h2>\r\n\r\n<ul>\r\n	<li>Master tables (Users, Wallets, Merchants)<br />\r\n	&nbsp;</li>\r\n	<li>Transactional tables (Transactions, Ledger Entries, Settlements)<br />\r\n	&nbsp;</li>\r\n	<li>Audit logs for compliance &amp; traceability<br />\r\n	&nbsp;</li>\r\n	<li>Indexed high-frequency balance lookups<br />\r\n	&nbsp;</li>\r\n	<li>Time-series transaction history<br />\r\n	&nbsp;</li>\r\n</ul>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<hr />\r\n<h2><strong>Technology Used :</strong></h2>\r\n\r\n<h3><strong>Frontend :</strong></h3>\r\n\r\n<p>HTML5, CSS3, Bootstrap 5, JavaScript (ES6), REST API Integration</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<hr />\r\n<h3><strong>Backend :</strong></h3>\r\n\r\n<p>Java 17<br />\r\nSpring Boot 3<br />\r\nSpring MVC (REST APIs)<br />\r\nSpring Security (JWT + RBAC)<br />\r\nSpring Data JPA<br />\r\nHibernate<br />\r\nBean Validation<br />\r\nKafka (Event-driven transaction processing)<br />\r\nRedis (Caching &amp; rate limiting)<br />\r\nQuartz Scheduler (Settlement Jobs)<br />\r\nSwagger / OpenAPI</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<hr />\r\n<h3><strong>Database :</strong></h3>\r\n\r\n<p>MySQL 8 / PostgreSQL<br />\r\nSchema normalization<br />\r\nIndexed joins<br />\r\nACID transactions<br />\r\nOptimized ledger queries</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<hr />\r\n<h3><strong>Tools / Dev Practices :</strong></h3>\r\n\r\n<p>Git / GitHub<br />\r\nPostman<br />\r\nMaven / Gradle<br />\r\nSLF4J / Logback<br />\r\nJUnit 5<br />\r\nDocker (Containerization)<br />\r\nCI/CD exposure (Optional)</p>\r\n\r\n<p><br />\r\n<br />\r\n&nbsp;</p>\r\n\r\n<h1><strong>2.Project Name : logitrack-live &mdash; Real-Time Logistics &amp; Delivery Tracking Platform</strong></h1>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<hr />\r\n<h2><strong>Project Description :</strong></h2>\r\n\r\n<p>Designed and developed a scalable Real-Time Logistics &amp; Delivery Tracking Platform to manage shipment lifecycles, live vehicle tracking, route optimization, and delivery status synchronization. Built secure backend services capable of handling high-frequency GPS updates, order state transitions, and real-time customer notifications with reliable validations and consistent REST/WebSocket responses.</p>\r\n\r\n<p>Implemented event-driven architecture to process continuous location streams while ensuring low-latency updates and system resilience. Improved overall platform stability through distributed caching, optimized geospatial queries, asynchronous message handling, and structured service-layer design. Engineered the system to support horizontal scaling and near real-time visibility for operations teams and customers.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<hr />\r\n<h2><strong>Project Modules :</strong></h2>\r\n\r\n<h3><strong>Frontend (Operations Admin Panel) :</strong></h3>\r\n\r\n<ul>\r\n	<li>Shipment &amp; Order Management<br />\r\n	&nbsp;</li>\r\n	<li>Driver Assignment Dashboard<br />\r\n	&nbsp;</li>\r\n	<li>Live Map Tracking View<br />\r\n	&nbsp;</li>\r\n	<li>Delivery Status Monitoring<br />\r\n	&nbsp;</li>\r\n	<li>Performance &amp; SLA Reports<br />\r\n	&nbsp;</li>\r\n	<li>Delay &amp; Exception Alerts<br />\r\n	&nbsp;</li>\r\n</ul>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<hr />\r\n<h3><strong>Frontend (Driver App &ndash; API Layer) :</strong></h3>\r\n\r\n<ul>\r\n	<li>Driver Authentication<br />\r\n	&nbsp;</li>\r\n	<li>Real-Time GPS Location Updates<br />\r\n	&nbsp;</li>\r\n	<li>Delivery Status Updates (Picked / In-Transit / Delivered)<br />\r\n	&nbsp;</li>\r\n	<li>Route &amp; ETA Information<br />\r\n	&nbsp;</li>\r\n</ul>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<hr />\r\n<h3><strong>Frontend (Customer Portal) :</strong></h3>\r\n\r\n<ul>\r\n	<li>Live Order Tracking<br />\r\n	&nbsp;</li>\r\n	<li>Estimated Time of Arrival (ETA)<br />\r\n	&nbsp;</li>\r\n	<li>Delivery Notifications<br />\r\n	&nbsp;</li>\r\n	<li>Order History &amp; Status Updates<br />\r\n	&nbsp;</li>\r\n</ul>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<hr />\r\n<h2><strong>Backend (Services / APIs) :</strong></h2>\r\n\r\n<p><strong>Auth &amp; RBAC Service</strong></p>\r\n\r\n<ul>\r\n	<li>JWT-based Authentication<br />\r\n	&nbsp;</li>\r\n	<li>Role-Based Access Control (Admin / Driver / Customer)<br />\r\n	&nbsp;</li>\r\n</ul>\r\n\r\n<p><strong>Shipment Management Service</strong></p>\r\n\r\n<ul>\r\n	<li>Shipment Creation &amp; Assignment<br />\r\n	&nbsp;</li>\r\n	<li>Delivery Lifecycle Management<br />\r\n	&nbsp;</li>\r\n	<li>Status Transition Validation<br />\r\n	&nbsp;</li>\r\n</ul>\r\n\r\n<p><strong>Tracking Service</strong></p>\r\n\r\n<ul>\r\n	<li>High-Frequency GPS Update APIs<br />\r\n	&nbsp;</li>\r\n	<li>WebSocket-based Location Broadcasting<br />\r\n	&nbsp;</li>\r\n	<li>Geospatial Data Processing<br />\r\n	&nbsp;</li>\r\n	<li>Historical Location Tracking<br />\r\n	&nbsp;</li>\r\n</ul>\r\n\r\n<p><strong>Routing &amp; ETA Service</strong></p>\r\n\r\n<ul>\r\n	<li>Route Calculation Integration<br />\r\n	&nbsp;</li>\r\n	<li>ETA Prediction Logic<br />\r\n	&nbsp;</li>\r\n	<li>Distance &amp; Time Computation<br />\r\n	&nbsp;</li>\r\n</ul>\r\n\r\n<p><strong>Notification Service</strong></p>\r\n\r\n<ul>\r\n	<li>Real-Time Status Alerts<br />\r\n	&nbsp;</li>\r\n	<li>Delay Notifications<br />\r\n	&nbsp;</li>\r\n	<li>SLA Breach Alerts<br />\r\n	&nbsp;</li>\r\n</ul>\r\n\r\n<p><strong>Event Processing Layer</strong></p>\r\n\r\n<ul>\r\n	<li>Kafka-based Location Event Streaming<br />\r\n	&nbsp;</li>\r\n	<li>Asynchronous Tracking Event Processing<br />\r\n	&nbsp;</li>\r\n	<li>Fault-Tolerant Message Handling<br />\r\n	&nbsp;</li>\r\n</ul>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<hr />\r\n<h2><strong>Database Layer :</strong></h2>\r\n\r\n<ul>\r\n	<li>Master tables (Drivers, Vehicles, Shipments, Customers)<br />\r\n	&nbsp;</li>\r\n	<li>Transactional tables (Tracking Events, Delivery Logs, Status Changes)<br />\r\n	&nbsp;</li>\r\n	<li>Geospatial indexed location tables<br />\r\n	&nbsp;</li>\r\n	<li>Time-series tracking data<br />\r\n	&nbsp;</li>\r\n	<li>Audit-ready shipment lifecycle records<br />\r\n	&nbsp;</li>\r\n</ul>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<hr />\r\n<h2><strong>Technology Used :</strong></h2>\r\n\r\n<h3><strong>Frontend :</strong></h3>\r\n\r\n<p>HTML5, CSS3, Bootstrap 5, JavaScript (ES6), WebSocket Integration</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<hr />\r\n<h3><strong>Backend :</strong></h3>\r\n\r\n<p>Java 17<br />\r\nSpring Boot 3<br />\r\nSpring MVC (REST APIs)<br />\r\nSpring WebSocket<br />\r\nSpring Security (JWT + RBAC)<br />\r\nSpring Data JPA<br />\r\nHibernate<br />\r\nBean Validation<br />\r\nKafka (Event Streaming)<br />\r\nRedis (Live Location Caching)<br />\r\nSwagger / OpenAPI</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<hr />\r\n<h3><strong>Database :</strong></h3>\r\n\r\n<p>MySQL 8 / PostgreSQL<br />\r\nSchema normalization<br />\r\nGeospatial indexing<br />\r\nOptimized time-series queries<br />\r\nACID transactions</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<hr />\r\n<h3><strong>Tools / Dev Practices :</strong></h3>\r\n\r\n<p>Git / GitHub<br />\r\nPostman<br />\r\nMaven / Gradle<br />\r\nSLF4J / Logback<br />\r\nJUnit 5<br />\r\nDocker (Containerization)<br />\r\nCI/CD exposure (Optional)</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<h1><strong>3.Project Name : collabspace-core &mdash; Enterprise Chat &amp; Collaboration Platform</strong></h1>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<hr />\r\n<h2><strong>Project Description :</strong></h2>\r\n\r\n<p>Designed and developed a scalable, real-time Enterprise Chat &amp; Collaboration platform enabling secure team communication, channel-based messaging, file sharing, and presence tracking across organizations. Built high-performance backend services capable of handling concurrent users, low-latency message delivery, and reliable message persistence with consistent REST and WebSocket responses.</p>\r\n\r\n<p>Implemented distributed messaging architecture using event streaming to ensure message durability and horizontal scalability. Designed message delivery guarantees (at-least-once delivery), read receipts, typing indicators, and presence monitoring with optimized caching strategies. Improved overall system resilience through structured layered architecture, global exception handling, distributed session management, and indexed message retrieval for large conversation histories.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<hr />\r\n<h2><strong>Project Modules :</strong></h2>\r\n\r\n<h3><strong>Frontend (Web / Desktop Client) :</strong></h3>\r\n\r\n<ul>\r\n	<li>User Authentication &amp; Workspace Selection<br />\r\n	&nbsp;</li>\r\n	<li>Channel-Based Messaging<br />\r\n	&nbsp;</li>\r\n	<li>Direct Messages (1:1)<br />\r\n	&nbsp;</li>\r\n	<li>Threaded Conversations<br />\r\n	&nbsp;</li>\r\n	<li>File &amp; Media Sharing<br />\r\n	&nbsp;</li>\r\n	<li>Typing Indicators &amp; Presence Status<br />\r\n	&nbsp;</li>\r\n	<li>Message Search &amp; History<br />\r\n	&nbsp;</li>\r\n</ul>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<hr />\r\n<h3><strong>Frontend (Admin / Workspace Panel) :</strong></h3>\r\n\r\n<ul>\r\n	<li>Workspace Creation &amp; Configuration<br />\r\n	&nbsp;</li>\r\n	<li>User &amp; Role Management<br />\r\n	&nbsp;</li>\r\n	<li>Channel Management<br />\r\n	&nbsp;</li>\r\n	<li>Access Control Policies<br />\r\n	&nbsp;</li>\r\n	<li>Usage &amp; Activity Reports<br />\r\n	&nbsp;</li>\r\n</ul>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<hr />\r\n<h2><strong>Backend (Services / APIs) :</strong></h2>\r\n\r\n<p><strong>Auth &amp; RBAC Service</strong></p>\r\n\r\n<ul>\r\n	<li>JWT-based Authentication<br />\r\n	&nbsp;</li>\r\n	<li>Workspace-Level Role-Based Access Control<br />\r\n	&nbsp;</li>\r\n	<li>Session &amp; Token Validation<br />\r\n	&nbsp;</li>\r\n</ul>\r\n\r\n<p><strong>Workspace Service</strong></p>\r\n\r\n<ul>\r\n	<li>Workspace Provisioning<br />\r\n	&nbsp;</li>\r\n	<li>Member Management<br />\r\n	&nbsp;</li>\r\n	<li>Channel &amp; Group Management<br />\r\n	&nbsp;</li>\r\n</ul>\r\n\r\n<p><strong>Messaging Service</strong></p>\r\n\r\n<ul>\r\n	<li>Real-Time Messaging via WebSocket<br />\r\n	&nbsp;</li>\r\n	<li>Message Persistence<br />\r\n	&nbsp;</li>\r\n	<li>Thread Management<br />\r\n	&nbsp;</li>\r\n	<li>Read/Delivered Status Tracking<br />\r\n	&nbsp;</li>\r\n</ul>\r\n\r\n<p><strong>Presence Service</strong></p>\r\n\r\n<ul>\r\n	<li>Online/Offline Tracking<br />\r\n	&nbsp;</li>\r\n	<li>Heartbeat Monitoring<br />\r\n	&nbsp;</li>\r\n	<li>Session State Management<br />\r\n	&nbsp;</li>\r\n</ul>\r\n\r\n<p><strong>Search Service</strong></p>\r\n\r\n<ul>\r\n	<li>Full-Text Message Indexing<br />\r\n	&nbsp;</li>\r\n	<li>Channel &amp; User Search<br />\r\n	&nbsp;</li>\r\n	<li>Conversation History Retrieval<br />\r\n	&nbsp;</li>\r\n</ul>\r\n\r\n<p><strong>Notification Service</strong></p>\r\n\r\n<ul>\r\n	<li>Push Notifications<br />\r\n	&nbsp;</li>\r\n	<li>Mention Alerts<br />\r\n	&nbsp;</li>\r\n	<li>Unread Message Count<br />\r\n	&nbsp;</li>\r\n</ul>\r\n\r\n<p><strong>Event Processing Layer</strong></p>\r\n\r\n<ul>\r\n	<li>Kafka-based Message Streaming<br />\r\n	&nbsp;</li>\r\n	<li>Asynchronous Event Handling<br />\r\n	&nbsp;</li>\r\n	<li>Message Delivery Guarantees<br />\r\n	&nbsp;</li>\r\n</ul>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<hr />\r\n<h2><strong>Database Layer :</strong></h2>\r\n\r\n<ul>\r\n	<li>Master tables (Users, Workspaces, Channels, Roles)<br />\r\n	&nbsp;</li>\r\n	<li>Transactional tables (Messages, Threads, Memberships)<br />\r\n	&nbsp;</li>\r\n	<li>Indexed message retrieval tables<br />\r\n	&nbsp;</li>\r\n	<li>Full-text search indexing<br />\r\n	&nbsp;</li>\r\n	<li>Audit-ready communication logs<br />\r\n	&nbsp;</li>\r\n</ul>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<hr />\r\n<h2><strong>Technology Used :</strong></h2>\r\n\r\n<h3><strong>Frontend :</strong></h3>\r\n\r\n<p>HTML5, CSS3, Bootstrap 5, JavaScript (ES6), WebSocket Client Integration</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<hr />\r\n<h3><strong>Backend :</strong></h3>\r\n\r\n<p>Java 17<br />\r\nSpring Boot 3<br />\r\nSpring MVC (REST APIs)<br />\r\nSpring WebSocket<br />\r\nSpring Security (JWT + RBAC)<br />\r\nSpring Data JPA<br />\r\nHibernate<br />\r\nBean Validation<br />\r\nKafka (Event Streaming)<br />\r\nRedis (Session &amp; Presence Caching)<br />\r\nElasticsearch (Message Search &ndash; Optional)<br />\r\nSwagger / OpenAPI</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<hr />\r\n<h3><strong>Database :</strong></h3>\r\n\r\n<p>MySQL 8 / PostgreSQL<br />\r\nSchema normalization<br />\r\nIndexed message queries<br />\r\nOptimized pagination<br />\r\nTransactional integrity</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<hr />\r\n<h3><strong>Tools / Dev Practices :</strong></h3>\r\n\r\n<p>Git / GitHub<br />\r\nPostman<br />\r\nMaven / Gradle<br />\r\nSLF4J / Logback<br />\r\nJUnit 5<br />\r\nDocker (Containerization)<br />\r\nCI/CD exposure (Optional)</p>\r\n\r\n<p><br />\r\n&nbsp;</p>\r\n\r\n<p><strong>CORE SKILLS</strong></p>\r\n\r\n<p>Java, Spring Boot, Spring MVC, Spring Security, Hibernate/JPA, JDBC | REST APIs</p>\r\n\r\n<p>MySQL, PostgreSQL | Maven | Swagger/OpenAPI | Postman | Git/GitHub | JUnit/Mockito</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><strong>CERTIFICATIONS</strong></p>\r\n\r\n<p>Spring Boot &amp; REST API Development (coursework)</p>\r\n\r\n<p>MySQL &amp; Database Design (coursework)</p>\r\n\r\n<p>Git/GitHub &amp; Agile Practices (coursework)</p>\r\n\r\n<p><br />\r\n<br />\r\n<br />\r\n<br />\r\n&nbsp;</p>\r\n','[\"Next.js\"]','2026-02-14 06:23:02','2026-02-14 08:50:47');
/*!40000 ALTER TABLE `resume_templates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `site_profile`
--

DROP TABLE IF EXISTS `site_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `site_profile` (
  `id` int NOT NULL AUTO_INCREMENT,
  `address` text,
  `email` varchar(190) DEFAULT NULL,
  `phone` varchar(40) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `site_profile`
--

LOCK TABLES `site_profile` WRITE;
/*!40000 ALTER TABLE `site_profile` DISABLE KEYS */;
INSERT INTO `site_profile` VALUES (1,'Site No. 26, Prestige Cube Building, Laskar Hosur Rd, Adugodi, Koramangala, Bengaluru, Karnataka 560030','info@seecogsoftwares.com','+91 7625067691','2026-02-12 17:39:19','2026-02-12 17:39:19');
/*!40000 ALTER TABLE `site_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `social_links`
--

DROP TABLE IF EXISTS `social_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `social_links` (
  `id` int NOT NULL AUTO_INCREMENT,
  `facebook_url` varchar(255) DEFAULT NULL,
  `linkedin_url` varchar(255) DEFAULT NULL,
  `whatsapp_url` varchar(255) DEFAULT NULL,
  `twitter_url` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `social_links`
--

LOCK TABLES `social_links` WRITE;
/*!40000 ALTER TABLE `social_links` DISABLE KEYS */;
INSERT INTO `social_links` VALUES (1,'https://www.facebook.com/profile.php?id=61585373592616','https://www.linkedin.com/company/seecog-softwares-pvt-ltd/','https://wa.me/917625067691','https://twitter.com/seecogsoftwares','2026-02-12 17:39:19','2026-02-12 17:39:19');
/*!40000 ALTER TABLE `social_links` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-15 11:32:15
