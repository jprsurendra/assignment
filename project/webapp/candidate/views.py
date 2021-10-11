import logging
import traceback
import requests
import json

from django.http import HttpResponse
from django.shortcuts import render ,redirect
from django.conf import settings as constants
from django.views.generic import TemplateView

BASE_URL = constants.BASE_URL


def create_candidate(request):
    if request.method == 'GET':
        try:
            context = {}
            context['candidate'] = None
            context['city_list'] = None
            context['candidate_country_id'] = None

            headers = {'Content-Type': 'application/json', 'Accept': 'application/json'}
            resp = requests.get(BASE_URL + "/commonapi/country/",
                                # data=json.dumps(payload),
                                headers=headers,
                                cookies=request.COOKIES)
            data = json.loads(resp.content)
            context['country_list'] = data['data']

            return render(request, 'candidate/create_candidate.html', context)
        except Exception as e:
            logging.info("Source:webapp/candidate/views.py  Method: create_candidate() - Error = %s:" % (str(e)))
            logging.info(traceback.format_exc())
            return HttpResponse(str(e))

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
            logging.info("Source:webapp/candidate/views.py  Method: show_candidate() - Error = %s:" % (str(e)))
            logging.info(traceback.format_exc())
            return HttpResponse(str(e))


class CandidateDetail(TemplateView):
    template_name = 'candidate/create_candidate.html'

    def dispatch(self, *args, **kwargs):
        return super(CandidateDetail, self).dispatch(*args, **kwargs)

    def get_context_data(self, *args, **kwargs):
        context = super(CandidateDetail, self).get_context_data(*args, **kwargs)
        candidate_id = kwargs['candidate_id']
        headers = {'Content-Type': 'application/json', 'Accept': 'application/json'}
        resp = requests.get(BASE_URL + "/candidateapi/candidate/%s/"% (candidate_id),
                            # data=json.dumps(payload),
                            headers=headers,
                            cookies=self.request.COOKIES)
        data = json.loads(resp.content)
        candidate= data['data']
        context['candidate'] = candidate

        context['city_list'] = None
        context['candidate_country_id'] = None
        if candidate:
            candidate_city_id = candidate.get("city", {}).get("id", None)
            if candidate_city_id:
                context['city_id'] = candidate_city_id
                candidate_country_id = candidate.get("city", {}).get("country", {}).get("id", None)
                if candidate_country_id:
                    context['candidate_country_id'] = candidate_country_id
                    resp = requests.get(BASE_URL + "/commonapi/city/?country_id=%s"%(candidate_country_id),
                                        # data=json.dumps(payload),
                                        headers=headers,
                                        cookies=self.request.COOKIES)
                    data = json.loads(resp.content)
                    context['city_list'] = data['data']


        resp = requests.get(BASE_URL + "/commonapi/country/",
                            # data=json.dumps(payload),
                            headers=headers,
                            cookies=self.request.COOKIES)
        data = json.loads(resp.content)
        context['country_list'] = data['data']

        context['candidate_id'] = candidate_id
        return context

    def post(self, request, *args, **kwargs):

        post_data =  request.POST
        payload = {
                    # 'id': post_data.get('id', None),
                    'candidate_name': post_data.get('candidate_name', None),
                    'address': post_data.get('address', None),
                    'city_id': post_data.get('city_id', None),
                    # 'owner_info': post_data.get('owner_info', None)
        }

        id = post_data.get('id', None)
        if id:
            payload['id']= id
            _url="/candidateapi/candidate/%s/"% (id)
        else:
            _url = "/candidateapi/candidate/"

        owner_info = post_data.get('owner_info', None)
        if owner_info:
            payload['owner_info']= owner_info

        headers = {'Content-Type': 'application/json', 'Accept': 'application/json'}
        resp = requests.post(BASE_URL + _url,
                            data=json.dumps(payload),
                            headers=headers,
                            cookies=self.request.COOKIES)
        print("resp.content: ", resp.content)
        data = json.loads(resp.content)


        #     return HttpResponse(
        #         json.dumps({'vendor_booking_history': t.render(context), 'is_records': str(is_records)}))
        #
        # except Exception as e:
        #     logging.info('Class Name:%s - Error:%s' % ('VendorDetail Webapp', str(e)))
        #     template = loader.get_template('500.html')
        #     return HttpResponse(template.render(context, request))


