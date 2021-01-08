# Two Focus Management Policies

## policy 1
```python
while True:
  if assessMyFocus() > 0:
    study()
  else:
    playGame(time=30)
```
## policy 2
```python
while True:
  try:
    study()
  except CannotFocus:
    playgame(time=30)
```
