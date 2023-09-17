function DescriptionBox() {
    const boxStyle = {
        border: '1px solid #ddd',
        padding: '20px',
        borderRadius: '5px',
        marginBottom: '20px',
        backgroundColor: '#f9f9f9',
    };

    const titleStyle = {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '10px',
    };

    const weightStyle = {
        color: '#333',
        fontWeight: 'bold',
        marginBottom: '5px',
    };

    const explanationStyle = {
        marginBottom: '15px',
    };

    return (
        <div style={boxStyle}>
            <div style={titleStyle}>ROI (Return on Investment): 40% Weight</div>
            <p style={explanationStyle}>ROI is the most direct metric to gauge the profitability of an investment. Investors seek returns on their investments. A higher ROI suggests that the investment is sound from a profitability standpoint. This weight is the highest among all the factors, indicating that while sustainability is essential, profitability remains a top concern for most investors. Allocating 40% acknowledges this reality while leaving room for other critical sustainability metrics.
</p>

            <div style={titleStyle}>ESG Scores (Environmental, Social, and Governance): 25% Weight</div>
            <p style={explanationStyle}>ESG scores are increasingly becoming a benchmark for measuring the sustainability and ethical implications of an investment. As societal and environmental concerns have risen, many institutional investors are prioritizing ESG factors. These scores encapsulate a company's performance across three critical areas: environmental impact, social responsibility, and governance practices. A higher weight signifies that while profitability is essential, ethical and sustainable practices cannot be overlooked. The 30% allocation balances this factor with ROI, showing a strong commitment to sustainable investing without overshadowing profitability.
</p>

            <div style={titleStyle}>Volatility: 20% Weight</div>
            <p style={explanationStyle}>Volatility, as a measure of risk, provides insight into the stability of an investment. A more volatile stock might offer high returns but can also be riskier. For a sustainability-focused portfolio, a balance between risk and return is desirable. By assigning 15% weight to volatility, the model suggests a moderate emphasis on stability. An investment with less volatility might be deemed more "sustainable" because it suggests consistent performance and less susceptibility to market shocks.
</p>

            <div style={titleStyle}>Sentiment (from news articles): 15% Weight</div>
            <p style={explanationStyle}>DSentiment analysis offers a different kind of insight, one that's often more immediate and reactive than structured metrics like ROI or ESG scores. Sentiment reflects public perception, which can influence stock prices and predict potential reputational risks. Given the fast-paced nature of news and the occasional volatility of public sentiment, this factor is weighted the same as volatility. While it offers valuable insights, it's also subject to rapid change based on news cycles.

</p>
        </div>
    );
}
export default DescriptionBox;
