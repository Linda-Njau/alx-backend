#!/usr/bin/env python3
"""Function definiton for index_range"""

from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """returns tuple of size two containing a start anf end index"""
    return ((page - 1) * page_size, page * page_size)
