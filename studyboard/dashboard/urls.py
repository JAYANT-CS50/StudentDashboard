from django.urls import path, include 
from .views import SubjectListAV, ChapterListAV

urlpatterns = [
    path('subject/', SubjectListAV.as_view(), name='subjects'),
    path('subject/<int:pk>/', SubjectListAV.as_view(), name='subject-detail'),
    path('subject/<int:pk>/chapter/', ChapterListAV.as_view(), name='chapters'),
    path('subject/chapter/<int:pk>/', ChapterListAV.as_view(), name='chapters-detail'),

]