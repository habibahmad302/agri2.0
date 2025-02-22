from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pickle
import traceback
import os

app = Flask(__name__)
CORS(app)

# Load models with absolute paths
model_path = os.path.join(os.path.dirname(__file__), 'model.pkl')
sc_path = os.path.join(os.path.dirname(__file__), 'standscaler.pkl')
ms_path = os.path.join(os.path.dirname(__file__), 'minmaxscaler.pkl')

try:
    model = pickle.load(open(model_path, 'rb'))
    sc = pickle.load(open(sc_path, 'rb'))
    ms = pickle.load(open(ms_path, 'rb'))
except Exception as e:
    print(f"Error loading model files: {str(e)}")
    raise

crop_dict = {
    1: "Rice", 2: "Maize", 3: "Jute", 4: "Cotton", 5: "Coconut",
    6: "Papaya", 7: "Orange", 8: "Apple", 9: "Muskmelon", 10: "Watermelon",
    11: "Grapes", 12: "Mango", 13: "Banana", 14: "Pomegranate", 15: "Lentil",
    16: "Blackgram", 17: "Mungbean", 18: "Mothbeans", 19: "Pigeonpeas",
    20: "Kidneybeans", 21: "Chickpea", 22: "Coffee"
}

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['Nitrogen', 'Phosphorus', 'Potassium',
                          'Temperature', 'Humidity', 'Ph', 'Rainfall']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing field: {field}', 'status': 'error'}), 400

        # Convert to floats
        feature_list = [
            float(data['Nitrogen']),
            float(data['Phosphorus']),
            float(data['Potassium']),
            float(data['Temperature']),
            float(data['Humidity']),
            float(data['Ph']),
            float(data['Rainfall'])
        ]

        # Feature transformation
        single_pred = np.array(feature_list).reshape(1, -1)
        scaled_features = ms.transform(single_pred)
        final_features = sc.transform(scaled_features)

        # Prediction
        prediction = model.predict(final_features)
        crop_id = int(prediction[0])
        crop = crop_dict.get(crop_id, "Unknown Crop")

        return jsonify({
            'prediction': crop_id,
            'crop': crop,
            'status': 'success'
        })

    except Exception as e:
        app.logger.error(f"Prediction error: {str(e)}")
        traceback.print_exc()
        return jsonify({
            'error': f'Prediction failed: {str(e)}',
            'status': 'error'
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy",
        "version": "1.0.0",
        "services": {
            "ml_model": "loaded" if model else "error",
            "scalers": "loaded" if sc and ms else "error"
        }
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)