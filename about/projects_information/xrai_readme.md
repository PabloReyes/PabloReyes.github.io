# X-RAI VISION
**X-RAI VISION** is an intelligent portfolio auditing tool that leverages Generative AI (Google Gemini) to analyze Morningstar PDF reports. It provides investors with a deep dive into their portfolio's health, hidden risks, and strategic opportunities through an interactive and visual interface.
## How it Works
1.  **Upload**: Simply drop your Morningstar portfolio PDF report into the app.
2.  **AI Analysis**: The application uses Google's Gemini Pro Vision model to "read" the PDF, extracting complex financial data, asset allocations, and holding details.
3.  **Insight Generation**: The AI identifies sector exposure, geographic distribution, fees, and potential overlaps (fund duplication).
4.  **Visualize**: View a comprehensive dashboard with a detailed "Portfolio Health Score", interactive charts (allocation, performance), and a strategic written report.
5.  **Share**: Generate a unique link to share your analysis or save it for later.
## Tech Stack
This project is built with a modern, performance-oriented stack:
*   **Frontend**: [React](https://react.dev/) + [Vite](https://vitejs.dev/) for a blazing fast UI.
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) for a premium, responsive design.
*   **AI Engine**: [Google Gemini API](https://ai.google.dev/) (Multimodal) for document processing and financial reasoning.
*   **Visualization**: [Recharts](https://recharts.org/) for beautiful, responsive charts.
*   **Backend Proxy**: Node.js & Express (to securely handle API requests).
## How to Run
### prerequisites
*   Node.js (v18+ recommended)
*   A Google Cloud Project with the **Gemini API** enabled.
### Installation
1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/portfolio-analizer-ai.git
    cd portfolio-analizer-ai
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
### Configuration
1.  Create a `.env` file in the root directory:
    ```bash
    cp .env.example .env
    ```
2.  Add your Google Gemini API key:
    ```env
    GEMINI_API_KEY=your_api_key_here
    ```
### Running the App
You can run both the frontend (Vite) and backend (Express) concurrently with a single command:
```bash
npm run dev:full
```
*   **Frontend**: `http://localhost:5173`
*   **Backend API**: `http://localhost:3000`
