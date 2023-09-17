import pandas as pd
import os

directory = '/Users/jake/Downloads/AdjustedSustainabilityCSVs'  # Please replace this with the path to your directory containing the CSV files

# Step 1: Reading CSV Files
roi_df = pd.read_csv(os.path.join(directory, 'average_roiRev.csv'))          # Assuming columns: 'Ticker', 'average_roi'
esg_df = pd.read_csv(os.path.join(directory, 'average_esgRev.csv'))          # Assuming columns: 'Ticker', 'esg_score'
volatility_df = pd.read_csv(os.path.join(directory, 'average_volatilityRev.csv'))  # Assuming columns: 'Ticker', 'average_volatility'
sentiment_df = pd.read_csv(os.path.join(directory, 'average_sentimentRev.csv'))   # Assuming columns: 'Ticker', 'sentiment_score'

# Merge dataframes on 'Ticker'
merged_df = roi_df.merge(esg_df, on='Ticker').merge(volatility_df, on='Ticker').merge(sentiment_df, on='Ticker')

# Step 2: Normalize the Data

# Normalize ROI (Expected between 0-0.1)
merged_df['normalized_roi'] = (merged_df['average_roi'] - 0) / (0.1 - 0)

# Normalize ESG (Expected between 0-30)
merged_df['normalized_esg'] = (merged_df['esg_score'] - 0) / (30 - 0)

# Normalize Volatility (Expected between 0-5% or 0-0.05)
merged_df['normalized_volatility'] = (merged_df['average_volatility'] - 0) / (0.05 - 0)

# Normalize Sentiment (Expected between -1 and 1)
merged_df['normalized_sentiment'] = (merged_df['sentiment_score'] + 1) / 2  # Convert to 0 to 1 scale

# Step 3: Compute Adjusted Sustainability Metric
merged_df['Adjusted_Sustainability_Metric'] = (
    0.40 * merged_df['normalized_roi'] +
    0.25 * merged_df['normalized_esg'] +
    0.20 * merged_df['normalized_volatility'] +
    0.15 * merged_df['normalized_sentiment']
)

# Select the columns to save to the final CSV
final_df = merged_df[['Ticker', 'Adjusted_Sustainability_Metric']]

# Step 4: Write to CSV
final_df.to_csv(os.path.join(directory, 'adjusted_sustainability_metric.csv'), index=False)