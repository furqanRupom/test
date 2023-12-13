# Course Reviews App

Welcome to our Course Reviews App! This application allows users to create courses, provide reviews, and retrieve information about courses. Whether you're a developer looking to contribute or a user interested in setting up the project locally, we've got you covered!

## Contributing
We value your contributions! Here's how you can get started:

- **Report Issues:** If you encounter any bugs, please don't hesitate to report them.
- **Contribute Code:** Developers, you can contribute by following these steps:
    1. Fork this repository
    2. Clone the forked repository
    3. Add your contributions (code or documentation)
    4. Commit and push
    5. Submit a pull request

- **Suggestions:** Feel free to suggest improvements or report any issues.

- **Documentation:** If you identify areas that need improvement in the documentation, please suggest changes.

## Installation

### Prerequisites
Make sure you have the following installed on your machine (Mac/Linux/Windows):

- Node.js
- npm (Node Package Manager)
- MongoDB

### Steps

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/your-username/course-reviews-app.git
    cd course-reviews-app
    ```

2. **Install Dependencies:**
    ```bash
    yarn
    ```

3. **Configure Environment Variables:**
    Create a `.env` file in the root directory and add the necessary environment variables. Use `.env.local` as a template.

4. **Start the Application:**
    ```bash
    yarn start
    ```
    This command starts the application. After this step, you can access the app locally at [http://localhost:5000](http://localhost:5000).
   NOTE: you have to set the port number to 5000.

6. **Access the App:**
    The app is now running at [http://localhost:5000](http://localhost:5000). You can explore the API routes and interact with the application.

## Features

### API Routes

- **Create a Course:**
    ```http
    POST /api/course
    ```
    * You can create a course with this following route using the provided data.

- **Get Paginated and Filtered Courses:**
    ```http
    GET /api/courses
    ```
    * You can retrieve courses with pagination and filtering using various query parameters.

- **Create a Category:**
    ```http
    POST /api/categories
    ```
    * You can create a category with this route using the provided data.

- **Get All Categories:**
    ```http
    GET /api/categories
    ```
    * You can retrieve all categories using this route.

- **Create a Review:**
    ```http
    POST /api/reviews
    ```
    * You can create a review with this route using the provided data.

- **Update a Course:**
    ```http
    PUT /api/courses/:courseId
    ```
    * You can update a course with this route using partial or full data.

- **Get Course by ID with Reviews:**
    ```http
    GET /api/courses/:courseId/reviews
    ```
    * You can retrieve a course along with its reviews using this route.

- **Get the Best Course Based on Average Review:**
    ```http
    GET /api/course/best
    ```
    * You can retrieve the best course based on average reviews.

Explore freely this app and use all routes as needed. And if you encounter any bugs or problems, don't hesitate to reach out!
