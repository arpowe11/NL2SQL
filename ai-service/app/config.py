

from pathlib import Path

# Testing
DEBUG = True
HOST = "127.0.0.1"
PORT = 5001

# Security
CORS_ORIGINS = [
    "https://lunaaiserver-fxhre9fqc0hbenbu.canadacentral-01.azurewebsites.net",
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:5174"
]

# Extra
BASE_DIR = Path(__file__).resolve().parent.parent
TEMPLATES_PATH = BASE_DIR / "app/prompts/prompt.txt"
AI_MODEL = "gpt-4-turbo"
