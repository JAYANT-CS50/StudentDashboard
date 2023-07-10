# Generated by Django 4.2.1 on 2023-07-05 07:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ChapterDetail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('about', models.TextField(max_length=150)),
                ('time', models.IntegerField()),
                ('subjectname', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='subjectlist', to='dashboard.subjects')),
            ],
        ),
    ]