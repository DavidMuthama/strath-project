// model.js
const { exec } = require('child_process');

function predict(input) {
    return new Promise((resolve, reject) => {
        const inputJson = JSON.stringify(input.value);

        exec(`C:/Users/dmuth/.conda/envs/venv/python.exe predict.py "${inputJson}"`, (error, stdout, stderr) => {
            if (error) {
                reject(`Error executing Python script: ${stderr}`);
                return;
            }
            const prediction = stdout.trim();
            resolve(prediction);
        });
    });
}

module.exports = { predict };