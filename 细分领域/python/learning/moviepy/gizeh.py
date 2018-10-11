import numpy as np
import gizeh as gz
import moviepy.editor as mpy

W, H = 500, 300
duration = 5
figpath = '/tmp/'
fps = 1

def make_frame(t):

    surface = gz.Surface(W,H, bg_color=(1,1,1))

    rect = gz.rectangle(lx = 10, ly = 10, xy=(W/(t+1),H/2), fill =(0,1,0.7))
    rect.draw(surface)
    txt = gz.text(str(t+1), fontfamily="Impact", fontsize=15, fill=(0,0,0),xy=(W/(t+1),H/2))
    txt.draw(surface)

    return surface.get_npimage()

clip = mpy.VideoClip(make_frame, duration=duration)
clip.write_videofile('trax_0.mp4', fps=fps)

# clip.ipython_display(fps=fps, width=W, autoplay=0, loop=0)