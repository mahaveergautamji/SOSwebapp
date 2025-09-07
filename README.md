# SOS Web App

This is a Next.js application that acts as a personal safety companion, built with Firebase Studio. It includes features like an SOS button, AI-powered threat detection from surrounding sounds, and quick emergency messaging to family contacts.

## Getting Started

To get this project up and running on your local machine, follow these steps.

### Prerequisites

You'll need to have [Node.js](https://nodejs.org/en/) (which includes npm) installed on your computer.

### Installation & Setup

1.  **Clone the repository:**
    If you have git installed, you can clone the repository. Otherwise, you can download the source code.
    ```bash
    git clone <repository-url>
    cd <repository-folder>
    ```

2.  **Install dependencies:**
    This command will download and install all the necessary packages for the application to run.
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a new file named `.env.local` in the root of your project folder. This file will store your secret API key for the AI features. Add the following line to it:
    ```
    GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```
    You will need to obtain a Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey) and replace `YOUR_API_KEY_HERE` with your actual key.

4.  **Run the development server:**
    This command starts the local development server.
    ```bash
    npm run dev
    ```

5.  **View your app:**
    Open your web browser and navigate to [http://localhost:9002](http://localhost:9002). You should now see the application running!
