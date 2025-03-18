# FE - > run ( npm run dev )
# BE - > run ( npm start ) 

# Data - version 1
# Bảng người dùng (Mentor & Mentee) 
CREATE TABLE Users ( 
   id INT AUTO_INCREMENT PRIMARY KEY, 
   
   full_name VARCHAR(255) NOT NULL, 

   email VARCHAR(255) UNIQUE NOT NULL,

   password_hash VARCHAR(255) NOT NULL, 

   role ENUM('mentor', 'mentee') NOT NULL,

   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP );
# Bảng diễn đàn Q&A 
CREATE TABLE Questions ( 
   id INT AUTO_INCREMENT PRIMARY KEY,
   
   user_id INT NOT NULL,

   title VARCHAR(255) NOT NULL,

   body TEXT NOT NULL, 

   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

   FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE 
   );
# bảng Answers 
CREATE TABLE Answers ( 
   id INT AUTO_INCREMENT PRIMARY KEY, 

   question_id INT NOT NULL,

   user_id INT NOT NULL, 

   body TEXT NOT NULL, 

   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

   FOREIGN KEY (question_id) REFERENCES Questions(id) ON DELETE  CASCADE,

   FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE 
   );
# AnswerVotes
CREATE TABLE AnswerVotes (
   id INT AUTO_INCREMENT PRIMARY KEY,

   answer_id INT NOT NULL, 

   user_id INT NOT NULL,

   vote_type ENUM('upvote', 'downvote') NOT NULL,

   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 

   FOREIGN KEY (answer_id) REFERENCES Answers(id) ON DELETE CASCADE, 

   FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE 
   );
# QuestionTags
CREATE TABLE QuestionTags ( 
   id INT AUTO_INCREMENT PRIMARY KEY,

   question_id INT NOT NULL, 

   tag VARCHAR(50) NOT NULL,
   
   FOREIGN KEY (question_id) REFERENCES Questions(id) ON DELETE CASCADE 
   );
