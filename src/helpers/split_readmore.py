import csv

GITHUB = 'https://github.com/Daniel-Chin'.lower()

def main():
  with open('./src/helpers/portfolio.csv', 'r', encoding = 'utf-8') as fin:
    with open('./src/helpers/portfolio2.csv', 'w+', encoding = 'utf-8', newline='') as fout:
      cin = csv.reader(fin)
      head = next(cin)
      cout = csv.writer(fout)
      new_head = head[:5] + ['readmore'] + head[5:]
      cout.writerow(new_head)
      for line in cin:
        buffer = line[:4]
        source_original = line[4]
        if source_original.lower().startswith(GITHUB) and '#' in source_original:
          # split
          buffer.append(source_original.split('#', 2)[0])
          print(source_original.split('#', 2)[1:])
          buffer.append(source_original)
        else:
          buffer.append(source_original)
          buffer.append('')
        buffer.extend(line[5:])
        cout.writerow(buffer)

main()
