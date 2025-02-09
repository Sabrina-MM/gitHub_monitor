# Inicializa la aplicacion Flask y configura extensiones como CORS

from flask import Flask
from flask_cors import CORS


def create_app():
    app = Flask(__name__)
    CORS(app)

    from routes.api import api_bp
    app.register_blueprint(api_bp, url_prefix='/api')


    return app