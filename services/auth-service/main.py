from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # This will enable CORS for all routes

@app.route('/auth/user', methods=['GET'])
def get_user():
    # In a real application, this would involve a database lookup
    # and proper session management.
    user_data = {
        "id": 1,
        "name": "Demo User",
        "language_preference": "en"
    }
    return jsonify(user_data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
