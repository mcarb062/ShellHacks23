import pandas as pd
import requests
from bs4 import BeautifulSoup


def get_sp500_tickers():
    # Use Wikipedia to get S&P 500 tickers
    table = pd.read_html('https://en.wikipedia.org/wiki/List_of_S%26P_500_companies')[0]
    tickers = table['Symbol'].tolist()
    return tickers


def get_esg_data(ticker):
    url = f'https://finance.yahoo.com/quote/{ticker}/sustainability?p={ticker}'
    headers = {'User-Agent': 'Mozilla/5.0'}
    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        print(f"Failed to fetch data for {ticker}")
        return "N/A"

    soup = BeautifulSoup(response.content, 'html.parser')
    esg_data = soup.find("div", {"class": "Fz(36px) Fw(600) D(ib) Mend(5px)"})

    if esg_data:
        return esg_data.text
    else:
        return "N/A"


def main():
    tickers = get_sp500_tickers()

    # Creating an empty DataFrame
    esg_data_df = pd.DataFrame(columns=["Ticker", "ESG_Score"])

    for ticker in tickers:
        print(f"Fetching ESG data for {ticker}")

        # Get ESG data for the ticker
        esg_score = get_esg_data(ticker)

        # Append to the DataFrame
        esg_data_df.loc[len(esg_data_df)] = [ticker, esg_score]

    # Save the DataFrame to a CSV
    esg_data_df.to_csv("esg_scores.csv", index=False)
    print("ESG data saved to esg_scores.csv")


if __name__ == "__main__":
    main()

