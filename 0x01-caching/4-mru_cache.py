#!/usr/bin/python3
"""MRUCache Class"""

from base_caching import BaseCaching


class MRUCache(BaseCaching):
    """MRU caching system."""

    def __init__(self):
        """Initialize the MRUCache"""
        super().__init__()
        self.order = []

    def update_order(self, key):
        """Update the order list when accessing or adding a key"""
        if key in self.order:
            self.order.remove(key)
        self.order.append(key)

    def put(self, key, item):
        """Add an item to the cache according to MRU"""
        if key is None or item is None:
            return

        self.cache_data[key] = item
        self.update_order(key)

        if len(self.cache_data) > self.MAX_ITEMS:
            mru_key = self.order.pop()
            del self.cache_data[mru_key]
            print("DISCARD:", mru_key)

    def get(self, key):
        """Get an item from the cache"""
        if key is None or key not in self.cache_data:
            return None

        self.update_order(key)
        return self.cache_data[key]
