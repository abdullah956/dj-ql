import graphene
from .models import Post
from .types import PostType

class Query(graphene.ObjectType):
    post = graphene.Field(PostType, id=graphene.Int(required=True))
    all_posts = graphene.List(PostType)

    def resolve_post(root, info, id):
        return Post.objects.get(pk=id)

    def resolve_all_posts(root, info):
        return Post.objects.all()
