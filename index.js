// Topics and Courses in a Math Program
class Topic {
  constructor(name, difficulty) {
    this.name = name;
    this.difficulty = difficulty;
  }

  describe() {
    return `${this.name} has a difficulty level of ${this.difficulty}.`;
  }
}

class Course {
  constructor(name) {
    this.name = name;
    this.topics = [];
  }

  addTopic(topic) {
    if (topic instanceof Topic) {
      this.topics.push(topic);
    } else {
      throw new Error(
        `You can only add an instance of Topic. Argument is not a topic: ${topic}`
      );
    }
  }

  describe() {
    return `${this.name} course has ${this.topics.length} topics.`;
  }
}

class Menu {
  constructor() {
    this.courses = [];
    this.selectedCourse = null;
  }

  start() {
    let selection = this.showMainMenuOptions();
    while (selection != 0) {
      switch (selection) {
        case "1":
          this.createCourse();
          break;
        case "2":
          this.viewCourse();
          break;
        case "3":
          this.deleteCourse();
          break;
        case "4":
          this.displayCourses();
          break;
        default:
          selection = 0;
      }
      selection = this.showMainMenuOptions();
    }
    alert("Goodbye!");
  }

  showMainMenuOptions() {
    return prompt(`
  0) Exit
  1) Create a new course
  2) View a course
  3) Delete a course
  4) Display all courses
  `);
  }

  showCourseMenuOptions(courseInfo) {
    return prompt(`
  0) Back
  1) Add a new topic
  2) Delete a topic
  -----------------
  ${courseInfo}
  `);
  }

  displayCourses() {
    let courseString = "";
    for (let i = 0; i < this.courses.length; i++) {
      courseString += i + ") " + this.courses[i].name + "\n";
    }
    alert(courseString);
  }

  createCourse() {
    let name = prompt("Enter name for new course: ");
    this.courses.push(new Course(name));
  }

  viewCourse() {
    let index = prompt("Enter the index of the course that you want to view:");
    if (index > -1 && index < this.courses.length) {
      this.selectedCourse = this.courses[index];
      let description = "Course Name: " + this.selectedCourse.name + "\n";
      description += this.selectedCourse.describe() + "\n";
      for (let i = 0; i < this.selectedCourse.topics.length; i++) {
        description +=
          i + ") " + this.selectedCourse.topics[i].describe() + "\n";
      }

      let selection1 = this.showCourseMenuOptions(description);
      switch (selection1) {
        case "1":
          this.createTopic();
          break;
        case "2":
          this.deleteTopic();
      }
    }
  }

  deleteCourse() {
    let index = prompt(
      "Enter the index of the course that you wish to delete:"
    );
    if (index > -1 && index < this.courses.length) {
      this.courses.splice(index, 1);
    }
  }

  createTopic() {
    let name = prompt("Enter name for new topic: ");
    let difficulty = prompt(
      "Enter difficulty level for new topic (e.g., Easy, Medium, Hard): "
    );
    this.selectedCourse.addTopic(new Topic(name, difficulty));
  }

  deleteTopic() {
    let index = prompt("Enter the index of the topic that you wish to delete:");
    if (index > -1 && index < this.selectedCourse.topics.length) {
      this.selectedCourse.topics.splice(index, 1);
    }
  }
}

let menu = new Menu();
menu.start();
