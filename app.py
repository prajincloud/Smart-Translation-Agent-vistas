from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from googletrans import Translator

app = Flask(__name__)
CORS(app)

translator = Translator()

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/translate", methods=["POST"])
def translate_text():
    data = request.get_json()
    text = data["text"]
    target_lang = data["language"]

    translated = translator.translate(text, dest=target_lang)

    return jsonify({
        "translatedText": translated.text
    })

if __name__ == "__main__":
    app.run(debug=True)