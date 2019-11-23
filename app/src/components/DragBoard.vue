<template>
  <v-container>
    <v-col>
      <v-row justify="space-between">
        <semester-board
          v-for="(semester, index) in selected"
          v-bind:key="index"
          :semester="semester.semester"
          :semesterId="index"
          :items="semester.items"
          v-on:drag-over-semester="getSemesterDrag"
          v-on:drag-leave-semester="leaveSemesterDrag"
          v-on:drag-dropped-semester="addSemesterChip"
          v-on:deselect-course="deselectChip"
          v-on:vote="vote"
        />
      </v-row>
      <v-row justify="center">
        <unselected-chip
          v-for="(course, index) in unselected"
          v-bind:key="index"
          class="text-center"
          :code="course.code"
          :en-name="course.enName"
          :ko-name="course.koName"
          :courseId="index"
          v-on:drag-on="getDrag"
          v-on:drag-end="addSemesterChip"
        />
      </v-row>
    </v-col>
  </v-container>
</template>
<script>
import { db } from "../main"
import store from '../store'

export default {
  name: "DragBoard",
  components: {
    UnselectedChip: () => import("@/components/chips/DragChip"),
    SemesterBoard: () => import("@/components/SemesterBoard")
  },
  data: () => ({
    nullInfo: {
      code: "Temp",
      enName: "Temp",
      koName: "Temp"
    },
    currentId: -1,
    unselected: [
      {
        code: "CS101",
        enName: "Introduction to Programming",
        koName: "프로그래밍 기초",
        votes: 0
      },
      {
        code: "CS109",
        enName: "Programming Practice",
        koName: "프로그래밍 실습",
        votes: 0
      },
      {
        code: "CS202",
        enName: "Problem Solving",
        koName: "문제해결기법",
        votes: 0
      },
      {
        code: "CS211",
        enName: "Digital System and Lab.",
        koName: "디지털시스템 및 실험",
        votes: 0
      },
      {
        code: "CS220",
        enName: "Programming Principles",
        koName: "프로그래밍의 이해",
        votes: 0
      },
      {
        code: "CS230",
        enName: "System Programming",
        koName: "시스템 프로그래밍",
        votes: 0
      },
      {
        code: "CS270",
        enName: "Creative design of intelligent robots",
        koName: "지능 로봇 설계 및 프로그래밍",
        votes: 0
      },
      {
        code: "CS310",
        enName: "Embedded Computer System",
        koName: "내장형 컴퓨터 시스템",
        votes: 0
      },
      {
        code: "CS341",
        enName: "Introduction to Computer Network",
        koName: "전산망개론",
        votes: 0
      },
      {
        code: "CS350",
        enName: "Introduction to Software Engineering",
        koName: "소프트웨어 공학개론",
        votes: 0
      },
      {
        code: "CS360",
        enName: "Introduction to Database",
        koName: "데이터베이스 개론",
        votes: 0
      },
      {
        code: "CS374",
        enName: "Introduction toHuman-Computer Interaction",
        koName: "인간-컴퓨터 상호작용 개론",
        votes: 0
      },
      {
        code: "CS376",
        enName: "Machine Learning",
        koName: "기계학습",
        votes: 0
      },
      {
        code: "CS380",
        enName: "Introduction to Computer Graphics",
        koName: "컴퓨터그래픽스 개론",
        votes: 0
      },
      {
        code: "CS402",
        enName: "Introduction to Logic for Computer Science",
        koName: "전산논리학 개론",
        votes: 0
      },
      {
        code: "CS408",
        enName: "Computer Science Project",
        koName: "전산학 프로젝트",
        votes: 0
      },
      {
        code: "CS409",
        enName: "Software Projects for Industrial Collaboration",
        koName: "산학협업 소프트웨어 프로젝트",
        votes: 0
      },
      {
        code: "CS420",
        enName: "Complier Design",
        koName: "컴파일러 설계",
        votes: 0
      },
      {
        code: "CS422",
        enName: "Computation Theory",
        koName: "계산이론",
        votes: 0
      },
      {
        code: "CS423",
        enName: "Probabilistic Programming",
        koName: "확률적 프로그래밍",
        votes: 0
      },
      {
        code: "CS442",
        enName: "Mobile Computing and Application",
        koName: "모바일 컴퓨팅과 응용",
        votes: 0
      },
      {
        code: "CS443",
        enName: "Distributed Algorithms and Systems",
        koName: "분산 알고리즘 및 시스템",
        votes: 0
      },
      {
        code: "CS448",
        enName: "Introduction to Information Security",
        koName: "정보보호개론",
        votes: 0
      },
      {
        code: "CS453",
        enName: "Automated Software Testing",
        koName: "소프트웨어 테스팅 자동화 기법",
        votes: 0
      },
      {
        code: "CS454",
        enName: "Artificial Intelligence Based Software Engineering",
        koName: "인공 지능 기반 소프트웨어 공학",
        votes: 0
      },
      {
        code: "CS473",
        enName: "Introduction to Social Computing",
        koName: "소셜 컴퓨팅 개론",
        votes: 0
      },
      {
        code: "CS520",
        enName: "Programming Language Logics",
        koName: "프로그래밍 언어 이론",
        votes: 0
      }
    ],
    selected: [
      {
        semester: "2020 Spring",
        items: [
          {
            code: "CS489",
            enName: "Computer Ethic & Social Issues",
            koName: "컴퓨터 윤리와 사회문제",
            my_item: false,
            votes: 1
          },
          {
            code: "CS520",
            enName: "Theory of Programming Languages",
            koName: "프로그래밍 언어 이론",
            my_item: false,
            votes: 0
          }
        ]
      },
      {
        semester: "2020 Fall",
        items: [
          {
            code: "CS101",
            enName: "Introduction to Programming",
            koName: "프로그래밍 개론",
            votes: 1
          }
        ]
      },
      {
        semester: "2021 Spring",
        items: []
      }
    ],
    currentSemesterId: -1,
    onDrag: false
  }),
  methods: {
    getDrag: function(courseId) {
      this.currentId = courseId;
      this.onDrag = true;
    },
    getSemesterDrag: function(semesterId) {
      this.currentSemesterId = semesterId;
    },
    leaveSemesterDrag: function() {
      this.currentSemesterId = -1;
    },
    addSemesterChip: function(semesterId) {
      if (this.currentId >= 0) {
        var item = this.unselected[this.currentId];
        var index = this.selected[semesterId].items.findIndex(
          x => x.code === item.code
        );
        if (index >= 0) {
          this.selected[semesterId].items[index].votes += 1;
          this.selected[semesterId].items[index].my_item = true;
        } else {
          item.my_item = true;
          item.votes += 1;
          this.selected[semesterId].items.push(item);
          store.commit('increaseReputationPts', 1)
        }
        this.unselected.splice(this.currentId, 1);
        this.currentId = -1;
        this.currentSemesterId = -1;
      }
      this.onDrag = false;
    },
    deselectChip: function(semesterId, courseId) {
      const targetCourse = this.selected[semesterId].items[courseId];
      var item = {
        code: targetCourse.code,
        enName: targetCourse.enName,
        koName: targetCourse.koName,
        votes: targetCourse.votes - 1
      };
      if (item.votes > 0) {
        this.selected[semesterId].items[courseId].votes -= 1;
        this.selected[semesterId].items[courseId].my_item = false;
      } else {
        this.selected[semesterId].items.splice(courseId, 1);
      }

      this.unselected.push(item);
    },
    vote: function(semesterId, courseId, voteState) {
      if (voteState === "downvote") {
        this.selected[semesterId].items[courseId].votes -= 1;
      } else if (voteState === "upvote") {
        this.selected[semesterId].items[courseId].votes += 1;
      }
    },
    reputationUpdate: function(questionID, code, year, isSpring) {
      db.collection("votes")
        .orderBy("questionID", "asc")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            if (doc.data().questionID == questionID) {
              let voteHistory = doc.data().upvoteHistory;
              for (var i = 0; i < voteHistory.length; i++) {
                let upvoteList = voteHistory[i].split(",");
                if (upvoteList.length >= 3) {
                  for (var j = 3; j < upvoteList.length; j++) {
                    if (
                      code == upvoteList[0] &&
                      year == upvoteList[1] &&
                      (isSpring ? "S" : "F") == upvoteList[2]
                    ) {
                      let userID = parseInt(upvoteList[j]);
                      db.collection("users")
                        .where("userID", "==", userID)
                        .get()
                        .then(snapshot => {
                          snapshot.forEach(doc => {
                            let newReputationPts = doc.data().reputationPts + 4;
                            doc.ref.update({ reputationPts: newReputationPts });
                          });
                        });
                    }
                  }
                }
              }
            }
          });
        });
    }
  }
};
</script>