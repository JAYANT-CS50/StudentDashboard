from rest_framework import serializers
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
    #subjectlist = serializers.StringRelatedField(many=True, read_only=True)  # Assuming you want to include the related chapters
    class Meta:
        model = SubjectList
        exclude = ('user',)

class ChapterListSerializer(serializers.ModelSerializer):
    #subjectname = SubjectListSerializer(read_only=True)  # Assuming you want to include the related subject
    class Meta:
        model = ChapterList
        exclude = ('subjectname', 'user',)
        
