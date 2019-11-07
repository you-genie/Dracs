# Milestone 3: Low-fi prototype
> Team Name: Random

> Member: Yujin Chung, Sangho Kim, Jaeryoung Ka

### 1. Problem statement
From our survey, many CS students want to get information on personal coursework, but we also found that asking, getting and sharing diverse experience (or opinion) is hard.

### 2. Tasks
> Users can look up similar cases to their own using a search bar and get meaningful information in a much shorter time.
> **-> Search**

> People can ask a question, searching for the customized coursework table 
> **-> Upload a Question**

> People can give an instant and easy answer to person who need help on choosing coursework, and interact with other users  
> **-> Recommend, Vote**

### 3. Prototype
> Link: https://projects.invisionapp.com/prototype/random-ck2jqalx2002da201u0zc2sxj/play

> NOTE: Invision do not support IE. Please use Chrome to access it.

> We decided to use Invision after inspecting all the three recommendations. The following are some reasons:
* Invision can assign events to buttons. However, in Marvel, designers select a space rather than a button to assign events. Considering that interactions on our prototype are button-focused, we chose Invision.
* Two members had prior experience in Invision, whereas only one person had one on Marvel. From choosing the former, we expected that we could reduce the trial-and-errors from the learnability issues.
* Proto.io only supports a 30-day trial for free and requires payment after that. Our term project lasts longer than a month, and we should refer to the prototype within the project period. That’s why we excluded it.
* As our project name suggests, we wanted to emphasize a drag as a means of interactions. However, all three free-prototyping tools did not support dragging.

> Invision had following pros and cons.
* Animated responses could be made easily. This helped us to make it user-friendly.
* We expect that mobile users would have trouble using the service if we don’t prepare a mobile version. Invision supported both PC and mobile prototypes, as well as one for other devices.
* Invision did not work on IE10 and IE11. So we did user tests in Chrome.

> We chose not to implement the following things:
* Reputation system and algorithms. Because it is hard to test and get meaningful responses. We also could have shown some descriptions like “You get +5 for each confirmed suggestions, -2 for each downvote you got….” However, it’s too descriptive, so we decided not to include it.
* Detailed categories to which each question belong, especially in searching. Regarding coursework Q&A, we have a lot of criteria to categorize a single question. It is a must-do work to get well-fit answers, but tedious and have nothing to test in the stage of the low-fi prototype. So, we decided to skip the stage of checking it, and showed the result page then asked opinions.
* Drags. We initially pondered much whether we should support dragging in the low-fi prototype. Since Invision didn’t support dragging, we chose to give a similar experience to it and not to fully implement drags itself. 
* We used hard-coded data instead of the user’s own data. It is because most prototype tools do not support actions as text-writing, only changing Html pages are available. 

> Images
![](https://github.com/krista2811/CS473/blob/master/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202019-11-07%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%206.32.58.png)

![](https://github.com/krista2811/CS473/blob/master/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202019-11-07%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%206.33.17.png)


![](https://github.com/krista2811/CS473/blob/master/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202019-11-07%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%206.33.42.png)

![](https://github.com/krista2811/CS473/blob/master/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202019-11-07%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%206.33.51.png)

### 4. Observations
> We interviewed four participants. We will refer them as P1(17’), P2(16’), P3(16’), P4(18’). The number in () means an entrance year. We interviewed students ranging from newcomers(18’) to senior(16’) to try to get feedback from both relatively questioner-close participants and respondent-close participants.

> Here are our observed problems and the plan to deal with them.

#### Topic 1: Flows and overall
1. [Medium] Did not understand the flow of the scenario well. (P1, P2)
> We would like to provide a tutorial page for newcomers when a user signed up for the first time. It can be skipped, but users can always view it again.
2. [Medium] Did not come up with what to do and what each section does on the main page. (P3)
> We will place some popovers (or tooltip) in front of the entrance of core tasks (e.g., a search bar, button to ask a question, and so on). Popovers will no longer show if the user uses the function at least once, saved in a cookie, possibly.
3. [Low] Felt inconvenience due to lack of supporting dragging (P1, P3, P4)
> As we mentioned earlier, we intentionally chose not to support it. We will make a mockup that well supports dragging in the high-fi prototype (we referred to the DP4 description in the past course)

#### Topic 2: on the coursework table
4. [High] Users did not understand what abbreviations, such as subject the code (e.g., CS204) and semesters (e.g., 19F) refer to. (P2, P3) 
> We will provide a course name too, though not the full name, if it is too long. In this case, we will provide hover-triggered action to show the full name. We are also going to use “2020 Spring” instead of “20S”.
5. [High] Users did not understand the function of the select button that we intended as “confirm” in finalizing the coursework. (P1, P2)
> We admit that the word select was confusing enough. In this case, we will change the naming to confirmed. Also, we would separate the sections into two(confirmed / unconfirmed) to make our system more intuitive.
6. [Medium] Did not understand what the color of each component means in the coursework. (P3)
> Our intention was: Green for In voting, Black for selected (confirmed), Red for downvoted. We will provide legends for each state to make our UI more intuitive.
7. [Medium] Did not understand what the tags in the coursework table exactly mean (P3)
> There were two people who said the tags were great. So, we would maintain the system but more intuitively. Descriptions will be added to the tags.
8. [Low] It does not feel like many participants are making one coursework table. (P4)
> P4 noted that it expected an instant interaction. Ideally, chatting could be more effective than this way; but we decided live interactions are not necessary for the context of our defined problem. However, in the later stages, we may think about ways to support users who expect more lively interactions, like providing comments area.

#### Topic 3: on searching and its results
9. [Medium] Did not understand how double majors and Minor checkbox works (P3)
> Our intention was just to let them know they can check if they are doing double majors/minors. However, we got valuable findings from this problem. We decided to re-design UI for it: first, users check if CS is major or minor, and then they specify double majors if they exist. Plus, we will consider advanced majors (심화전공) and check if it’s meaningfully different from the existing one.
10. [Low] Did not understand what does a number in the circle in the question list page. (P2)
> The primary purpose of the function was to denote the number of semesters the user has taken. To enhance the readability, user information such as current academic states will be given in corresponding spaces, where the circle was placed. 


