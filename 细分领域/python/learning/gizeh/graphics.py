import gizeh
import numpy as np
surface = gizeh.Surface(width=400, height=400)
Pi = 3.14
circ = gizeh.circle(r=30, xy=(50,50), fill=(0,0,0))
rect = gizeh.rectangle(lx=60, ly=45, xy=(100,100), fill=(0,1,0))
sqr = gizeh.square(l=20, stroke=(1,1,1), stroke_width= 1.5)
arc = gizeh.arc(r=20, a1=Pi/4, a2=3*Pi/4, fill=(1,1,1))
text = gizeh.text("Hello world", fontfamily="Impact",  fontsize=40,
                  fill=(1,1,1), xy=(100,100), angle=Pi/12)
polygon = gizeh.regular_polygon(r=40, n=5, angle=np.pi/4, xy=[40,50], fill=(1,0,1))
line = gizeh.polyline(points=[(0,0), (20,30), (40,40), (0,10)], stroke_width=3,
                     stroke=(1,0,0), fill=(0,1,0))
circ.draw(surface)
rect.draw(surface)
sqr.draw(surface)
arc.draw(surface)
text.draw(surface)
polygon.draw(surface)
line.draw(surface)



surface.write_to_png('graphics.png')