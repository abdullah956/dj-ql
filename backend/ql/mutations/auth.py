import graphene
from django.contrib.auth.models import User
from ..types import UserType

class Signup(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)

    def mutate(self, info, username, password):
        user = User.objects.create_user(username=username)
        user.set_password(password)
        user.save()
        return Signup(user=user)

class AuthMutations(graphene.ObjectType):
    signup = Signup.Field()
