import graphene
from graphene_django.types import DjangoObjectType
from graphene_file_upload.scalars import Upload
from .models import Post

class PostType(DjangoObjectType):
    class Meta:
        model = Post
        fields = ("id", "title", "content", "image", "created_at")


class CreatePost(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        content = graphene.String(required=True)
        image = Upload(required=False)

    post = graphene.Field(PostType)

    def mutate(self, info, title, content, image=None):
        post = Post.objects.create(title=title, content=content, image=image)
        return CreatePost(post=post)

class Query(graphene.ObjectType):
    post = graphene.Field(PostType, id=graphene.Int(required=True))
    all_posts = graphene.List(PostType)

    def resolve_post(root, info, id):
        return Post.objects.get(pk=id)

    def resolve_all_posts(root, info):
        return Post.objects.all()


class Mutation(graphene.ObjectType):
    create_post = CreatePost.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
