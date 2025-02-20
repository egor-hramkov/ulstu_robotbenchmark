from django.conf import settings
from django.conf.urls.static import static
from django.urls import include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView

from rest_framework import routers
from django.urls import path
from rest_framework_simplejwt import views as jwt_views

from .views.command_view import CommandQueueView
from .views.finish_problem_view import FinishProblemView
from .views.leaderboard_by_problem_view import LeaderboardByProblemView
from .views.leaderboard_by_tournament_view import LeaderboardByTournamentView
from .views.leaderboard_view import LeaderboardView
from .views.token_obtain_view import CustomTokenObtainPairView
from .views.tournament_view import TournamentViewSet, BlockTournamentAPIView
from .views.tournament_user_view import TournamentUserViewSet
from .views.problem_user_view import ProblemUserViewSet, UserProblemLauncher, CheckProblemUserAccess
from .views.problem_view import ProblemViewSet
from .views.vs_code_view import VsCodeView
from .views.wbt_files_view import UploadWBTFileView
from .views.user_register_view import UserRegisterViewSet
from .views.user_view import UserViewSet

router = routers.DefaultRouter()

router.register('users', UserViewSet)
router.register('problem', ProblemViewSet)
router.register('users-problem', ProblemUserViewSet)
router.register('users-tournament', TournamentUserViewSet)
router.register('tournament', TournamentViewSet)

urlpatterns = [
    path('', include(router.urls)),

    path('register/', UserRegisterViewSet.as_view(), name='register'),

    path('leaderboard/', LeaderboardView.as_view()),
    path('leaderboard/tournament/<int:tournament_id>/', LeaderboardByTournamentView.as_view()),
    path('leaderboard/problem/<int:problem_id>/', LeaderboardByProblemView.as_view()),

    path('block/<int:tournament_id>/', BlockTournamentAPIView.as_view(), name='block-tournament'),
    path('upload-wbt/', UploadWBTFileView.as_view(), name='upload_wbt'),
    path('commands/', CommandQueueView.as_view()),

    path('launch-user-problem/<int:problem_user_id>', UserProblemLauncher.as_view()),
    path('finish/<int:problemuser_id>', FinishProblemView.as_view()),
    path('check-pu-access/', CheckProblemUserAccess.as_view()),

    path('vs-code-restart/<int:problem_user_id>/', VsCodeView.as_view(), name='vs_code_view'),

    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'), 
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),

    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
