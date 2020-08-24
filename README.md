# CLI wrapper of https://github.com/zy445566/node-digital-watermarking


# Installation

to be done


# Usage


## Embedding text into image(s)

```bash
dwmark encode <text> <origin> <encoded> [size]

text     text to be hidden
origin   path to origin image file(s), glob supported (*.jpg)
encoded  saving location of the encoded image(s), can be a directory
```

## Convert encoded image(s) for text viewing

```bash
dwmark decode <encoded> <decoded>

encoded  path to encoded image(s), glob supported (*.jpg)
decoded  saving location of the decoded image, can be a directory
```