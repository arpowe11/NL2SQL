from flask import Blueprint, request, jsonify, Response
from .service.LunaAI import LunaAI
from .auth import require_api_key


bp = Blueprint('api', __name__, url_prefix='/api')
luna_ai = None


@bp.route('/', methods=['GET'])
@require_api_key
def index() -> tuple[Response, int]:
    return jsonify({"message": "Welcome to Luna AI!"}), 200


@bp.route('/chat', methods=["POST", "OPTIONS"])
@require_api_key
def get_response() -> tuple[Response, int]:
    if request.method == "OPTIONS":
        return jsonify({}), 204

    global luna_ai
    if luna_ai is None:
        luna_ai = LunaAI()

    try:
        data = request.json
        question = data.get('question')
        session_id = data.get('session_id')

        if not question:
            return jsonify({"error": "Missing 'question' field"}), 400

        if not session_id:
            session_id = "default_id"

        response = luna_ai.executor(question, session_id=session_id)["luna"]

        return jsonify({"response": response}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 400
