# Milestone 3: Low-fi prototype
> Team Name: Random

> Member: Yujin Chung, Sangho Kim, Jaeryoung Ka

### 1. Problem statement
CS students are interested in getting information on coursework, but our research has found that they have a hard time in both asking about it, and constructing a suitable one based on the collected information. Our survey have also qualitatively shown that there is little chance of diverse interactions to recommending coursework due to the limitation of homogeneity of group to which people usually ask.

### 2. Core Tasks
> **Search**: users can look up similar cases to their own using a search bar and get meaningful information in a much shorter time.

> **Upload a Question**: People can ask a question, seeking for the customized coursework table of their own.

> **Recommend, Humm-vote, downvote**: People can interact with each other, by either recommending specific courses or casting a “Humm..” vote or a downvote.
 
### 3. Prototype
> **Link**: https://projects.invisionapp.com/prototype/random-ck2jqalx2002da201u0zc2sxj/play

> NOTE: Invision do not support IE. Please use Chrome to access it.

> We decided to use Invision after inspecting all the three recommendations made by the instructors. The following are some reasons:
* Invision supports buttons to be assigned some events. However, in Marvel, designers select a space rather than a button to assign events. Considering that interactions on work is button-focused, we chose Invision.
* Two of the three had a prior experience on Invision, whereas only one people had one on Marvel. From choosing the former, we expected that we could reduce the trial-and-errors from the learnability issues and it was true.
* Proto.io only supports 30-day trial for free, and requires payment after that. Since our term project lasts longer than a month, we chose to drop it from our candidates after inspecting if worth-paying aspects are there.

> Invision had following pros and cons.
* Animated responses could be made easily. This helped us to make it beautiful.
* We expect that mobile users would have trouble using the service if we don’t prepare a mobile version. Invision supported both PC and mobile prototypes, as well as one for other devices.
* As our project name suggests, we wanted to emphasize a drag as a means of interactions. However, Invision did not support dragging fully.
* Invision did not work on IE10 and IE11. Our target users are CS students, so we expected that we had no problem to test our prototype, though.

> We chose not to implement the following things:
* Reputation system and algorithms. Because it is hard to test and get meaningful responses. We also could have shown some descriptions like “You get +5 for each confirmed suggestions, -2 for each downvote you got….” However, it’s too descriptive and invoke headaches for volunteers.
* Detailed categories to which each question belong, especially in searching. Regarding coursework Q&A, we have a lot of criteria to categorize a single question. It is a must-do work to get well-fit answers, but tedious and have nothing to test in the stage of low-fi prototype. So, we decided to skip the stage of checking it, and show the result then asked feelings and opinions.
* Drags. We initially pondered much whether we should support dragging in the low-fi prototype. We concluded not to, because we should do more mockups and then it becomes not a low-fi one, even if we want to emphasize dragging in later prototype and actual service.


> 스크린샷: 이 부분은 토론이 필요할 것 같아서 목요일에 완성하도록 하겠습니다.
> Representative screenshots: Include a few most important screenshots that showcase the uniqueness of your application.
> Do screenshots capture representative moments of the prototype?

### 4. Observations
We interviewed four participants. We will refer them as P1, …, P4. 

##### Topic 1: Flows and overall
1. [Medium] Did not understand the flow of scenario well. (P1, P2)
2. [Medium] Did not come up with what to do and what each section does in the main page. (P3)
3. [Low] Felt inconvenience due to lack of supporting dragging (P1, P3, P4)

##### Topic 2: on the coursework table
4. [High] Users did not understand what abbreations, such as subject the code (e.g., CS204) and semesters (e.g., 19F) refer to. (P2, P3) 
5. [High] Users did not understand the function of select button that we intended as “confirm” in finalizing the coursework. (P1, P2)
6. [Medium] Did not understand what the color of each component means in the coursework. (P3)
7. [Medium] Did not understand what the tags in the coursework table exactly mean (P3)
8. [Low] It does not feel like many participants are making one coursework table. (P4)

##### Topic 3: on searching and its results
9. [Medium] Did not understand how double majors and Minor checkbox works (P3)
10. [Low] Did not understand what does a number in the circle in the question list page. (P2)

> How we planned to deal with the problems are as follows:
1. We would like to provide a tutorial for newcomers, as you have seen when you install a new mobile app. It can be skipped, but users can always view it again.
2. We will place some popovers in front of the entrance of core tasks (e.g., a search bar, button to ask a question, and so on). Popovers will no longer show if user uses the function at least once; saved in a cookie, possibly.
3. As we mentioned earlier, we intentionally chose not to support it. We will make a mockup that well supports dragging in the high-fi prototype (we referred to the DP4 description in the past course)
4. We will provide a course name too, though not the full name if it is too long. We are also going to use “2020 Spring” instead of “20S”.
5. We admit that the word select was confusing enough. We will think of more intuitive UI so that users can understand that by clicking it they make the final confirmation of coursework.
6. Our intention was: Green for In voting, Black for selected (confirmed), Red for downvoted. However, we did not provide legends for that. We will provide one in the later stages.
7. There were two people who said the tags were great. However, one person said that it’s hard to understand. For example, double-major may sound either the questioner is doing one, or recommend him/her doing it. We will fix UI so that this sounds as what we intended: the former.
8. P4 noted that it expected a chatting-like instant interaction. Ideally, chatting could be more effective than this way; but we chose our way because chatting requires too high number of simultaneously-online users. However, in the later stages we may think about ways to support users who expect more lively interactions, like providing comments area.
9. Honestly speaking, we did not expect users to focus on such peripheral designs. Our intention was just telling that they can specify it. However, we got a valuable findings from it. We decided to re-design UI for it: first users check if CS is major or minor, and then they specify double majors if exist. Plus, we will consider advanced majors (심화전공) and check if it’s meaningfully different from existing one.
10. It is natural, in hindsight, that people can’t understand our intention. Our purpose was denoting more information, such as the number of semesters taken. We discussed on it and concluded that we remove it and find more meaningful utilization of the space later, because providing a lot of information on the list isn’t proper.
