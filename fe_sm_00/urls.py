# fe_sm_00 URL Configuration

from django.conf.urls import patterns, include, url
#from django.contrib import admin

urlpatterns = patterns('',
#    url(r'^admin/', include(admin.site.urls)), 
    url(r'^login$', 'core.views.FeLogin', name='login'),
    url(r'^logout$', 'core.views.FeLogout', name='logout'),

    url(r'', include('core.urls', namespace='core')),
)