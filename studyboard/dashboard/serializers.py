from rest_framework import serializers
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User
from dashboard.models import SubjectList, ChapterList

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class SubjectListSerializer(serializers.ModelSerializer):
    student = serializers.StringRelatedField(read_only=True)
    class Meta:
        model = SubjectList
        fields = '__all__'
        
        
class ChapterListSerializer(serializers.ModelSerializer):
    chapter = serializers.StringRelatedField(read_only=True)
    class Meta:
        model = ChapterList
        #fields = '__all__'
        exclude = ('subjectname',)

