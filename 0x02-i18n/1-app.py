#!/usr/bin/env python3
"""Flask application"""


from flask import Flask, render_template
from flask_babel import Babel


app = Flask(__name__)
babel = Babel(app)


class Config(object):
    """Config for babel"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app.config.from_object('1-app.Config')


@app.route('/', methods=['GET'], strict_slashes=False)
def index():
    """Returns the index page"""
    return render_template('1-index.html')
