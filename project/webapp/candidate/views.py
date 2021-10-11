from django.shortcuts import render ,redirect


def create_candidate(request):
    return render(request, 'candidate/create_candidate.html')

def show_candidate(request):
    return render(request, 'candidate/show_candidate.html')

