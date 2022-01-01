import random
import requests

msgs = ['Se cuidem!','Não esqueça da mascara','Vacina salva vidas','Evite aglomerações']


toSent = random.choice(msgs)

requests.get(f'http://localhost:1880/postCovid?texto={toSent}')
