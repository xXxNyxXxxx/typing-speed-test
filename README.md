# ⚡ TypeFlow — Flask Typing Speed Test

> A modern, responsive typing speed and accuracy benchmark web application built with Python (Flask), a third-party random word REST API, vanilla JavaScript, and modern CSS.

![Python](https://img.shields.io/badge/Python-3.13%2B-blue?style=flat-square&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-3.1.0-green?style=flat-square&logo=flask&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)
![Status](https://img.shields.io/badge/Status-Active-success?style=flat-square)

---

## ✨ Features

* **Dynamic Word Generation:** Fetches randomized word sets from an external public REST API (`randomapi.dev`) filtered dynamically by user-selected difficulty modes.
* **Intelligent Fallback System:** Includes built-in offline fallback dictionaries to ensure the app remains fully functional even during network interruptions.
* **Difficulty Modes:** Switch between **Easy** (short words), **Medium** (standard vocabulary), and **Hard** (complex terminology) configurations.
* **Configurable Timers:** Choose between 15-second, 30-second, or 60-second test durations with live updates.
* **Real-Time Character Validation:** Instant visual feedback (green for correct letters, red background highlights for errors, and a live cursor indicator).
* **Persistent Personal Bests:** Uses browser `localStorage` to save and track high scores independently across every unique difficulty and duration combination.
* **Modern UI/UX:** Clean, distraction-free dark mode interface styled with Flexbox, CSS variables, and a collapsible accordion for typing pro-tips.

---

## 🛠️ Tech Stack

* **Backend:** Python, Flask, Requests (WSGI server configured with Gunicorn for production)
* **Frontend:** HTML5, Modern CSS3, Vanilla JavaScript (ES6+)
* **API Integration:** RESTful endpoints with error handling and fallback logic

## ⚙️ Installation & Running Locally

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/yourusername/python-web-watermark-studio.git](https://github.com/yourusername/python-web-watermark-studio.git)
   cd python-web-watermark-studio

2. **Create and activate a virtual environment:**
   ```bash
   python -m venv venv
   On Windows: venv\Scripts\activate
   Mac/Linux: source venv/bin/activate

3. **Install dependencies:**
    ```bash
    pip install -r requirements.txt

4. **Run the application:**
    ```bash
    python app.py
    Open your browser and navigate to http://127.0.0.1:5000 to run the app locally!

---

## 📁 Project Architecture

```text
typing-speed-test/
├── app.py                  # Flask application entry point and API routes
├── config.py               # Application configuration and difficulty constants
├── Procfile                # Production startup command for Render / Heroku
├── requirements.txt        # Python package dependencies
├── services/
│   └── word_service.py     # External API fetching and fallback management
├── static/
│   ├── css/
│   │   └── style.css       # Modern CSS styling and animations
│   └── js/
│       └── app.js          # Client-side timer, typing validation, & localStorage logic
└── templates/
    ├── base.html           # DRY layout base template
    └── index.html          # Main application view


## 📄 License
This project is open-source and available under the MIT License.
    