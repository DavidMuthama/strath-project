// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const labels = [
        "MonsoonIntensity", "TopographyDrainage", "RiverManagement", "Deforestation", "Urbanization",
        "ClimateChange", "DamsQuality", "Siltation", "AgriculturalPractices", "Encroachments",
        "IneffectiveDisasterPreparedness", "Landslides", "Watersheds", "DeterioratingInfrastructure", "PopulationScore",
        "WetlandLoss", "InadequatePlanning", "PoliticalFactors", "DrainageSystems", "CoastalVulnerability"
    ];
    const [inputs, setInputs] = useState(Array(20).fill('')); // Array of 20 inputs
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState('');

    const handleChange = (index, value) => {
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setPrediction(null);

        const inputData = inputs.join(',');

        try {
            const response = await axios.post('http://localhost:5000/predict', {
                value: Array(inputData)
            });
            setPrediction(response.data.prediction);
        } catch (err) {
            setError('An error occurred while fetching the prediction.');
        }
    };

    return (
            <div className="app-container">
                <h1>Welcome to the flood predictor. Kindly input your details below and we'll evaluate</h1>
                <form onSubmit={handleSubmit} className="form">
                    <div className="input-group">
                        <div className="input-column">
                            {inputs.slice(0, 10).map((input, index) => (
                                <div key={index}>
                                <label>{labels[index]}</label>
                                <input
                                    type="number"
                                    value={input}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    placeholder={`Enter ${labels[index]}`}
                                    required
                                />
                            </div>
                            ))}
                        </div>
                        <div className="input-column">
                            {inputs.slice(10, 20).map((input, index) => (
                                <div key={index + 10}>
                                    <label>{labels[index + 10]}</label>
                                    <input
                                        type="number"
                                        value={input}
                                        onChange={(e) => handleChange(index + 10, e.target.value)}
                                        placeholder={`Enter ${labels[index + 10]}`}
                                        required
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <button type="submit">Submit</button>
                </form>
                {prediction !== null && <h2>Prediction: {prediction}</h2>}
                {error && <h2 style={{ color: 'red' }}>{error}</h2>}
            </div>  
    );
};

export default App;
