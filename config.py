class Config:
    WORD_API_URL = "https://randomapi.dev/api/words"
    DEFAULT_WORD_COUNT = 50
    API_TIMEOUT = 5
    
    # Difficulty settings mapped to min/max word lengths
    DIFFICULTIES = {
        "easy": {"min_len": 3, "max_len": 4},
        "medium": {"min_len": 4, "max_len": 7},
        "hard": {"min_len": 6, "max_len": 12}
    }