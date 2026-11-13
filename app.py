from flask import Flask, jsonify, render_template, request
from config import Config
from services.word_service import fetch_random_words

app = Flask(__name__)
app.config.from_object(Config)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/words", methods=["GET"])
def get_words():
    difficulty = request.args.get("difficulty", default="medium", type=str)
    count = request.args.get("count", default=Config.DEFAULT_WORD_COUNT, type=int)
    count = max(10, min(count, 100))
    
    words = fetch_random_words(difficulty=difficulty, count=count)
    return jsonify({"words": words})

if __name__ == "__main__":
    app.run(debug=True)