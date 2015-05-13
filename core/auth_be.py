from django.contrib.auth.models import User
import requests

class RestBackend(object):
    supports_inactive_user = False

    def authenticate(self, username='seal', password='123'):
        print("AUTHENTICATING")
        rest_response = requests.post('http://aws00.grischenko.ru:8000/a/login/', 
            data={ 'username' : username, 'password' : password }).json()

        if rest_response['error'] == 'None':
            try:
                user = User.objects.get(username=username)
            except User.DoesNotExist:
                user = User(username=username, password=password)
                user.save()
            return user
        return user

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
