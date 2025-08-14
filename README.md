# 🎨 SmartDraw AI-powered Calculator

A powerful AI-powered calculator that solves mathematical expressions, equations, and analyzes graphical problems through hand-drawn input. Built with React frontend and Node.js backend, powered by Google's Gemini AI.

## ✨ Features

- **🎨 Interactive Drawing Canvas**: Draw mathematical expressions, equations, and diagrams with multiple colors
- **🧠 AI-Powered Analysis**: Uses Google Gemini AI to interpret and solve drawn content
- **📐 Multiple Problem Types**:
  - Simple mathematical expressions (2 + 3 \* 4)
  - Complex equations (x² + 2x + 1 = 0)
  - Variable assignments (x = 4, y = 5)
  - Graphical math problems (geometry, physics diagrams)
  - Abstract concept analysis
- **🎯 Smart Variable Management**: Define and use variables across calculations
- **📱 Responsive Design**: Modern, intuitive interface with drag-and-drop results
- **🔄 Real-time Processing**: Instant AI analysis with visual feedback

## 🚀 Live Demo

[Coming Soon - Deploy your project to see it in action!]

## 🛠️ Tech Stack

### Frontend

- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Draggable** - Drag and drop functionality
- **React KaTeX** - Mathematical expression rendering
- **Axios** - HTTP client for API calls

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Google Generative AI** - Gemini 2.5 Flash model
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Google Gemini API key

## 🔧 Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/smartdraw-calculator.git
cd smartdraw-calculator
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
ALLOWED_ORIGIN=http://localhost:5173
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory:

```env
VITE_BASE_API=http://localhost:8080
```

## 🚀 Running the Application

### Start Backend

```bash
cd backend
npm start
# or for development with auto-restart
npm run dev
```

### Start Frontend

```bash
cd frontend
npm run dev
```

The application will be available at:

- Frontend: http://localhost:5173
- Backend: http://localhost:8080

## 📖 Usage

### 1. **Drawing Mode**

- Select a color from the color palette
- Draw mathematical expressions, equations, or diagrams on the canvas
- Use different colors to highlight different parts of your problem

### 2. **Variable Assignment** (Optional)

- Define variables like `x = 5` or `y = 10` before drawing
- These variables will be used in subsequent calculations

### 3. **AI Analysis**

- Click the "Analyze" button to process your drawing
- The AI will interpret your drawing and provide solutions
- Results appear as draggable cards on the canvas

### 4. **Result Management**

- Drag result cards around the canvas
- Results are automatically categorized (Calculation, Assignment, Analysis, etc.)
- Click "Reset" to clear the canvas and start over

## 🔌 API Endpoints

### POST `/api/calculate`

Analyzes a drawn image and returns mathematical results.

**Request Body:**

```json
{
  "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
  "variables": {
    "x": "5",
    "y": "10"
  }
}
```

**Response:**

```json
{
  "ok": true,
  "data": [
    {
      "expr": "2 + 3 * 4",
      "result": "14"
    }
  ]
}
```

## 🎯 Supported Problem Types

| Type            | Example             | Output Format                                              |
| --------------- | ------------------- | ---------------------------------------------------------- |
| **Simple Math** | `2 + 3 * 4`         | `{"expr": "2 + 3 * 4", "result": "14"}`                    |
| **Equations**   | `x² + 2x + 1 = 0`   | `{"expr": "x", "result": "-1", "assign": true}`            |
| **Assignments** | `x = 5`             | `{"expr": "x", "result": "5", "assign": true}`             |
| **Graphical**   | Geometry diagrams   | `{"expr": "Area of triangle", "result": "24 cm²"}`         |
| **Abstract**    | Conceptual drawings | `{"expr": "Drawing represents", "result": "Love concept"}` |

## 🔒 Environment Variables

### Backend (.env)

```env
GEMINI_API_KEY=your_gemini_api_key_here
ALLOWED_ORIGIN=http://localhost:5173,https://yourdomain.com
```

### Frontend (.env)

```env
VITE_BASE_API=http://localhost:8080
```

## 🏗️ Project Structure

```
SmartDraw-Calculator/
├── backend/
│   ├── index.js              # Express server setup
│   ├── lib/
│   │   └── gemini.js         # Gemini AI integration
│   ├── routes/
│   │   └── calculate.js      # API endpoints
│   ├── utils/
│   │   └── parseDataUrl.js   # Image parsing utilities
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CanvasBoard.jsx    # Drawing canvas
│   │   │   ├── Controls.jsx       # UI controls
│   │   │   └── ResultsOverlay.jsx # Results display
│   │   ├── App.jsx                # Main application
│   │   └── api.js                 # API client
│   ├── index.html
│   └── package.json
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [Google Gemini AI](https://ai.google.dev/) for powerful AI capabilities
- [React](https://reactjs.org/) for the amazing frontend framework
- [Tailwind CSS](https://tailwindcss.com/) for beautiful styling
- [KaTeX](https://katex.org/) for mathematical expression rendering

## 📞 Support

If you have any questions or need help:

- Open an [issue](https://github.com/yourusername/smartdraw-calculator/issues)

---

⭐ **Star this repository if you find it helpful!**
