import gizeh
import random
import moviepy.editor as mpy

surface = gizeh.Surface(width=1000, height=1000)
count = 0
list = [3,1,2,5,7,8,33,6]

def bubble_sort(list):
  length = len(list)
  global count
  for index in range(length):
    draw_list(list, count)
    for i in range(1, length-index):
      if list[i-1] > list[i]:
        list[i], list[i-1] = list[i-1], list[i]
    count = count + 1
  return list


# def make_frame(t):
#   length

# groupList = []
# length = len(list)
# for index in range(length):
#   circle = gizeh.circle(r=30, xy=[80*(index+1),100], fill=(random.random(),random.random(), random.random()))
#   text = gizeh.text(str(list[index]), fontfamily="Impact", fontsize=30, fill=(1,1,1),  xy=(80*(index+1), 100))
#   group = gizeh.Group([circle,text])
#   groupList.append(group)
#   group.draw(surface)

random_color_r = random.random()
random_color_g = random.random()
random_color_b = random.random()

def draw_list(list,count):
  length = len(list)
  for index in range(length):
    color = (random_color_r + list[index]*0.2625, random_color_g+list[index]*0.123625, 0)
    circle = gizeh.circle(r=30, xy=[80*(index+1),100*(count+1)], fill=color)
    text = gizeh.text(str(list[index]), fontfamily="Impact", fontsize=40, fill=(0,0,0),  xy=(80*(index+1), 100*(count+1)))
    group = gizeh.Group([circle,text])
    group.draw(surface)

if __name__ == "__main__":
  # execute only if run as a script
  bubble_sort(list)
  surface.write_to_png('bubble_sort.png')
