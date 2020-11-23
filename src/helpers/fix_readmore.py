import csv

GITHUB = 'https://github.com/Daniel-Chin'.lower()

def main():
  with open('./src/helpers/portfolio.csv', 'r', encoding = 'utf-8') as fin:
    with open('./src/helpers/portfolio2.csv', 'w+', encoding = 'utf-8', newline='') as fout:
      cin = csv.reader(fin)
      head = next(cin)
      cout = csv.writer(fout)
      cout.writerow(head)
      for line in cin:
        buffer = line[:4]
        source_original = line[4]
        readme_original = line[5]
        if len(readme_original) < 2 and source_original.lower().startswith(GITHUB) and '#' in source_original:
          # fix
          buffer.append(source_original.split('#', 2)[0])
          print(source_original.split('#', 2)[1:])
          buffer.append(source_original)
        else:
          buffer.append(source_original)
          buffer.append(readme_original)
        buffer.extend(line[6:])
        cout.writerow(buffer)

main()
