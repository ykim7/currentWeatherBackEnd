# Weather API Backend

## Overview

This backend serves as the data management system for the Current Weather App. It provides endpoints to save weather information based on user's current location and fetch saved weather data. Built with Node.js and Express, it supports CORS and stores data in a local JSON file.

## Features

- **Save Weather Data**: Allows the front end to post current weather data, which is then saved in a JSON file.
- **Fetch Weather Data**: Provides the ability to retrieve the last five saved weather data records.
- **CORS Enabled**: Supports cross-origin resource sharing, allowing requests from the front end hosted on different domains or ports.

## Endpoints

- `POST /save-weather`: Receives weather data as JSON and saves it to `weatherData.json`. Only the latest five entries are kept.
- `GET /get-weather`: Returns the latest five saved weather data entries from `weatherData.json`.

## Getting Started

### Installation

Clone the repository and install the dependencies.

```bash
git clone https://github.com/ykim7/CurrentWeatherBackend.git
cd CurrentWeatherBackend
npm install
