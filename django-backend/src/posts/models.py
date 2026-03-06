from django.db import models
from django.contrib.auth.models import User

# Generic Post model, models are the blueprint (class) for what is created in the database

# Although its not defined, the Post model also has an id field automatically created by django

class Post(models.Model):

    JOB_TYPES = [
        ("plumbing", "Plumbing"),
        ("electrical", "Electrical"),
        ("painting", "Painting"),
        ("yard", "Yard Work"),
        ("assembly", "Furniture Assembly"),
        ("maintenance", "General Maintenance"),
        ("other", "Other"),
    ]

    title = models.CharField(max_length=200)
    content = models.TextField()
    job_type = models.CharField(max_length=50, choices=JOB_TYPES, blank=True, default="other")
    location = models.CharField(max_length=200, blank=True, default="")
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name = "posts") # Links the post to a User. If the user is deleted, their posts are also deleted.
    created_at = models.DateTimeField(auto_now_add=True)

    # Returns a string representation of the post (its title) for managing models in admin display (http://127.0.0.1:8000/admin)
    def __str__(self):
        return self.title


# IMPORTANT!

# Every time you create or change a model, make sure you run the following commands in the terminal to update the database structure
# First make sure this is your directory path in the terminal: django-backend\src>

#   Then enter the first command:   python manage.py makemigrations
# Followed by the second command:   python manage.py migrate