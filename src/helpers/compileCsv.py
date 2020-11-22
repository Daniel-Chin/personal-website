import csv
from indentprinter import IndentPrinter

def main():
  with open('./src/helpers/portfolio.csv', 'r', encoding = 'utf-8') as csvF:
    c = csv.reader(csvF)
    head = next(c)
    transformDict = {
      'year': int, 
      'pride': int, 
      'tags': parseTags, 
    }
    transform = [transformDict.get(x, nop) for x in head]
    with open('./src/helpers/portfolioRoot.js', 'w+') as f:
      def p(*a, **b):
        print(*a, file = f, **b)
      indentor = IndentPrinter(p)
      p('const portfolio_root = [')
      with indentor as p:
        for line in c:
          p('{')
          with indentor as p:
            for key, value, trans in zip(head, line, transform):
              p(key, ':', repr(trans(value)), ', ')
          p('}, ')
      p('];\n')
      p('export default portfolio_root;')

def nop(x):
  return x

def parseTags(txt):
  return [x.strip() for x in txt.split(';')]

main()
