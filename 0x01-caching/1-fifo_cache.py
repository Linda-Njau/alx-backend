#!/usr/bin/python3
"""FIFOCache class"""

from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """FIFOCache class"""

    def __init__(self):
        """Constructor method."""
        super().__init__()
    
    def put(self, key, item):
        """adds new item to cache"""
        if key and item:
            self.cache_data[key] = item
        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            oldest_key = next(iter(self.cache_data))
            del self.cache_data[oldest_key]
            print("DISCARD {}".format(oldest_key))

    def get(self, key):
        """returns item in cache"""
        return self.cache_data.get(key)
