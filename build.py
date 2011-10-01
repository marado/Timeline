#!/usr/bin/env python

import os
import sys
import shutil

from glob import glob
from debian import deb822
from xml.dom.minidom import Document

def main(dir):
    num = 0

    doc = Document()
    events = doc.createElement('data')
    doc.appendChild(events)

    for filename in glob(os.path.join(dir, '*')):
        print >>sys.stderr, "Reading events from %s" % filename,
        input = file(filename).read().decode('utf-8').split('\n')

        obj = deb822.Deb822(input)
        for para in deb822.Deb822.iter_paragraphs(input, use_apt_pkg=False):
            events.appendChild(create_event(doc, para))
            sys.stderr.write('.')
            num += 1
        print >>sys.stderr

    print >>sys.stderr, "Writing %s events" % num

    print '<!-- Generated from %s/* - do not edit -->' % dir
    print events.toprettyxml(indent='  ').encode('utf-8')

def create_event(doc, para):
    entry = doc.createElement('entry')
    entry.setAttribute('title', para['Title'])

    if 'Start-Date' in para:
        entry.setAttribute('isDuration', 'true')
        entry.setAttribute('start', para['Start-Date'])
        entry.setAttribute('end', para['End-Date'])
    else:
        entry.setAttribute('start', para['Date'])

    if 'Source' in para:
        text = doc.createTextNode('<a href="%s">Source</a>' % para['Source'])
        entry.appendChild(text)

    return entry

if __name__ == '__main__':
    sys.exit(main(sys.argv[1]))
