# Rx-AMR: AI-Augmented Antimicrobial Resistance Risk Assessment

## Project Overview
Antimicrobial Resistance (AMR) is a critical global health challenge. Rx-AMR is a web-based educational platform designed to bridge the gap between complex public health guidelines and everyday patient behavior. It provides users with a transparent, highly personalized risk assessment of their antibiotic habits and delivers clinically grounded biological explanations for why certain behaviors drive resistance.

## Core Features

### Transparent, Rule-Based Risk Engine
Unlike black-box AI diagnostic models, Rx-AMR relies on a strict, rule-based assessment engine. Users complete an interactive questionnaire regarding their antibiotic usage, and their answers are evaluated strictly against verified public-health guidelines from the WHO, ICMR, and CDC. The system outputs a deterministic Composite Risk Index.

### AI-Powered Biological Explanations
Once the rule-based engine determines the risk score, the backend leverages Google's Gemini 2.5 Flash model to generate a comprehensive clinical summary. The AI dynamically explains the biological mechanisms (e.g., mutation, selective pressure, horizontal gene transfer) triggered by the user's specific actions. 

### Strict Clinical Boundaries & Safety
The application is strictly designed as an educational tool, not a diagnostic medical device. 
* The AI is strictly prompted to never name drugs, suggest dosages, or diagnose infections.
* Prominent disclaimers are built into the UI, urging high-risk users to stop self-medicating and consult a registered medical practitioner.

### Premium Editorial Interface
The application features a custom visual design system utilizing a clinical, editorial aesthetic (flat geometry, monospace typography) to create a highly professional user experience that reinforces trust.

## Technology Stack

* **Frontend:** React, Tailwind CSS, Vite, React Router
* **Backend:** Python, FastAPI
* **AI Integration:** Google GenAI SDK (Gemini)
* **Deployment Architecture:** Vercel (Frontend), Render (Backend)

## Local Development Setup

### Prerequisites
* Node.js (v18+)
* Python (3.10+)
* A valid Google Gemini API Key

### Backend Setup
1. Navigate to the backend directory: `cd backend`
2. Create a virtual environment: `python -m venv venv`
3. Activate the virtual environment:
   * Windows: `venv\Scripts\activate`
   * Unix/macOS: `source venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Create a `.env` file in the backend directory and add your API key:
   `GEMINI_API_KEY=your_api_key_here`
6. Run the FastAPI server: `uvicorn app.main:app --reload`
   The backend will be available at `http://localhost:8000`.

### Frontend Setup
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
   The frontend will be available at `http://localhost:5173`. 
   (Note: Vite is configured to proxy API requests to port 8000 automatically during local development).

## Disclaimer
This software is intended for educational purposes only. It is not intended for use in the diagnosis of disease or other conditions, or in the cure, mitigation, treatment, or prevention of disease. Always seek the advice of a physician or other qualified health provider with any questions you may have regarding a medical condition.
