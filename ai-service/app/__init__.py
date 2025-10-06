from flask import Flask
from flask_cors import CORS


def create_app() -> Flask:

    # Create Flask app
    app = Flask(__name__)
    app.config.from_object("app.config")  # Turns your config into a dict

    # Enable CORS
    origins = app.config["CORS_ORIGINS"]
    CORS(
        app=app,
        resources={r"/api/*": {"origins": origins}},
        supports_credentials=True,
        allow_headers=["Content-Type", "Authorization"],
    )

    # Register your blueprints
    from .routes import bp
    app.register_blueprint(bp)

    return app
