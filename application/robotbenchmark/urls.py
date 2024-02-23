from django.contrib import admin
from django.urls import include, path

from rest_framework import routers

from .views.problem_user_view import ProblemUserViewSet
from .views.problem_view import ProblemViewSet
from .views.user_view import UserViewSet, LoginView

router = routers.DefaultRouter()
router.register("users", UserViewSet)
router.register("problem", ProblemViewSet)
router.register("users-problem", ProblemUserViewSet)

urlpatterns = [
    path('login/', LoginView.as_view()),
    path("api/", include(router.urls)),
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
]
