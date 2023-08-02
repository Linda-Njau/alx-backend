#!/usr/bin/env python3
"""flask application"""
from flask import Flask, render_template, request
from flask_babel import Babel


app = Flask(__name__)
babel = Babel(app)


class Config(object):
    """Config class"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app.config.from_object('2-app.Config')


@app.route("/")
def index():
    """Returns index page"""
    return render_template('2-index.html')


@babel.localeselector
def get_locale():
    """Returns best available language"""
    return request.accept_languages.best_match(app.Config['LANGUAGES'])
