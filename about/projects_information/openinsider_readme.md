# OpenInsider

OpenInsider is an automated tool designed to retrieve, parse, and store insider trading information from the Spanish CNMV (Comisión Nacional del Mercado de Valores). 

## Project Overview

The system runs a daily process that scrapes the CNMV website for new insider trading notifications. These notifications are then parsed to extract detailed information about:
- **Insiders**: The individuals or companies conducting the trades.
- **Issuers**: The companies whose stock is being traded.
- **Transactions**: Details of the trading operations, including dates, volumes, and prices.

The extracted data is stored in a structured database, enabling further analysis and visualization of insider trading trends in the Spanish market.

## Tech Stack
- **Python**: Core logic and scraping.
- **Scrapy**: Web scraping and data extraction.
- **PostgreSQL**: Structured data storage.
- **Docker**: Containerized deployment for daily runs.
