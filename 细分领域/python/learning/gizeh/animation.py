import gizeh
import moviepy.editor as mpy

W,H = 128, 128
duration = 2


def make_frame(t):
  surface = gizeh.Surface(W,H)
  radius = W*(1+ (t*(duration-t)))/6
  circle = gizeh.circle(radius, xy = (W/2,H/2), fill=(1,0,0))
  circle.draw(surface)
  return surface.get_npimage()

clip = mpy.VideoClip(make_frame, duration=duration)
clip.write_gif("circle2.gif",fps=15, opt="OptimizePlus", fuzz=10)