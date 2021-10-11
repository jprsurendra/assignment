from django.shortcuts import redirect
from django.utils.deprecation import MiddlewareMixin
from django.middleware.csrf import CsrfViewMiddleware


class CustomMainMiddleware(MiddlewareMixin):
    def process_request(self, request):
        # Process the request
        pass

    def process_response(self, request, response):
        # Process the response
        return response

class CustomCsrfMiddleware(CsrfViewMiddleware):
    def process_view(self, request, callback, callback_args, callback_kwargs):
        is_user_authenticated = request.user.is_authenticated()
        reason = super(CustomCsrfMiddleware, self).process_view(request, callback, callback_args, callback_kwargs)
        if is_user_authenticated and reason and reason.status_code == 403:
            # print("CSRF failed")
            request_path = request.path
            return redirect(request_path)
        return reason
