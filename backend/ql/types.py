from graphene_django.types import DjangoObjectType
from django.contrib.auth.models import User
from .models import Post

class PostType(DjangoObjectType):
    class Meta:
        model = Post
        fields = ("id", "title", "content", "image", "created_at")

class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = ("id", "username")
