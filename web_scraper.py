import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
path = "/usr/local/bin/chromedriver"
service = ChromeService(executable_path=path)
driver = webdriver.Chrome(service=service)
driver.maximize_window()
#driver.get("https://apnews.com/")
driver.get("https://cnbc.com")

button = driver.find_element(by=By.CLASS_NAME,value="SearchToggle-button.SearchToggle-signinButtonBtn.searchToggler.analyticsSearchButton")
#driver.implicitly_wait(15)
button.click()
search = driver.find_element(by=By.CLASS_NAME,value="SearchEntry-suggestNotActiveInput.SearchEntry-searchInput.SearchEntry-query")
driver.implicitly_wait(5)
search.send_keys("Disney news")
search.send_keys(Keys.ENTER)
#titles = driver.find_elements(by=By.CLASS_NAME,value="Card-title")
#driver.implicitly_wait(5)
