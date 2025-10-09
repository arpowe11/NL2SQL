from functools import wraps
from flask import request, jsonify
from dotenv import load_dotenv, find_dotenv

import os

load_dotenv(find_dotenv())
API_KEY = os.getenv("INTERNAL_API_KEY")

def require_api_key(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if request.method == "OPTIONS":
            return "", 204

        key = request.headers.get("Authorization")
        if key is None or key != f"Bearer {API_KEY}":
            return jsonify({"error": "Unauthorized, No key provided"}), 401
        return f(*args, **kwargs)
    return decorated
