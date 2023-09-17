"""Script to get the get the news sentiments of some of the top stocks and writes then to a .csv file for easy data processing """
import requests
import csv
company_names = {
    "AAPL": "Apple",
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
stock_names = [company_names[i] for i in company_names]
print(stock_names)
stock_sentiment = []
def sentiment_analyzer(text):
    """This function gives me the sentiment score of a text and returns it on a scale of (1-10). """
    from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
    # Initialize the VADER sentiment analyzer
    analyzer = SentimentIntensityAnalyzer()
    # Analyze sentiment
    sentiment = analyzer.polarity_scores(text)
    # Print the sentiment scores
    #print(sentiment)

    # Determine sentiment based on the compound score
    if sentiment['compound'] >= 0.05:
        print("Positive sentiment")
    elif sentiment['compound'] <= -0.05:
        print("Negative sentiment")
    else:
        print("Neutral sentiment")
    return sentiment["compound"]
def get_average(list):
    return sum(list) / len(list)
def get_description(company_name):
    request = requests.get(f"https://newsapi.org/v2/everything?q={company_name}&from=2023-09-15&to=2023-09-15&sortBy=popularity&apiKey=beb275e043a94edc9a164f30e8beb542")
    description = request.json()["articles"]
    sentiment_list = []
    for i in range(5):
        print(description[i]["description"],sentiment_list.append(sentiment_analyzer(description[i]["description"])))
    print(sentiment_list)
    return format(get_average(sentiment_list), '.2f')
    #for i in range(5):
        #print(description[i]["description"],"->",sentiment_analyzer(i["description"]))
        #print(i[0]["description"],"->",sentiment_analyzer(i[0]["description"]))
for i in stock_names:
    stock_sentiment.append(get_description(i))
stock_names = [i for i in company_names]
with open("Stock_sentiment_news_articles.csv", "w", newline="") as f:
    writer = csv.writer(f)
    header = ["Stock Names", "Sentiments"]
    writer.writerow(header)
    for i in range(len(stock_names)):
        row = [stock_names[i], stock_sentiment[i]]
        writer.writerow(row)






"""
import csv
stock_names = company_names.values()
with open("Stock_names.csv", "w", newline="") as f:
    writer = csv.writer(f)
    header = ["Names","Sentiments","Conclusion"]
    writer.writerow(header)
    for i in range(len(stock_names)):
        row = [stock_names[i]]
        writer.writerow(row)
print(stock_names)
"""


