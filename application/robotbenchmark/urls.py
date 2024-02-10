from .views import main_view

from django.contrib import admin
from django.urls import include, path

from rest_framework import routers

from .views.user_view import UserViewSet, LoginView

router = routers.DefaultRouter()
router.register("users", UserViewSet)

urlpatterns = [
    path('', main_view.home, name='home'),
    path('problem/<str:pk>', main_view.problem, name='problem'),
    path('login/', LoginView.as_view()),
    path("api/", include(router.urls)),
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
]
