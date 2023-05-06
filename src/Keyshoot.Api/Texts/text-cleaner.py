import os
import re

illegal_characters = ['\n', '\r\n', '\t', '“', '”', '_', '—', '…', '«', '»', '    ']

replace_chars = [
  ('\n', ' '),
  ('\t', ' '),
  ('é', 'e'),
  ('á', 'a')
]

def clean_file(path):
    with open(path, "r", encoding='utf-8') as file:
      data = file.read()
      data = re.sub(' +', ' ', data)

      for char in illegal_characters:
        data = data.replace(char, '')

      for (char1, char2) in replace_chars:
        data = data.replace(char1, char2)
      
      with open(path, "w", encoding='utf-8') as f:
        f.write(data)
          

def main():
    for path in [p for p in os.listdir(os.curdir) if p.endswith(".txt")]:
        clean_file(path)


if __name__ == "__main__":
    main()