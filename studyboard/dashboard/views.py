from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import SubjectListSerializer, ChapterListSerializer
from .models import SubjectList, ChapterList
from rest_framework import status

# Create your views here.

class SubjectListAV(APIView):
    def get(self, request): 
        subjects = SubjectList.objects.all()
        serializer = SubjectListSerializer(subjects, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = SubjectListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
        
class ChapterListAV(APIView):
    def get(self, request, pk): 
        try:
          subject = SubjectList.objects.get(pk = pk)
        except SubjectList.DoesNotExist:
          return Response({'error': 'Subject not found'}, status=status.HTTP_404_NOT_FOUND)
       
        chapters = ChapterList.objects.filter(subjectname=subject)
        if not chapters:
            return Response({'error': 'Chapters not found for the given subject'}, status=status.HTTP_404_NOT_FOUND)
        serializer = ChapterListSerializer(chapters, many=True)
        return Response(serializer.data)
    
    def post(self, request, pk):
        try:
            subject = SubjectList.objects.get(pk=pk)
        except SubjectList.DoesNotExist:
            return Response({'error': 'Subject not found'}, status=status.HTTP_404_NOT_FOUND)
       
        serializer = ChapterListSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save(subjectname=subject)
            subject.chapter_count = ChapterList.objects.filter(subjectname=subject).count()
            time = ChapterList.objects.filter(subjectname=subject)
            for t in time:
                totaltime = totaltime + t.time
            subject.totaltime = totaltime
            subject.save()  # Save the subject object with the updated chapter_count
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)