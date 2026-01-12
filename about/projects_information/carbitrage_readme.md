
README.md



# Carbitrage
Carbitrage is a comprehensive system designed for car price analysis and arbitrage detection. It monitors various car marketplaces, processes the data to identify market trends, and visualizes the results through an interactive dashboard to help users find the best deals.
## System Architecture
The project follows a modular architecture distributed across four specialized repositories, leveraging Google Cloud Platform for scalability and data processing:
1.  **Data Acquisition**: Web crawlers scrape car listings and send raw data to a Pub/Sub topic.
2.  **Infrastructure**: Managed via Terraform to ensure consistent and reproducible GCP environments.
3.  **Data Processing**: Cloud Functions consume raw data from Pub/Sub, clean it, and store it in Firestore.
4.  **Machine Learning**: Analysis and model training are conducted in Jupyter notebooks to understand price determinants and predict fair market values.
5.  **Visualization**: A web dashboard provides an interface to explore price trends and identify outliers (potential arbitrage opportunities).
## Project Repositories
### [carbitrage-data](file:///Users/reyes/projects/personal/carbitrage/carbitrage-data)
Responsible for the data lifecycle, from ingestion to storage.
- **Acquisition**: Scrapy-based crawlers for various car listing websites.
- **Pipes**: Cloud Functions that serve as data pipelines, handling Pub/Sub messages and Firestore interactions.
- **Flows**: Automated workflows for processing and updating ad status.
### [carbitrage-infra](file:///Users/reyes/projects/personal/carbitrage/carbitrage-infra)
Contains the Infrastructure as Code (IaC) definitions.
- Uses **Terraform** to manage GCP resources including Pub/Sub topics, Cloud Scheduler jobs, Firestore, App Engine, and storage buckets.
### [carbitrage-research](file:///Users/reyes/projects/personal/carbitrage/carbitrage-research)
The analytical core of the project.
- Features **Jupyter Notebooks** for feature analysis, linear regression, and gradient boosting (CatBoost).
- Explores relationships between car attributes (mileage, year, power) and market price.
### [carbitrage-server](file:///Users/reyes/projects/personal/carbitrage/carbitrage-server)
The frontend application for end-users.
- Built with **Plotly Dash** and **Flask**.
- Provides interactive charts and filtering options to visualize car listings and highlight "best deals" based on research models.
## Tech Stack
- **Languages**: Python
- **Cloud (GCP)**: Pub/Sub, Cloud Functions, Firestore, App Engine, Cloud Scheduler
- **Data Engineering**: Scrapy, Pandas
- **Machine Learning**: CatBoost, Statsmodels, Scikit-learn
- **Infrastructure**: Terraform
- **Frontend/Visualization**: Plotly Dash, Flask