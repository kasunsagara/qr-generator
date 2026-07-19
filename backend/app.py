from flask import Flask, request, send_file
from flask_cors import CORS
import qrcode
import os
import json

app = Flask(__name__)
CORS(app)

QR_FOLDER = "generated"

os.makedirs(QR_FOLDER, exist_ok=True)

@app.route("/")
def home():
    return {
        "message": "QR Generator API Running"
    }

@app.route("/generate", methods=["POST"])
def generate_qr():
    payload = request.get_json(silent=True)
    if not payload or "data" not in payload:
        return {
            "error": "No data provided"
        }, 400

    content = payload["data"]
    if isinstance(content, (dict, list)):
        content = json.dumps(content, ensure_ascii=False)

    if not isinstance(content, str):
        content = str(content)

    if not content.strip():
        return {
            "error": "No data provided"
        }, 400

    file_path = os.path.join(QR_FOLDER, "qr.png")
    qr = qrcode.make(content)
    qr.save(file_path)

    return send_file(
        file_path,
        mimetype="image/png"
    )

if __name__ == "__main__":
    app.run(debug=True)
