import os

illegal_characters = ['\n', '\r\n', '\t', '“', '”', '_', '—', '…']

def clean_file(path):
    with open(path, "r+", encoding='utf-8') as file:
        data = file.read()
        for _ in range(12):
          data = data.replace('\n\n', '\n')

        for char in illegal_characters:
          data = data.replace(char, '')

        file.write(data)
          

def main():
    for path in [p for p in os.listdir(os.curdir) if p.endswith(".txt")]:
        clean_file(path)


if __name__ == "__main__":
    main()