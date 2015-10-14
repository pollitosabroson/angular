# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('autores', '__first__'),
    ]

    operations = [
        migrations.CreateModel(
            name='Libro',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('nombre', models.TextField(max_length=100)),
                ('editorial', models.TextField(max_length=100)),
                ('genero', models.TextField(max_length=100)),
                ('autor', models.ForeignKey(to='autores.Autor', null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
