from django.shortcuts import render
from django.views.generic.base import TemplateView

from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.models import User
from core.auth_be import RestBackend
from django.shortcuts import render_to_response, redirect
from django.template import RequestContext

import requests
from base64 import b64encode

def FePost(request):
    url = 'http://aws00.grischenko.ru:8333/api/test/'
    headers = {'Authorization': 'Bearer ' + request.session['access_token']}
    payload = {
            'type': 11,
            'location': 4,
            'owner': 3
        }
    response = requests.post(url, headers=headers, data=payload).json()
    print(response)
    
    
def FeLogin(request):
    """ Authorize user on remote OAuth2 server and login/create
        a local copy on success. Receive and save tokens as well. """
    username = password = ''
    if request.POST:
        username = request.POST['username']
        password = request.POST['password']

# Generate Token
      # I tried to use several libs to control tokens. They sucked.
      # So here is a MANUAL temporary token retrieve method.
        application_id = "4ci299zGdWnwTWmYlwvk13vsAro60jkoVe9bztz6"
        application_secret = "nf7WsWxuB0YW1MqjcryHIwRnegU6KnYCaGGnYyehEs6wb3MVXcndPrBjT0xPRBVAD0XNzwX5RX3LBZ7X76BKan90jAbpFQdgpsaP3zLFNFcBJbxWcy1bO9JnQRecgOHW"
        token_url = 'http://aws00.grischenko.ru:8333/o/token/'   
      
      # This is authorization for new token generation.
      # FIXME! Secret should be kept somewhere else!
      # Here is an UGLY trick to convert str to base64 and use it for auth.
      # As long as we use bytes, the first 2 symbols are: b'
        code = str(b64encode((application_id + ":" + application_secret).encode('ascii')))[2:]
        headers = {'Authorization': 'Basic ' + code}
        payload = {
            'grant_type': 'password',
            'username': username,
            'password': password
        }
        response = requests.post(token_url, headers=headers, data=payload).json()
        #print(response)

    # Check if the main Authorization on OAuth2 is OK.
        if not 'error' in response:
          # If the User exists in front-end, just take it
            try:
                user = User.objects.get(username=username)
          # Otherwise create a new user dummy
            except User.DoesNotExist:
                user = User.objects.create_user(username=username)
                user.set_password(password)
                user.save()
          # Authenticate and login locally
            user = authenticate(username=username, password=password)
            login(request, user)
          # We assume that if there was no error from OAuth2 we have tokens.
          # Save tokens to session
            request.session['access_token'] = response['access_token']
            request.session['refresh_token'] = response['refresh_token']

          # Final redirect on success.
            if request.POST.get('next'):
                return HttpResponseRedirect(request.POST.get('next'))
            else:
                return HttpResponseRedirect('/')

    # If the credentials on remote OAuth2 server failed clear session.
        else:
            logout(request)
                   
    # In case we do not have a POST request or have failed auth we show the login Form.    
    return render_to_response('core/login.html', context_instance=RequestContext(request))

def FeLogout(request):
    """ Logout a local copy of User and "forget" the tokens. """
    logout(request)
    return HttpResponseRedirect('login')
        
class DashboardView(TemplateView):

    template_name = 'core/index.html'
       
    def get_context_data(self,**kwargs):
        context = super(DashboardView, self).get_context_data(**kwargs)
        if not self.request.session or not 'access_token' in self.request.session:
            print("NO AUTH!!!")
        else:
#            print("I HAVE A TOKEN:", self.request.session['access_token'])
            context['user'] = self.request.user
            context['token'] = self.request.session['access_token']

        context['regions'] = []
            
        return context

class LocationDetailView(TemplateView):
    """ Main Location operating tool. """
    template_name = "core/location_detail.html"
    
    def get_context_data(self, **kwargs):
        context = super(LocationDetailView, self).get_context_data(**kwargs)
        if not self.request.session or not 'access_token' in self.request.session:
            print("NO AUTH!!!")
            return context

        context['location_details'] = []
        context['user'] = self.request.user
        context['token'] = self.request.session['access_token']

        # This info is going to be quite static so we pre load it now.
        id = self.kwargs['pk']
        api_url = 'http://aws00.grischenko.ru:8333/api/location/' + id
        headers = {'Authorization': 'Bearer ' + self.request.session['access_token']}
        response = requests.get(api_url, headers=headers)

        # If we couldn't get details from API show the status in notification.
        if not response.status_code == 200:
            context['notification'] = response.json()
            context['notification_class'] = 'error'
            return context

        context['location_details'] = response.json()
        
        return context

class SlaveDetailView(TemplateView):
    """ Main Slave operating tool. """
    template_name = "core/slave_detail.html"
    
    def get_context_data(self, **kwargs):
        context = super(SlaveDetailView, self).get_context_data(**kwargs)
        if not self.request.session or not 'access_token' in self.request.session:
            print("NO AUTH!!!")
            return context

        context['slave'] = []
        context['user'] = self.request.user
        context['token'] = self.request.session['access_token']

        # This info is going to be quite static so we pre load it now.
        id = self.kwargs['pk']
        api_url = 'http://aws00.grischenko.ru:8333/api/slave/' + id
        headers = {'Authorization': 'Bearer ' + self.request.session['access_token']}
        response = requests.get(api_url, headers=headers)

        # If we couldn't get details from API show the status in notification.
        if not response.status_code == 200:
            context['notification'] = response.json()
            context['notification_class'] = 'error'
            return context

        context['slave'] = response.json()
        
        return context
