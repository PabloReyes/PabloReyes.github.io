# Lyric Cloud

Lyric Cloud is a web application that generates dynamic word clouds where word size is determined by frequency. Originally designed to analyze song lyrics, it features a built-in author search and a flexible data schema that can be adapted to various text sources.

> [!WARNING]
> **Legacy Project:** The original web scraping scripts used to collect lyrics have been lost. This repository is for archival purposes only.

![Lyric Cloud Example](examples/ywdy/ywdy-example.png)

## Technical Stack

The project uses a stack consisting of Node.js with Express (v3.0), MongoDB (v3.0) via Mongoose, and a frontend built with AngularJS and Jade. Transitions and visualizations are handled by D3.js, with styling processed through Less.

## Getting Started

### Prerequisites
* Node.js (v0.12 or compatible)
* MongoDB (v3.0 or compatible)

### Installation and Setup
1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Ensure MongoDB is running. Connection settings can be adjusted in `config/dev.js` and `config/global.js` (default is `localhost:27017/test`).
3. Start the application:
   ```bash
   node app.js
   ```
4. Access the interface at `http://localhost:8000`.

## License

This project is released under the [MIT License](https://opensource.org/licenses/MIT).
