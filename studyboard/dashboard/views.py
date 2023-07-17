from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import SubjectListSerializer, ChapterListSerializer
from .models import SubjectList, ChapterList
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.models import User
from rest_framework import generics, permissions
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer, UserRegistrationSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated

# Create your views here.

class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]

class UserLoginView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        form = AuthenticationForm(request, data=request.data)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                token, _ = Token.objects.get_or_create(user=user)
                return Response({'token': token.key})
        return Response(status=401)
    

class UserLogoutView(APIView):
    def post(self, request, format=None):
        logout(request)
        return Response(status=204)

class SubjectListAV(APIView):
    permission_classes = [IsAuthenticated]
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
    
    def delete(self, request, pk):
        try:
            subject = SubjectList.objects.get(pk=pk)
            subject.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except SubjectList.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
    def put(self, request, pk):
        try:
            subject = SubjectList.objects.get(pk=pk)
        except SubjectList.DoesNotExist:
            return Response({'error': 'Subject not found.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = SubjectListSerializer(subject, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        
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
            totaltime = 0  # Initialize totaltime variable
            time = ChapterList.objects.filter(subjectname=subject)
            for t in time:
                totaltime += t.time  # Sum up the time values
            subject.totaltime = totaltime
            subject.save()  # Save the subject object with the updated chapter_count
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, pk):
        try:
            chapter = ChapterList.objects.get(id=pk)
        except ChapterList.DoesNotExist:
            return Response({'error': 'Chapter not found'}, status=status.HTTP_404_NOT_FOUND)
        
        subject = chapter.subjectname
        chapter.delete()
        
        # Update the subject's chapter_count and totaltime after deletion
        subject.chapter_count = ChapterList.objects.filter(subjectname=subject).count()
        totaltime = 0
        time = ChapterList.objects.filter(subjectname=subject)
        for t in time:
            totaltime += t.time
        subject.totaltime = totaltime
        subject.save()
        
        return Response({'message': 'Chapter deleted successfully'})

    def put(self, request, pk):
        try:
            chapter = ChapterList.objects.get(id=pk)
        except ChapterList.DoesNotExist:
            return Response({'error': 'Chapter not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = ChapterListSerializer(chapter, data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            
            subject = chapter.subjectname
            # Update the subject's totaltime after modification
            totaltime = 0
            time = ChapterList.objects.filter(subjectname=subject)
            for t in time:
                totaltime += t.time
            subject.totaltime = totaltime
            subject.save()
            
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)