# Social Network Web Application Final Project

### Web Application Development Course

---

### Project Overview
Develop a social network application that fulfills the specified technical requirements and integrates essential technologies as detailed below.

---

### Technical Requirements

#### 1. System Infrastructure
   - Server-side framework: **Node.js** with **Express**.
   - Database: **MongoDB** for data storage and retrieval.
   - Architecture: Follow **MVC (Model-View-Controller)** design, ensuring clear separation between **Model**, **View**, and **Controller** components.

#### 2. Model Requirements
   - Implement **at least three models** within the application:
     - Example models may include **Users**, **Groups**, and **Posts**.
   - Each model should support the following operations:
     - **Create** (e.g., create a new post or group).
     - **Update** (e.g., edit post content or update group details).
     - **Delete** (e.g., remove a post or user).
     - **List** (e.g., view all posts or groups).
     - **Search** (e.g., filter posts based on date range).
   - Users should be able to perform these operations directly from the application’s interface.

#### 3. Search Capabilities
   - Support **at least two search queries** that allow users to set **three search parameters** from the user interface.
     - Example: Search for a television by screen size, resolution, and manufacturer.

#### 4. Advanced Query Requirement
   - Implement **at least one query** that uses a **Group By** operation within MongoDB.

#### 5. Role-Based Access Control
   - Assign roles to users, allowing group managers additional permissions for editing and searching within the application.
   - User access should be managed based on **username and password authentication**.
   - Ensure that each user can only access their respective data.

#### 6. User Feed and Group Posts
   - Users should have access to:
     - A personal feed showing all posts they’ve published.
     - A combined feed displaying posts from both groups they belong to and friends' posts.

#### 7. Data Population
   - Populate the social network with sufficient sample data to simulate a realistic social network experience for the final presentation.

#### 8. Edge Cases and Error Handling
   - Implement server- and client-side validation to handle edge cases and prevent application crashes.

#### 9. User Interface (UI) Requirements
   - Use **jQuery** extensively on the front end, especially for **AJAX calls** that interact with the server.

#### 10. HTML5 Elements
   - Include the following HTML5 elements:
     - Video
     - Canvas
     - Semantic elements: `<aside>`, `<footer>`, `<header>`, `<nav>`, `<section>`

#### 11. CSS3 Features
   - Use the following CSS3 properties:
     - Text-shadow
     - Transition effects
     - Multiple columns
     - Custom fonts via font-face
     - Rounded corners using border-radius

#### 12. Real-time Chat Component
   - Implement a **real-time chat** feature using **Socket.io or WebSockets** to enable user-to-user messaging.

#### 13. Data Visualization and Web Services
   - **Graph Visualization**: Use **D3.js** to display at least two statistical graphs, such as average posts per group per month, with data sourced from the database and updated in real-time.
   - **External Web Service**: Integrate at least one web service, such as weather updates, news feeds, or stock prices, to enhance the user experience.
   - **Dynamic Map Integration**: Use a mapping service (e.g., Google Maps or Bing Maps) to display marked locations from the database.
   - **Social Media API**: Integrate the **Twitter API** or **Facebook API** to enable social sharing and interaction (e.g., posting updates or tracking engagement).

---
