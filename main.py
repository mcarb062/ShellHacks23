import requests
import csv
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from statistics import mean

# Dictionary of company names
company_names = {"AAPL": "Apple",
    "MSFT": "Microsoft",
    "AMZN": "Amazon",
    "GOOGL": "Alphabet",
    "FB": "Meta",
    "JPM": "JPMorgan Chase",
    "TSLA": "Tesla",
    "V": "Visa",
    "JNJ": "Johnson & Johnson",
    "PG": "Procter & Gamble",
    "NVDA": "NVIDIA",
    "BRK.B": "Berkshire Hathaway",
    "HD": "Home Depot",
    "MA": "Mastercard",
    "UNH": "UnitedHealth",
    "VZ": "Verizon",
    "PYPL": "PayPal",
    "DIS": "Disney",
    "CRM": "Salesforce",
    "INTC": "Intel",
    "XOM": "Exxon Mobil",
    "CMCSA": "Comcast",
    "T": "AT&T",
    "WMT": "Walmart",
    "KO": "Coca-Cola",
    "PFE": "Pfizer",
    "MRK": "Merck",
    "CSCO": "Cisco",
    "AAP": "Advance Auto Parts",
    "COST": "Costco",
    "NFLX": "Netflix",
    "CVX": "Chevron",
    "ABT": "Abbott",
    "MCD": "McDonald's",
    "IBM": "IBM",
    "GS": "Goldman Sachs",
    "SBUX": "Starbucks",
}

# Initialize the VADER sentiment analyzer outside the function
analyzer = SentimentIntensityAnalyzer()


def sentiment_analyzer(text):
    """Return the compound sentiment score of a text."""
    sentiment = analyzer.polarity_scores(text)
    return sentiment["compound"]


def get_average_sentiment(company_name):
    url = f"https://newsapi.org/v2/everything?q={company_name}&from=2023-09-15&to=2023-09-15&sortBy=popularity&apiKey=1088c0a9c4294358999d3603d72fda8d"
    response = requests.get(url)

    # Ensure the response is successful
    response.raise_for_status()

    articles = response.json().get("articles", [])

    # Get the sentiment of the descriptions (up to the first 5)
    sentiments = [sentiment_analyzer(article["description"]) for article in articles[:5]]

    # Calculate the average sentiment
    return round(mean(sentiments), 2) if sentiments else None


stock_sentiments = []
for stock, name in company_names.items():
    avg_sentiment = get_average_sentiment(name)
    stock_sentiments.append((stock, avg_sentiment))

# Writing the results to CSV
with open("Stock_sentiment_news_articles.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["Stock Names", "Sentiments"])
    writer.writerows(stock_sentiments)
