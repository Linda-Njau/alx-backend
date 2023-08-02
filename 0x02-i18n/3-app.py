from flask import Flask, render_template, request
from flask_babel import Babel

app = Flask(__name__)
babel = Babel(app)

class Config(object):
    LANGUAGES = ['en', 'fr']
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"
    
app.config.from_object('3-app.Config')
    
@app.route("/")
def index():
    return render_template("3-index.html")

@babel.localeselector
def get_locale():
    return request.accept_languages.best_match(app.Config['LANGUAGES'])
