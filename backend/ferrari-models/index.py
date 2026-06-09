import json
import random

FERRARI_MODELS = [
    {"model": "SF-90 Stradale", "year": 2023, "hp": 1000, "category": "Hypercar", "engine": "V8 Hybrid"},
    {"model": "Roma Spider", "year": 2024, "hp": 612, "category": "Gran Turismo", "engine": "V8 Turbo"},
    {"model": "Purosangue", "year": 2024, "hp": 725, "category": "Sport Utility", "engine": "V12"},
    {"model": "296 GTB", "year": 2023, "hp": 830, "category": "Berlinetta", "engine": "V6 Hybrid"},
    {"model": "812 Competizione", "year": 2022, "hp": 830, "category": "Supercar", "engine": "V12"},
    {"model": "F8 Tributo", "year": 2022, "hp": 710, "category": "Berlinetta", "engine": "V8 Turbo"},
    {"model": "Portofino M", "year": 2023, "hp": 620, "category": "Convertible", "engine": "V8 Turbo"},
    {"model": "SF90 Spider", "year": 2023, "hp": 1000, "category": "Hypercar", "engine": "V8 Hybrid"},
    {"model": "LaFerrari Aperta", "year": 2016, "hp": 963, "category": "Limited Edition", "engine": "V12 Hybrid"},
    {"model": "Enzo Ferrari", "year": 2004, "hp": 660, "category": "Legend", "engine": "V12"},
    {"model": "Testarossa", "year": 1991, "hp": 428, "category": "Classic", "engine": "Flat-12"},
    {"model": "F40", "year": 1992, "hp": 478, "category": "Legend", "engine": "V8 Turbo"},
    {"model": "488 Pista", "year": 2020, "hp": 720, "category": "Track", "engine": "V8 Turbo"},
    {"model": "GTC4Lusso", "year": 2020, "hp": 690, "category": "GT", "engine": "V12"},
    {"model": "California T", "year": 2017, "hp": 560, "category": "Convertible", "engine": "V8 Turbo"},
]


def handler(event: dict, context) -> dict:
    """Returns a random selection of Ferrari car models."""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    count = int((event.get('queryStringParameters') or {}).get('count', 3))
    count = min(max(count, 1), len(FERRARI_MODELS))
    selected = random.sample(FERRARI_MODELS, count)

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        'body': json.dumps({'models': selected, 'total': len(FERRARI_MODELS)})
    }
