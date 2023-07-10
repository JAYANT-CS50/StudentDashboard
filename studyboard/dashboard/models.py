from django.db import models

# Create your models here.
class SubjectList(models.Model):
    name = models.CharField(max_length=30)
    about = models.CharField(max_length=150)
    time = models.IntegerField(null=True, blank=True)
    chapter_count = models.IntegerField(default=0)
    

    def __str__(self):
      return self.name

class ChapterList(models.Model):
    name = models.CharField(max_length=30)
    about = models.TextField(max_length=150)
    time = models.IntegerField(null=False, blank=False)
    subjectname = models.ForeignKey(SubjectList, on_delete=models.CASCADE, related_name="subjectlist")
    
    def __str__(self):
      return self.name