# Backio

Backio is a personal project I built to experiment with financial backtesting. It's an interactive dashboard that lets you load trading strategies, tweak parameters on the fly, and visualize the results.

![Backtesting Dashboard](assets/image.png)

It uses Backtrader to run the engine and Plotly Dash to show things like equity curves, drawdowns, and detailed performance stats from Pyfolio (Sharpe ratio, CAGR, etc.) in a clean UI.

## Technology Stack

- **Core**: Python 3.7, Flask, Dash
- **Engine**: Backtrader
- **Analysis**: Pandas, Empyrical, Pyfolio
- **Visualization**: Plotly

## Quick Start

1. **Install dependencies**:
   ```bash
   python -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   ```

2. **Run the app**:
   ```bash
   export FLASK_ENV=development
   python main.py
   ```
   Open `http://localhost:5555` in your browser.

## Deployment

The project is set up for Google App Engine. You can deploy it using the GCloud SDK:
```bash
gcloud app deploy --project=backio
```
Note: Basic authentication is active when `debug_mode` is off, using credentials from `app/users.json`.