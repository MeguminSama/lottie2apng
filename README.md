# Lottie2APNG

Built this for discord because compressing/resizing lottie files is a pain.

## Installation

```bash
npm install
```

## Example

You can use any tgs (gzipped Lottie) or .json/.lottie/etc file.

```bash
$ node . ./cutesticker.tgs
 or
$ node . ./cutesticker.json
 etc. etc.
```

will output an APNG file called `./cutesticker.png`

If it's too big, try compressing it with this tool https://tinypng.com/

If it's still too big, you could remove every 2nd frame and double the delay using this tool https://ezgif.com/apng-maker

## Notes

This uses puppeteer-lottie, so it's kinda bloated atm. Feel free to PR an alternative.
