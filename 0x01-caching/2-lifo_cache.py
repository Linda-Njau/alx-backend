#!/usr/bin/python3
"""LIFOCache Class"""

from base_caching import BaseCaching
from collections import deque


class LIFOCache(BaseCaching):
    """LIFO caching system."""

    def __init__(self):
        """Constructor for LIFO caching"""
        super().__init__()

    def put(self, key, item):
        """add an item to the cache according to LIFO"""
        if key is None or item is None:
            pass
        else:
            self.cache_data[key] = item
        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            self.cache_data.pop(self.last_key)
            print("DISCARD: {}".format(self.last_key))

        if key:
            self.last_key = key

    def get(self, key):
        """Returns item in cache"""
        return self.cache_data.get(key)
