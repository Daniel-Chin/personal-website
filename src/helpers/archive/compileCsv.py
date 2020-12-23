import csv
from indentprinter import IndentPrinter

NON_BUTT = ['title','year','pride','tags','description','img']
CAPTION = {
  'source': 'Source Code',
  'readmore': 'Read More',
  'demo': 'Demo',
  'site_doc': 'Documentation',
  'paper': 'Paper',
  'attached': 'Attachment', 
}

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
    with open('./src/generated/portfolioRoot.js', 'w+', encoding='utf-8') as f:
      def p(*a, **b):
        print(*a, file = f, **b)
      indentor = IndentPrinter(p)
      p('const portfolio_root = [')
      with indentor as p:
        for line in c:
          p('{')
          buttons = []
          with indentor as p:
            for key, value, trans in zip(head, line, transform):
              if key in NON_BUTT:
                p(key, ':', repr(trans(value)) + ', ')
              else:
                if value:
                  buttons.append((key, value))
            p('links: [')
            with indentor as p:
              for key, value in buttons:
                in_ex = 'internal' if key in 'site_docpaperattached' else 'external'
                p(f'[ "{CAPTION[key]}", "{in_ex}", "{value}" ], ')
            p('], ')
          p('}, ')
      p('];\n')
      p('export default portfolio_root;')

def nop(x):
  return x

def parseTags(txt):
  return [x.strip() for x in txt.split(';')]

main()
