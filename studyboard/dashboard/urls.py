from django.urls import path, include 
from .views import SubjectListAV, ChapterListAV

urlpatterns = [
    path('subjects/', SubjectListAV.as_view(), name='subjects'),
    path('subject/<int:pk>/', ChapterListAV.as_view(), name='chapters'),

]