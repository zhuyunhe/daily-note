def reverse(x):
  if -10 < x < 10:
    return x
  str_x = str(x)
  if(str_x[0] != "-"):
    str_x = str_x[::-1]
    x = int(str_x)
  else:
    str_x = str_x[1:][::-1]
    x = int(str_x)
    x = -x
  return x

if( __name__ == '__main__'):
  reverseInt = reverse(1234)
  print(reverseInt)