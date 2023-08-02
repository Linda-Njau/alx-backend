#!/usr/bin/env python3
"""Flask application"""
from flask import Flask, render_template


app = Flask(__name__)


@app.route('/', methods=['GET'], strict_slashes=False)
def index():
    """Returns index page"""
    return render_template('0-index.html')
