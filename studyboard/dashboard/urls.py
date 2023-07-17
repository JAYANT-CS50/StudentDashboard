from django.urls import path, include 
from .views import SubjectListAV, ChapterListAV, UserRegistrationView, UserLoginView, UserLogoutView
from rest_framework_simplejwt.views import  TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('subject/', SubjectListAV.as_view(), name='subjects'),
    path('subject/<int:pk>/', SubjectListAV.as_view(), name='subject-detail'),
    path('subject/<int:pk>/chapter/', ChapterListAV.as_view(), name='chapters'),
    path('subject/chapter/<int:pk>/', ChapterListAV.as_view(), name='chapters-detail'),
    path('api/auth/register/', UserRegistrationView.as_view(), name='user-register'),
    path('api/auth/login/', UserLoginView.as_view(), name='user-login'),
    path('api/auth/logout/', UserLogoutView.as_view(), name='user-logout'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]