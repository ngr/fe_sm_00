# core URLS.py
from django.conf.urls import patterns, include, url
from core import views

urlpatterns = patterns('',
    url(r'^$', views.DashboardView.as_view(), name='dashboard'),
    url(r'^location/(?P<pk>[0-9]+)/$', views.LocationDetailView.as_view(), name='location-detail'),
    url(r'^slave/(?P<pk>[0-9]+)/$', views.SlaveDetailView.as_view(), name='slave-detail'),
    url(r'^region/(?P<pk>[0-9]+)/$', views.RegionDetailView.as_view(), name='region-detail'),

)