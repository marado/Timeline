This was shamelessly stolen from https://github.com/lamby/debian-timeline . 

As a tribute to his dedication of that code to the Public Domain, this code is
also on the Public Domain.

This was made to work on debian, so it simply assumes you have the
libjs-simile-timeline package installed.

At this moment, this is something that generates an (HTML + JS) timeline based
on a set of text files.

A next step would be to have something generating those files (instead of
having it made by hand). 

You can see it in action (a simple 'make') at http://marado.github.io/Timeline/


================================================================================

HOW TO USE:

1) Use Debian, or use it at your own risk (sorry, but at this stage...)
2) aptitude install libjs-simile-timeline # just in case you still don't have it
3) download this to the directory you want to have your timeline
4) edit the "title" file and write there whatever the title you want for your
   timeline
5) take a look at the "data" directory. There's a structure there with all the
   events on the timeline, what's already there is an example. Change it for your
   needs
6) open a terminal on the directory where this is, and type "make"
7) There, your timeline is ready. Open your webbrowser on this directory (file
   index.html) and enjoy!
