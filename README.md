# PyREN - The AI Tutor

## 🚀 About the Project

**PyREN (Python for ChildREN)** is an AI-powered Python tutor designed to make learning Python fun, interactive, and engaging for children. This is a **personal side project for learning and exploring the best approaches of AI Integration and learning solutions** is currently **under development**, aiming to provide an intelligent tutor that adapts to users' learning preferences, delivers personalized lessons, and allows real-time execution of Python code.

Whether you're new to Python or looking for a guided learning experience, PyREN is here to assist!

## 🛠️ Tech Stack

PyREN is built with the following technologies:

* **Frontend:** Vite + React (TypeScript)
* **Backend:** Node.js with Express
* **Database:** Supabase
* **AI Integration:** OpenAI API for chat-based tutoring
* **Python Execution:** Pyodide for in-browser Python execution
* **Styling:** Tailwind CSS

## 📂 Project Structure

```
afnan006-pyren-the-ai-tutor/
│── server/                # Backend API
│   └── index.js           # Express server with OpenAI and Supabase integration
│── src/                   # Frontend
│   ├── components/        # Reusable UI components
│   ├── pages/             # App pages (Auth, Home, Learning, Preferences, Profile)
│   ├── lib/               # API and database helpers
│   ├── types/             # Type definitions
│   ├── utils/             # Utility functions
│── supabase/              # Database migrations
│── package.json           # Dependencies and scripts
│── tailwind.config.js     # Tailwind CSS configuration
│── vite.config.ts         # Vite project configuration
│── index.html             # Entry point
└── README.md              # This file
```

## 🌟 Features

✔️ **AI-powered Python tutoring** using OpenAI  
✔️ **Interactive chat** for Python-related questions  
✔️ **Real-time Python execution** using Pyodide  
✔️ **Personalized learning** tailored to user preferences  
✔️ **Progress tracking** with Supabase integration  
✔️ **Modern UI** with a futuristic design

## 📌 Current Status

* ✅ Basic UI setup
* 🔄 AI chat integration using OpenAI API (**In Progress**)
* 🔄 Prompt engineering for better tutoring (**In Progress**)
* ✅ User authentication with Supabase
* ✅ Python code execution in-browser
* 🔄 Lesson customization based on user preferences (**In Progress**)
* 📝 Interactive coding challenges (**Planned**)

## 📦 Installation & Setup

To run this project locally, follow these steps:

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/yourusername/afnan006-pyren-the-ai-tutor.git
cd afnan006-pyren-the-ai-tutor
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Set Up Environment Variables

Create a `.env` file in the project root and add the following:

```ini
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
```

### 4️⃣ Run the Project

**Start the backend server:**

```sh
npm run server
```

**Start the frontend:**

```sh
npm run dev
```

## 👨‍💻 Contributing

This is a **personal hobby project**, but contributions and feedback are welcome. If you find any issues or have feature suggestions, feel free to **open an issue** or **submit a pull request**.

## 📫 Contact

Reach me out for any discussions:
- Email: afnan006cs@gmail.com
- LinkedIn: https://www.linkedin.com/in/afnan006/

## 📜 License

This project is licensed under the **MIT License**.
