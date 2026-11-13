import random
import requests
from config import Config

FALLBACK_WORDS = {
    "easy": ["cat", "dog", "run", "sun", "hat", "pen", "cup", "book", "tree", "bird"],
    "medium": ["python", "code", "server", "branch", "commit", "laptop", "screen", "syntax"],
    "hard": ["algorithm", "asynchronous", "architecture", "repository", "encryption", "framework"]
}

def fetch_random_words(difficulty: str = "medium", count: int = Config.DEFAULT_WORD_COUNT) -> list[str]:
    """Fetches random words filtered by difficulty from the API or falls back safely."""
    diff_config = Config.DIFFICULTIES.get(difficulty, Config.DIFFICULTIES["medium"])
    
    params = {
        "count": count,
        "minLength": diff_config["min_len"],
        "maxLength": diff_config["max_len"],
    }
    try:
        response = requests.get(
            Config.WORD_API_URL,
            params=params,
            timeout=Config.API_TIMEOUT
        )
        response.raise_for_status()
        payload = response.json()
        words = [item["word"].lower() for item in payload.get("data", []) if "word" in item]
        if words:
            return words
    except (requests.RequestException, ValueError, KeyError):
        pass

    fallback_list = FALLBACK_WORDS.get(difficulty, FALLBACK_WORDS["medium"])
    return [random.choice(fallback_list) for _ in range(count)]