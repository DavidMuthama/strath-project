# predict.py
import joblib
import sys
import json

# Load the model
model_filename = 'C:/Users/dmuth/Desktop/Dave/strathmore/project/best_optimized_model.pkl'
with open(model_filename, 'rb') as file:
    model = joblib.load(file)

def predict(input_data):
    # Convert input_data from JSON
    input_array = json.loads(input_data)
    prediction = model.predict([input_array])
    return prediction[0]  # Return the prediction

if __name__ == '__main__':
    input_data = sys.argv[1]  # Get input data from command line
    output = predict(input_data)  # Make prediction
    print(output)  # Print output for Node.js to capture