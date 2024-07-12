
# MCQs.AI

## Create MCQs Based on a Theme in Minutes!

Welcome to MCQs.AI, a sophisticated web application designed to automatically generate multiple-choice questions (MCQs) and True/False questions from a given text using advanced machine learning techniques.

## How does MCQs.AI work?

MCQs.AI leverages a combination of modern web technologies and powerful machine learning models to provide an efficient and seamless question generation experience. Below is an overview of the system's components and their interactions:

### Frontend
The frontend of MCQs.AI is built using Vue.js, a progressive JavaScript framework that ensures a highly responsive and user-friendly interface. Key functionalities include:
- **Theme Input**: Users can input the theme and the number of questions they wish to generate.
- **Question Type Selection**: Users can choose to include True/False questions in their request.

### Backend
The backend, powered by Express.js, handles the core logic of question generation and communication with the OpenAI API. The process includes:
- **Data Processing**: Upon receiving a request, the backend processes the data and decides whether to create an MCQ or a True/False question.
- **API Interaction**: It sends a request to the OpenAI API, generating questions based on the provided theme.
- **Response Handling**: The responses from the OpenAI API are parsed and cleaned to ensure readability before being sent back to the frontend.

### Key Features
- **Customization**: Generate questions based on a user-specified theme, adding relevance to the content.
- **Variety**: Include both MCQs and True/False questions to enhance engagement and educational value.

## Architecture
The architecture of MCQs.AI is designed to ensure seamless integration between the frontend and backend components. The interaction between the user interface, backend logic, and the OpenAI API is illustrated in the architecture diagram:

![MCQs.AI Architecture](https://mcqs-ai.web.app/assets/architecture-Gpz_yG5t.png)

## Getting Started

### Prerequisites
To run MCQs.AI locally, you need to have the following installed:
- Node.js
- npm (Node Package Manager)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/mcqs-ai.git
   ```
2. Navigate to the project directory:
   ```sh
   cd mcqs-ai
   ```
3. Install dependencies for the frontend and backend:
   ```sh
   npm install
   ```

### Running the Application
1. Start the backend server:
   ```sh
   cd backend
   npm start
   ```
2. Start the frontend development server:
   ```sh
   cd frontend
   npm run serve
   ```
3. Open your browser and navigate to `http://localhost:8080` to use the application.

