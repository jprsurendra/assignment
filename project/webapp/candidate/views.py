import logging
import traceback
import requests
import json

from django.http import HttpResponse
from django.shortcuts import render ,redirect
from django.conf import settings as constants
from django.views.generic import TemplateView

BASE_URL = constants.BASE_URL


def save_candidate(request):
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
        context['candidate'] = data['data']


        resp = requests.get(BASE_URL + "/commonapi/country/",
                            # data=json.dumps(payload),
                            headers=headers,
                            cookies=self.request.COOKIES)
        data = json.loads(resp.content)
        context['country_list'] = data['data']

        context['candidate_id'] = candidate_id
        return context

    def post(self, request, *args, **kwargs):
        context = {}
        # try:
        #     recieved_json_data = json.loads(request.body)
        #
        #     context = {}
        #     t = loader.get_template('customer_care/vendor_detail_booking_history_json.html')
        #     is_records = True
        #     if (Booking.objects.filter(quotation__vendor_id=kwargs['vendor_id']).filter(
        #             Q(booking_number__icontains=recieved_json_data['search_param'])).exists()):
        #
        #         VendorBookingHistoryResp = requests.get(
        #             BASE_URL + "/customercareapi/vendor-booking-detail/%s/?number_of_records=4&search_param=%s" % (
        #             kwargs['vendor_id'], recieved_json_data['search_param']), cookies=self.request.COOKIES)
        #
        #     else:
        #
        #         VendorBookingHistoryResp = requests.get(
        #             BASE_URL + "/customercareapi/vendor-booking-detail/%s/?number_of_records=4" % (kwargs['vendor_id']),
        #             cookies=self.request.COOKIES)
        #     context['VendorBookingHistory'] = json.loads(VendorBookingHistoryResp.content)
        #
        #     return HttpResponse(
        #         json.dumps({'vendor_booking_history': t.render(context), 'is_records': str(is_records)}))
        #
        # except Exception as e:
        #     logging.info('Class Name:%s - Error:%s' % ('VendorDetail Webapp', str(e)))
        #     template = loader.get_template('500.html')
        #     return HttpResponse(template.render(context, request))


