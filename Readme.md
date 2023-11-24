# Simple CRUD Assignment

This application is a TypeScript-based CRUD (Create, Read, Update, Delete) application using Express, MongoDB, and Mongoose.

### Prerequisites

Before running the application, ensure you have the following installed in your work station:

- Node.js (preferably the latest LTS version)
- MongoDB installed and running on your local machine or a remote server
- Git (if cloning from a repository)

### Installation

Clone or download the repository from [https://github.com/Shamiul-Lipu/simple-crud-assignment.git]. 2. Navigate to the project directory in your terminal.

```bash
   cd simple-crud-assignment
```

Install dependencies using npm (Node Package Manager).

```bash
   npm install
```

### Configuration

Create a `.env` file in the root directory of the project.

Add necessary environment variables to the `.env` file, such as:

`MONGODB_URI:` MongoDB connection URI.
Other necessary environment variables required for your application.
Example .env file:

```bash
MONGODB_URI=mongodb://localhost:27017/your_database_name
```

### Running the Application

#### Development Mode

```bash
   npm run start:dev
```

> The development server will start at http://localhost:3000 or the server port you assignted

#### Production Mode

To run the application in production mode:

```bash
    npm run build
    npm start:prod
```

#### Additional Information

**For linting:**

```bash
    npm run lint
```
