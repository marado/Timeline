#!/usr/bin/env python

import os
import sys

print >>sys.stderr, "Reading the title"
title = file("title").read().decode('utf-8').split('\n')
print "var mytitle = \"%s\";" % title[0]
