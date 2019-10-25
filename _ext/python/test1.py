import json, sys

# a Python object (dict):
x = {
  "name": "JohnX",
  "age": 60,
  "city": "San Francisco",
  "params" : sys.argv
}

# convert into JSON:
y = json.dumps(x)

# the result is a JSON string:
print(y)
