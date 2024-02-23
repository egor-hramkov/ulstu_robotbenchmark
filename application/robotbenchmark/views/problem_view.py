from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response

from ..models import Problem
from ..serializers.problem_serializer import ProblemSerializer


# Create your views here.


class ProblemViewSet(viewsets.ModelViewSet):
    queryset = Problem.objects.all()
    serializer_class = ProblemSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        init_url = 'ws://localhost:1999' + instance.world_path
        return Response(
            {'problem': serializer.data, "init_url": init_url}
        )

    # def home(request):
    #     problems = Problem.objects.order_by('difficulty').all()
    #     context = {'problems': problems}
    #     return render(request, 'robotbenchmark/problemList.html', context)
    #
    #
    # def problem(request, pk):
    #     problem = Problem.objects.get(id=pk)
    #     # TODO брать из конфига
    #     initUrl = 'ws://localhost:1999/' + problem.world_path
    #     context = {'problem': problem, 'initUrl': initUrl}
    #     return render(request, 'robotbenchmark/problem.html', context)
