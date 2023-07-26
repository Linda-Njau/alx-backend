#!/usr/bin/python3
"""Basic Cache class"""

from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """Basic Cache class"""

    def put(self, key, item):
        """ puts new item in cache"""
        if key is None or item is None:
            pass

    def get(self, key):
        """ gets item in cache"""
        return self.cache_data.get(key)
