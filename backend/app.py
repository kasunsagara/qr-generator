from flask import Flask, request, send_file
from flask_cors import CORS
import qrcode
import os

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

    data = request.json.get("data")

    if not data:
        return {
            "error": "No data provided"
        }, 400


    file_path = os.path.join(QR_FOLDER, "qr.png")

    qr = qrcode.make(data)

    qr.save(file_path)


    return send_file(
        file_path,
        mimetype="image/png"
    )


if __name__ == "__main__":
    app.run(debug=True)