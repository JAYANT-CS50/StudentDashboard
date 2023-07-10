from rest_framework import serializers
from dashboard.models import SubjectList, ChapterList

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