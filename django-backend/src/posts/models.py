from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

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

    STATUS_CHOICES = [
        ("open", "Open"),
        ("accepted", "Accepted"),
        ("completed", "Completed"),
    ]

    title = models.CharField(max_length=200)
    content = models.TextField()
    job_type = models.CharField(max_length=50, choices=JOB_TYPES, blank=True, default="other")
    location = models.CharField(max_length=200, blank=True, default="")
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    pay_rate = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    image = models.ImageField(upload_to="job_images/", null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="open")
    accepted_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="accepted_jobs"
    )
    accepted_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def accept(self, user):
        self.status = "accepted"
        self.accepted_by = user
        self.accepted_at = timezone.now()
        self.save()

    def unaccept(self):
        self.status = "open"
        self.accepted_by = None
        self.accepted_at = None
        self.save()

    # Returns a string representation of the post (its title) for managing models in admin display (http://127.0.0.1:8000/admin)
    def __str__(self):
        return self.title
    
class SavedPost(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="saved_posts")
    post = models.ForeignKey("Post", on_delete=models.CASCADE, related_name="saves")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["user", "post"], name="unique_saved_post")
        ]

    def __str__(self):
        return f"{self.user.username} saved {self.post_id}"                     

# IMPORTANT!

# Every time you create or change a model, make sure you run the following commands in the terminal to update the database structure
# First make sure this is your directory path in the terminal: django-backend\src>

#   Then enter the first command:   python manage.py makemigrations
# Followed by the second command:   python manage.py migrate