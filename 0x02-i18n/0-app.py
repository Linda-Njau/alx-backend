#!/usr/bin/env python3
"""Flask application"""
from flask import Flask, render_template


app = Flask(__name__)


@app.route('/')
def index():
    """Returns index page"""
    return render_template('index.html')
