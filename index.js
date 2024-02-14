// index.js

require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require("cors");
const path = require("path");
const fs = require("fs");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Welcome to the Weather API");
});

//Controller for Saving Weather
const saveWeatherData = (req, res) => {
    const newWeatherData = req.body;
    const filePath = path.join(__dirname, "weatherData.json");

    // read previous data
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading weather data file:", err);
            //if there is no info, read empty array.
            data = "[]";
        }

        let weatherData;
        try {
            weatherData = JSON.parse(data);
        } catch (parseError) {
            console.error("Error parsing weather data:", parseError);
            weatherData = [];
        }

        if (!Array.isArray(weatherData)) {
            weatherData = [];
        }

        weatherData.push(newWeatherData);

        // saving only 5 data
        const updatedWeatherData = weatherData.slice(-5);

        // saving updated data
        fs.writeFile(
            filePath,
            JSON.stringify(updatedWeatherData, null, 2),
            (writeErr) => {
                if (writeErr) {
                    console.error(
                        "Error saving weather data to file:",
                        writeErr
                    );
                    return res
                        .status(500)
                        .send({ message: "Failed to save weather data" });
                }
                console.log("Weather data saved to file successfully.");
                res.status(201).send({
                    message: "Weather data saved successfully",
                });
            }
        );
    });
};

app.get("/get-weather", (req, res) => {
    const filePath = path.join(__dirname, "weatherData.json");
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading weather data file:", err);
            return res
                .status(500)
                .send({ message: "Failed to read weather data" });
        }
        res.send(JSON.parse(data));
    });
});

app.post("/save-weather", saveWeatherData);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
