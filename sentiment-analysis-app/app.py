from flask import Flask, render_template, request, jsonify, send_from_directory
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer

app = Flask(__name__)

# Download necessary NLTK data
nltk.download('vader_lexicon')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    text = request.json['text']
    sia = SentimentIntensityAnalyzer()
    sentiment_scores = sia.polarity_scores(text)
    
    if sentiment_scores['compound'] > 0.05:
        sentiment = 'Positive'
    elif sentiment_scores['compound'] < -0.05:
        sentiment = 'Negative'
    else:
        sentiment = 'Neutral'
    
    return jsonify({
        'sentiment': sentiment,
        'score': sentiment_scores['compound']
    })

@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static', path)

if __name__ == '__main__':
    app.run(debug=True)