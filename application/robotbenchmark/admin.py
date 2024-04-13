from django.contrib import admin
from .models import Problem, TournamentUser, Tournament, ProblemUser

# Register your models here.

admin.site.register(Problem)
admin.site.register(ProblemUser)
admin.site.register(Tournament)
admin.site.register(TournamentUser)
