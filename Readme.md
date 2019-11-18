Database Structure



User

- UserID 1(유저 교유 ID  != 유저 로그인 이메일)
  - Semester (재학 학기, 학기 수, number)
  - Major 
    - Major (주전공)
    - Double Major(복수전공, default = None)
    - Minor (부전공, default = None)
  - Certificates
    - Course1 (과목 코드, string)
      - Ko (과목 한글 이름, string)
      - En (과목 영어 이름, string)
    - Course2

* UserID 2



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

