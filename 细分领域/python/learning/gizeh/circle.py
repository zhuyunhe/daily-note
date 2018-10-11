import gizeh
surface = gizeh.Surface(width=320, height=260)
circle = gizeh.circle(r=40, xy=[156,200], fill=(1,0,0))
circle.draw(surface)
surface.write_to_png('my_drawing.png')