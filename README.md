# Student Dashboards

## Project Description
> CRUD application where students can READ their personalized dashboard. The app allows for the CREATION of a new student and their dashboard. Each dashboard can be UPDATED, by posting/changing grades for assignments. If a student drops out or is kicked out, their dashboard can be DELETED. 

### Schema

Dashboard:

- Class name: text
- isEnrolled: boolean
- currentGrade: number
- Attendance: number
- Assignments: Array of assignment objects: 
- 	Properties of assignment objects:
 		- assignmentName:
 		- assignmentDueDate:
 		- assignmentGrade:
		- assignmentComments:

User Schema
- Username: string
- Password: string 
- isTeacher: boolean

### Routes

- Index/GET / - redirects to sign-in/register page
- Index/GET   /studentDashboard  – Show the index of students in the class
- New/GET  /studentDashboard/new – Render a form to be able to submit a new student to the class with homework assignments, projects and attendance
- Show/Get  /studentDashboard/:id - Render a page to show a student and their homework assignments, projects and attendance
- Create/Post   /studentDashboard/:id - Render the page of the newly created student that was created in the previous new form
- Delete/DELETE  /studentDashboard/:id - Delete the current student and redirect page back to the index route
- Edit/GET  /studentDashboard/:id/edit - Edit current student’s homework, projects and attendance
- Update/PUT  /studentDashboard/:id - Adds new form data to student’s dashboard and redirects to edited student’s show page
- Register/GET  /users/register - Brings user to a register page to register for the website
- Register/POST  /users/register - Route to add new user to the database and save the user data, redirects to home page
- Sign In/GET  /users/signin - Route to render sign in page
- Sign In/POST  /users/signin - Route to find a user that is signed up and redirects to home page

## Wireframes
Login page:

![2022-09-20__5_](https://media.git.generalassemb.ly/user/43690/files/0690a9d4-12b3-40b5-9be0-85b16966b449)

View of all the students:
![listr](https://media.git.generalassemb.ly/user/43690/files/dc4616ad-7c04-460f-a30e-ecd84f502dc7)

Specific Student Dashboard:
>Attendance Section:
![2022-09-20 (8)](https://media.git.generalassemb.ly/user/43690/files/1797fe13-7b79-400b-8506-3b9f193060bb)
>Assignment Section:
![2022-09-20 (9)](https://media.git.generalassemb.ly/user/43690/files/7038ff57-9710-453f-a873-f3bfac917027)

Creating a new student/edit form:
![2022-09-20 (10)](https://media.git.generalassemb.ly/user/43690/files/4d07c846-c092-4513-83d5-03ee79a20f5e)

## User Stories

- As a teacher/student I want to be able to view my homework, project completions and attendance throughout the course
- As a teacher/student I want to be able to see my grade and/or a pass/fail on my homework assignments and completions
- As a teacher/student I want to view, create, update and delete assignments and projects to the application
- As a teacher/student I want to add and update a homework name, due date, grade and comments to each homework and completion and be able to show that on the specific student’s dashboard
- As a teacher/student I want to click something to show a homework or project assignment was completed for a specific student
- As a teacher/student I want to mark whether a student was tardy or absent and have attendance added to that specific student
- As a teacher/student I want to add and update a grade or a pass/fail for the specific student’s overall performance in the class
- As a teacher/student, I want to login as an admin and be able to create, update and delete a student’s dashboard
- As a teacher/student, I want to be able to mark if a student is still in the class or no longer attending
- As a teacher/student, I want to add and update homework and projects to different units


### MVP Goals

Right now--teacher/student can do the same things (in stretch we want to restrict what they can/cant do). 
Application that can show each individual student in your class. When you click on the student, the show page renders homework assignments and whether they’ve been completed or not and if applicable, what grade they received. The show page also renders projects and the project’s completions and attendance. The application also has an edit page and new page as well as an edit route and delete route. Each student also has a delete button. The students can then view their dashboard. Teachers can sign in or register for the application and edit, create and delete students from login.


### Stretch Goals

- Implement the user/teacher roles with login/authentication to actually restrict what particular users can do/not do
- An additional show route for a deeper dive into each individual assignment showing a description, grade, comments, due date
- Create classes page that shows the different classes of students. Once you click a class, it renders a page showing all the students in that specific class
