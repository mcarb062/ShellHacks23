"""Script to get the list of stocks from the S&P 500"""
def main():
  from bs4 import BeautifulSoup
  import requests
  request = requests.get("https://en.wikipedia.org/wiki/List_of_S%26P_500_companies")
  request = request.text
  request = BeautifulSoup(request,"html.parser")
  names = request.select("td a")
  print(names[0]["class"])
  stock_names = []
  for i in names:
      #if i["class"] == ['external', 'text']:
      #    stock_names.append(i.text)
      try:
          if i["class"] == ['external', 'text']:
              stock_names.append(i.text)
      except:
          continue
  
  import csv
  with open("Stock_names.csv", "w", newline="") as f:
      writer = csv.writer(f)
      header = ["Names"]
      writer.writerow(header)
      for i in range(len(stock_names)):
          row = [stock_names[i]]
          writer.writerow(row)
  print(stock_names)
main()
