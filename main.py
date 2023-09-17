import os
import json
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np  # Added to help compute volatility


def compute_average_roi(data):
    """Compute the average ROI."""
    valid_rois = [entry["Daily_ROI"] for entry in data if entry["Daily_ROI"] is not None]

    if not valid_rois:
        return 0  # Return 0 average ROI if no valid ROI entries are found

    total_roi = sum(valid_rois)
    average_roi = total_roi / len(valid_rois)

    return average_roi


def compute_volatility(data):
    """Compute the volatility."""
    valid_rois = [entry["Daily_ROI"] for entry in data if entry["Daily_ROI"] is not None]

    if len(valid_rois) <= 1:
        return 0  # Return 0 volatility if not enough ROI entries are found

    return np.std(valid_rois)


def visualize_data(sorted_tickers, metric):
    """Visualize tickers based on the specified metric (either Average ROI or Volatility)."""
    tickers, values = zip(*sorted_tickers)

    plt.figure(figsize=(10, 6))
    plt.barh(tickers, values, color='skyblue')
    plt.xlabel(metric)
    plt.ylabel('Tickers')
    plt.title(f'{metric} per Ticker')
    plt.gca().invert_yaxis()  # To display the top metric value at the top
    plt.tight_layout()
    plt.show()


def main(directory_path, output_csv_path):
    """Compute metrics for all tickers in the directory, save to CSV and visualize them."""
    ticker_data = {}

    # Iterate through each file in the directory
    for file in os.listdir(directory_path):
        if file.endswith(".json"):
            ticker = file.rstrip(".json")
            file_path = os.path.join(directory_path, file)

            with open(file_path, 'r') as f:
                data = json.load(f)

            roi = compute_average_roi(data)
            volatility = compute_volatility(data)

            ticker_data[ticker] = {"Average_ROI": roi, "Volatility": volatility}

    # Convert to DataFrame and save to CSV
    df = pd.DataFrame.from_dict(ticker_data, orient="index")
    df.reset_index(inplace=True)
    df.rename(columns={"index": "Ticker"}, inplace=True)
    df.to_csv(output_csv_path, index=False)

    # Visualize data
    sorted_by_roi = sorted(ticker_data.items(), key=lambda x: x[1]['Average_ROI'], reverse=True)
    visualize_data([(item[0], item[1]['Average_ROI']) for item in sorted_by_roi], 'Average ROI')

    sorted_by_volatility = sorted(ticker_data.items(), key=lambda x: x[1]['Volatility'], reverse=True)
    visualize_data([(item[0], item[1]['Volatility']) for item in sorted_by_volatility], 'Volatility')


if __name__ == "__main__":
    DIRECTORY_PATH = "/Users/jake/Downloads/Ticker JSON files/"  # Replace with the path to your directory containing the JSON files.
    OUTPUT_CSV_PATH = "/Users/jake/Downloads/Ticker_Metrics.csv"  # Replace with where you'd like the CSV to be saved.

    main(DIRECTORY_PATH, OUTPUT_CSV_PATH)
