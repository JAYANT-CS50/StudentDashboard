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
from rest_framework_simplejwt.authentication import JWTAuthentication

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
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        subjects = SubjectList.objects.filter(user=request.user)  # Filter subjects by the authenticated user
        serializer = SubjectListSerializer(subjects, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = SubjectListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            subject = SubjectList.objects.get(pk=pk, user=request.user)  # Filter subject by ID and authenticated user
            subject.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except SubjectList.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        try:
            subject = SubjectList.objects.get(pk=pk, user=request.user)  # Filter subject by ID and authenticated user
        except SubjectList.DoesNotExist:
            return Response({'error': 'Subject not found.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = SubjectListSerializer(subject, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChapterListAV(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            subject = SubjectList.objects.get(pk=pk, user=request.user)  # Filter subject by ID and authenticated user
            chapters = ChapterList.objects.filter(subjectname=subject)
            serializer = ChapterListSerializer(chapters, many=True)
            return Response(serializer.data)
        except SubjectList.DoesNotExist:
            return Response({'error': 'Subject not found'}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, pk):
        try:
            subject = SubjectList.objects.get(pk=pk, user=request.user)  # Filter subject by ID and authenticated user
            serializer = ChapterListSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(subjectname=subject, user=request.user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except SubjectList.DoesNotExist:
            return Response({'error': 'Subject not found'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            chapter = ChapterList.objects.get(id=pk, user=request.user)  # Filter chapter by ID and authenticated user
            chapter.delete()
            return Response({'message': 'Chapter deleted successfully'})
        except ChapterList.DoesNotExist:
            return Response({'error': 'Chapter not found'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        try:
            chapter = ChapterList.objects.get(id=pk, user=request.user)  # Filter chapter by ID and authenticated user
            serializer = ChapterListSerializer(chapter, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ChapterList.DoesNotExist:
            return Response({'error': 'Chapter not found'}, status=status.HTTP_404_NOT_FOUND)
