import logging
import traceback
import requests
import json

from django.http import HttpResponse
from django.shortcuts import render ,redirect
from django.conf import settings as constants
BASE_URL = constants.BASE_URL


def create_candidate(request):
    return render(request, 'candidate/create_candidate.html')

def show_candidate(request):
    if request.method == 'GET':
        try:
            context = {}

            headers = {'Content-Type': 'application/json', 'Accept': 'application/json'}
            resp = requests.get(BASE_URL + "/candidateapi/candidate/",
                                #data=json.dumps(payload),
                                headers=headers,
                                cookies=request.COOKIES)
            data = json.loads(resp.content)
            context['candidates'] = data['data']

            return render(request, 'candidate/show_candidate.html', context)
        except Exception as e:
            logging.info("Class name: %s - Error = %s:" % ('User Login Web App View', str(e)))
            logging.info(traceback.format_exc())
            return HttpResponse(str(e))

