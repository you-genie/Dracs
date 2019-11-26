# Milestone 4: High-fi prototype
> Team Name: Random

> Member: Yujin Chung, Sangho Kim, Jaeryoung Ka

## 1. Project Summary

- Many CS students want to get information on personal coursework, but asking, getting, and sharing diverse experiences (or opinion) is not easy.

- We propose DragCS, which provides an opportunity for asking, recommending coursework, and sharing experiences and opinions for the specific personal needs.

- This is unique in that it leverages crowds’ knowledge to offer a better-customized (for the specific person), seamless (each one makes recommendations for all semesters), longer-term solution, as well as it supports people to express their opinion with simple drag-drop. 


## 2. Instruction
Welcome to DragCS! In DragCS, you can ask customized coursework for you as well as answer and vote to questions. 

### Step 1
Let's look at the main page. You can take a look at questions waiting for you, ask your own question, or search for the existing questions. 

> NOTE: We decided "Questions waiting for you" to show **only** when you are logged in.

First, let's ask a question. Press + buttons on the main page.

![image 1](https://github.com/krista2811/CS473/blob/master/images/image1.png)

### Step 2
Oh, to recommend your questions to the most suitable persons, you need to sign up first. Click "Sign up here." and fill in the information.

![image 2](https://github.com/krista2811/CS473/blob/master/images/image2.png)
### Step 3
Well done! Now let's write down some details so that crowds can provide the most well-fit recommendations for you.

![image 3](https://github.com/krista2811/CS473/blob/master/images/image3.png)
### Step 4
You made it! Now people will create nice coursework suited for you. Oh-oh, wait. Would you become an angle for other computer science students, too?

You can answer, or vote, to other people's questions by either clicking them from the main page or searching them. Let's click the first question this time.

![image 4](https://github.com/krista2811/CS473/blob/master/images/image4.png)
### Step 5
Oh, that student needs your help. You can recommend courses by drag-and-drop from the list below. Every time you favored your beneficiary, you get some reputation points.

![image 5](https://github.com/krista2811/CS473/blob/master/images/image5.png)
### Step 6
In case if you don't know what CS473 (and other courses) is, you can see the full name of that course when you hover it.

You can undo recommendations by clicking the recommended course again and choosing "undo."

Wa..ait. An ambitious person recommended a machine learning course to the first semester of a freshman. You can click the course (that you didn't recommend) to cast a downvote, or "Not sure."

![image 6](https://github.com/krista2811/CS473/blob/master/images/image6.png)
### Step 7
Let's get back to your question. Crowds made recommendations for you! Now, all you have to do is to "select" what you will actually take from the list of recommendations.

This makes you get a finished coursework table, as well as help other people who searched yours get meaningful information, too. (Those who voted to get a bonus reputation if you select some of the courses, too!)

![image 7](https://github.com/krista2811/CS473/blob/master/images/image7.png)
### Step 8

Now let's search for questions. It would be useful when you want to see already-made coursework that is similar to you as well as when you want to volunteer to recommend courses for other students. 

Click the search bar and write some keywords. You can also provide a major and interests, too. Then press search.

![image 8](https://github.com/krista2811/CS473/blob/master/images/image8.png)

Wow! Related questions are here! You can click one of them to see details.

> NOTE: It may **take a few seconds** to show the result.

> NOTE: The related-questions algorithm takes additional information you provided when sign-up (e.g., your current semester) to judge the order. If you are not logged in, it regards you as a freshman.

![image 9](https://github.com/krista2811/CS473/blob/master/images/image9.png)


## 3. URL of your prototype
 * https://cs473-dragcs.web.app/

> NOTE: We tested the website on Desktop, Chrome 78.0.3904.108 (64-bit)

## 4. URL of your Git repository
 * https://github.com/krista2811/CS473


## 5. Libraries and frameworks
 * Vuetify (Vue.js)
 * Node.js
 * Firebase
 * Firestore

## 6. Individual Reflections
### Yujin
- Main Contribution  
FrontEnd main engineer [draggable answer board, question board, question posting actions, search actions]  
Searching logic using user search queries and search options, extended from Jaeryoung's user-similarity logic.
- Difficulties  
Implementing draggable actions. Masking events each other are difficult to unwrap.
Designing the page. We received comments on 'don't know what to do on answer page', so the dragging actions of answer page should be easily known to users. In this case, guides for 'droppable' area is shown to user, and text guides are also added.
- Useful skill learned  
Designing with async user events. First passing events within parent and child components, and second dealing with 'drag' related events.

### SangHou
Which part of the system did you directly contribute to?
 - Firebase db connecting to front-end, hosting setting. Firebase database structure design. Shift local data to firebase db.

What were some of the difficulties you faced?
 - Using vuex library. I had not experienced vueJS before, I mainly did database connection and data fetch to front-end. I studyed how to manage state in vueJS. Some state is not properly fetched and async data fetches makes some critical errors like not fetching subsequent dataset.
 
List one useful skill you learned while working on the high-fi prototype.
 - VueJS. During high-fi prototype, I have opportunity to study vueJS and vuex. Also I learned how to we use firebase database.


### Jaeryoung
Which part of the system did you directly contribute to?
 - Designed data structures and provided fake datasets to well support the prototype.
 - Implemented mainly backend: authorization, search API, reputation algorithm, best-fit(similarity) algorithm between user needs. Small design and UI improvements were made in the front-end side.
 - Designed end-to-end scenarios (user flow) and made a quick tour.

What were some of the difficulties you faced?
 - Async/await notions were still confusing, even if I have dealt with it many times before.
 - How to optimize DB quotas for firebase. Since we used a free plan of firebase, we needed to optimize our query attempts so that it takes smallest read/write accesses (in terms of firestore), not in terms of dealing with traditional DB. Fortunately, we did not use even half of the daily quota, but this effort would be important when a lot of users enjoy the service.
 - Collaborating with a designer. Although interactions about designs were effectively made, I think I have more room to grow if I grind to have more experience on discussing designs with experienced designers.
 - Conflict with my code and project deadline. I wanted to make a detailed reputation system and wrote code, designed DB structures and so on; but its priority were low and deadline became demanding so I need to delete my work. I realized that it is important to deal with unexpected obstacles and tune schedule accordingly. 
 
List one useful skill you learned while working on the high-fi prototype.
 - Dealing with firestore. I have used Realtime Database on firebase, but Google made a new alternative (and wants to nudge developers to use this one). It was both similar and somewhat different to Realtime Database; and I learned that it is relatively easy to learn a new one if one has a thorough base knowledge and have prior experience on similar (or old) things. 

