from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/get_app")
def get_app():
    return 1

if __name__ == "__main__":
    app.run(debug=True)


