# CS473 DP : Team Random

## Description for DP4 evaluation
> Main javascript file (main.js) is saved in app/src/ directory.

> Feature implemenation is saved in app/src/components and app/src/components/core directory. Implementation on chips are saved in app/src/components/chips directory.

> if you want to reproduce our server, please follow the instructions saved in readme.md of /app directory.

> Contents below are here for our convinience, not for the grading of DP4. However, if you are intertesed, you can look at it.


## Run / install
- install  
npm install
- run  
npm run serve

## Database Structure

### users
- userID (int)
- reputationPts (int)
- currentSemester (int)
- major (int): -1 for undecided, 0 for CS, 1 for EE, 2 for MAS, 3 for others
- doubleMajor (int): -1 for None, 0 for CS, 1 for EE, 2 for MAS, 3 for others
- minor (int): -1 for None, 0 for CS, 1 for EE, 2 for MAS, 3 for others
- coursesTaken (array)
   - (string) courseID, year, semester [e.g., "101,2019,S"]
- interestedArea (array)
   - (string) area, area, area, ...

### questions
- questionID (int)
- userID (int) 
- description (str)
- courses (array)
   - (string) courseID, year, semester, isSelected, upvote, downvote
- comments (array)
   - (string) userID,  comment

### votes
 - questionID (int)
 - upvoteHistory (array)
    - (string) courseID, year, semester, userID, userID, ...
 - downvoteHistory (array)
    - (string) courseID, year, semester, userID, userID, ...
    
    
Login 

* UserLoginID (유저 로그인 아이디, ex. tkdgh97531@gmail.com)
  * UserID (string, ex. WQN124F9D2NW21)
  * User_passward (로그인 방식에 따라서 없을수도)



Questions

* Question1
  * UserID (유저 고유 ID)
  * Description ( String)
  * Attachment (URL, string)
  * Semesters
    * 2019 Fall
      * Course1 (과목 코드, string)
        * Selected (Boolean, default = False)
        * Vote
          * Up (Int, default = 0)
          * Hum
          * Down
    * 2020 Spring
    * 2020 Fall ...
  * Courses (유저가 추천을 바라는? 과목들)
    * Course1 (과목 코드, string)
    * Course2 (과목 코드, string)
    * ...
* Question2 ...



Courses

* Course1 (과목 코드, string)
  - Ko (과목 한글 이름, string)
  - En (과목 영어 이름, string)
* Course2



Vote

* QuestionID
  * CourseID
    * Up
      * UserID...
    * Hum
      * UserID...
    * Down
      * UserID...
* QuestionID...

