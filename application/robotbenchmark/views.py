from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
from robotbenchmark.models import Problem


def home(request):
    problems = Problem.objects.all()
    context = {'problems': problems}
    return render(request, 'robotbenchmark/problemList.html', context)
