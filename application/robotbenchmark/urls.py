from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView

from rest_framework import routers

from .views.tournament_view import TournamentViewSet
from .views.tournament_user_view import TournamentUserViewSet
from .views.problem_user_view import ProblemUserViewSet
from .views.problem_view import ProblemViewSet
from .views.user_view import UserViewSet
from .views.login_view import LoginView

router = routers.DefaultRouter()
router.register("users", UserViewSet)
router.register("problem", ProblemViewSet)
router.register("users-problem", ProblemUserViewSet)
router.register("users-tournament", TournamentUserViewSet)
router.register("tournament", TournamentViewSet)

urlpatterns = [
    path('login/', LoginView.as_view()),
    path("api/", include(router.urls)),
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),

    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]
