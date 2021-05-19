from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
from robotbenchmark.models import Problem


def home(request):
    problems = Problem.objects.all()
    context = {'problems': problems}
    return render(request, 'robotbenchmark/problemList.html', context)


def problem(request, pk):
    problem = Problem.objects.get(id=pk)
    initUrl = 'ws://localhost:1999/' + problem.world_path
    context = {'problem': problem, 'initUrl': initUrl}
    return render(request, 'robotbenchmark/problem.html', context)
