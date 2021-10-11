import traceback
import logging

from django.shortcuts import render
# Create your views here.


def error_404(request):
	'''
	It is 404 customize page.
	Use this method with handler if we need to customize page from backend.
	'''
	data = {}
	return render(request,'common/404.html', data)

def load_on_startup():
	pass
