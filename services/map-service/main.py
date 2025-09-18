from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # This will enable CORS for all routes

@app.route('/map/data', methods=['GET'])
def get_map_data():
    # In a real application, this would involve complex geospatial
    # queries and data processing.
    map_data = {
        "eez_boundaries": [
            {"name": "India-Sri Lanka", "path": "..."}
        ],
        "fish_hotspots": [
            {"species": "Tuna", "location": [10.1, 80.2], "intensity": 0.8}
        ],
        "leave_it_zones": [
            {"name": "Sardine Spawning Ground", "area": "..."}
        ]
    }
    return jsonify(map_data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5003)
