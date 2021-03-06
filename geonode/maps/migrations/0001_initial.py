# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings
import geonode.utils


class Migration(migrations.Migration):

    dependencies = [
        ('base', '__first__'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('groups', '__first__'),
    ]

    operations = [
        migrations.CreateModel(
            name='Map',
            fields=[
                ('resourcebase_ptr', models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, serialize=False, to='base.ResourceBase')),
                ('title_en', models.CharField(help_text='name by which the cited resource is known', max_length=255, null=True, verbose_name='title')),
                ('abstract_en', models.TextField(help_text='brief narrative summary of the content of the resource(s)', null=True, verbose_name='abstract', blank=True)),
                ('purpose_en', models.TextField(help_text='summary of the intentions with which the resource(s) was developed', null=True, verbose_name='purpose', blank=True)),
                ('constraints_other_en', models.TextField(help_text='other restrictions and legal prerequisites for accessing and using the resource or metadata', null=True, verbose_name='restrictions other', blank=True)),
                ('supplemental_information_en', models.TextField(default='No information provided', help_text='any other descriptive information about the dataset', null=True, verbose_name='supplemental information')),
                ('data_quality_statement_en', models.TextField(help_text="general explanation of the data producer's knowledge about the lineage of a dataset", null=True, verbose_name='data quality statement', blank=True)),
                ('zoom', models.IntegerField(verbose_name='zoom')),
                ('projection', models.CharField(max_length=32, verbose_name='projection')),
                ('center_x', models.FloatField(verbose_name='center X')),
                ('center_y', models.FloatField(verbose_name='center Y')),
                ('last_modified', models.DateTimeField(auto_now_add=True)),
                ('urlsuffix', models.CharField(max_length=255, verbose_name='Site URL', blank=True)),
                ('featuredurl', models.CharField(max_length=255, verbose_name='Featured Map URL', blank=True)),
                ('current_iteration', models.IntegerField(default=0)),
                ('status', models.CharField(default=b'DRAFT', max_length=10, choices=[(b'DRAFT', 'Draft'), (b'PENDING', 'Pending'), (b'ACTIVE', 'Active'), (b'INACTIVE', 'Inactive'), (b'DENIED', 'Denied'), (b'DELETED', 'Deleted'), (b'CANCELED', 'Canceled')])),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('date_updated', models.DateTimeField(auto_now=True)),
                ('group', models.ForeignKey(blank=True, to='groups.GroupProfile', null=True)),
                ('last_auditor', models.ForeignKey(blank=True, to=settings.AUTH_USER_MODEL, null=True)),
            ],
            options={
                'abstract': False,
            },
            bases=('base.resourcebase', geonode.utils.GXPMapBase),
        ),
        migrations.CreateModel(
            name='MapAuditActivity',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('result', models.CharField(max_length=15, choices=[(b'APPROVED', 'Approved'), (b'DECLINED', 'Declined'), (b'CANCELED', 'Canceled')])),
                ('comment_subject', models.CharField(help_text='Comment type to approve or deny layer submission ', max_length=300)),
                ('comment_body', models.TextField(help_text='Comments when auditor denied or approved layer submission', blank=True)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('date_updated', models.DateTimeField(auto_now=True)),
                ('auditor', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='MapLayer',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('stack_order', models.IntegerField(verbose_name='stack order')),
                ('format', models.CharField(max_length=200, null=True, verbose_name='format', blank=True)),
                ('name', models.CharField(max_length=200, null=True, verbose_name='name')),
                ('opacity', models.FloatField(default=1.0, verbose_name='opacity')),
                ('styles', models.CharField(max_length=200, null=True, verbose_name='styles', blank=True)),
                ('transparent', models.BooleanField(default=False, verbose_name='transparent')),
                ('fixed', models.BooleanField(default=False, verbose_name='fixed')),
                ('group', models.CharField(max_length=200, null=True, verbose_name='group', blank=True)),
                ('visibility', models.BooleanField(default=True, verbose_name='visibility')),
                ('ows_url', models.URLField(null=True, verbose_name='ows URL', blank=True)),
                ('layer_params', models.TextField(verbose_name='layer params')),
                ('source_params', models.TextField(verbose_name='source params')),
                ('local', models.BooleanField(default=False)),
                ('map', models.ForeignKey(related_name='layer_set', to='maps.Map')),
            ],
            options={
                'ordering': ['stack_order'],
            },
            bases=(models.Model, geonode.utils.GXPLayerBase),
        ),
        migrations.CreateModel(
            name='MapSnapshot',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('config', models.TextField(verbose_name='JSON Configuration')),
                ('created_dttm', models.DateTimeField(auto_now_add=True)),
                ('map', models.ForeignKey(related_name='snapshot_set', to='maps.Map')),
                ('user', models.ForeignKey(blank=True, to=settings.AUTH_USER_MODEL, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='MapSubmissionActivity',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('iteration', models.IntegerField(default=0)),
                ('is_audited', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=True)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('date_updated', models.DateTimeField(auto_now=True)),
                ('group', models.ForeignKey(to='groups.GroupProfile')),
                ('map', models.ForeignKey(related_name='map_submission', to='maps.Map')),
            ],
        ),
        migrations.AddField(
            model_name='mapauditactivity',
            name='map_submission_activity',
            field=models.ForeignKey(to='maps.MapSubmissionActivity'),
        ),
        migrations.AlterUniqueTogether(
            name='mapsubmissionactivity',
            unique_together=set([('map', 'group', 'iteration')]),
        ),
    ]
