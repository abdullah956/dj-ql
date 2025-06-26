import graphene
from graphql_jwt.decorators import login_required
from graphene_file_upload.scalars import Upload
from ..models import Post
from ..types import PostType

class CreatePost(graphene.Mutation):
    post = graphene.Field(PostType)

    class Arguments:
        title = graphene.String(required=True)
        content = graphene.String(required=True)
        image = Upload(required=False)

    @login_required
    def mutate(self, info, title, content, image=None):
        post = Post.objects.create(title=title, content=content, image=image)
        return CreatePost(post=post)

class PostMutations(graphene.ObjectType):
    create_post = CreatePost.Field()
