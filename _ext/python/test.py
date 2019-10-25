import json
import sys

# a Python object (dict):
x = {
  "name": "John",
  "age": 30,
  "city": "New York",
  "params" : sys.argv
}

# convert into JSON:
y = json.dumps(x)

# the result is a JSON string:
print(y)
