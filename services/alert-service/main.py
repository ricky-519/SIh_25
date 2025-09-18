from flask import Flask, jsonify, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app) # This will enable CORS for all routes

@app.route('/alerts', methods=['GET'])
def get_alerts():
    # In a real application, this would involve fetching data from
    # weather APIs, vessel tracking systems, etc.
    alerts = [
        {
            "id": 1,
            "type": "Weather",
            "severity": "Red",
            "message": "Warning: Rough seas in Bay of Bengal, avoid fishing for next 24 hrs."
        },
        {
            "id": 2,
            "type": "Border",
            "severity": "Orange",
            "message": "3 vessels breached India–Sri Lanka border at 02:15 AM."
        }
    ]
    return jsonify(alerts)

@app.route('/sos', methods=['POST'])
def post_sos():
    report = request.get_json()
    print("Received SOS Report:")
    # Pretty print the JSON
    print(json.dumps(report, indent=2))
    return jsonify({"status": "success", "message": "SOS report received"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)
