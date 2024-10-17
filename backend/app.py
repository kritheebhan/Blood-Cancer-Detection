from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
from PIL import Image
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the model
model = load_model('model/model1.keras')

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        img = Image.open(file.stream)
        img = img.resize((150, 150))
        img_array = np.array(img).astype('float32')
        img_array = np.expand_dims(img_array, axis=0)
        img_array /= 255.0

        prediction = model.predict(img_array)
        predicted_class_index = np.argmax(prediction, axis=1)
        class_labels = ['benign', 'malignant_pre_b', 'malignant_pro_b', 'malignant_early_pre_b']
        predicted_class_label = class_labels[predicted_class_index[0]]

        return jsonify({'predicted_class': predicted_class_label})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
