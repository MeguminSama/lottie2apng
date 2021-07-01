import fs from 'fs'
import zlib from 'zlib'
import renderLottie from 'puppeteer-lottie'
import path from 'path'
import apng from 'node-apng'
const fileName = process.argv[2]

const url = path.parse(fileName)
if (!fs.existsSync(url.name)) fs.mkdirSync(url.name)

const data = fs.readFileSync(fileName)

const isGzip = buf =>
  !buf || buf.length < 3
    ? false
    : buf[0] === 0x1f && buf[1] === 0x8b && buf[2] === 0x08

if (isGzip(data)) {
  console.log('GZIP')
}

/** @type {object} */
const lottie = isGzip(data)
  ? zlib.gunzipSync(data).toString('utf-8')
  : data.toString('utf-8')

fs.writeFileSync('tmp.json', lottie)

renderLottie({
  path: 'tmp.json',
  output: `${url.name}/frame-%d.png`,
  height: 320,
  width: 320
})
  .then(data => {
    let framenames = []

    for (let i = 1; i <= data.numFrames; i++) {
      framenames.push(`${url.name}/frame-${i}.png`)
    }

    const images = framenames.map(path => fs.readFileSync(path))

    const output = apng(images, index => ({
      numerator: data.duration,
      denominator: data.numFrames
    }))

    fs.writeFileSync(`${url.name}.png`, output)
    fs.rmSync(`${url.name}`, { recursive: true })
    fs.rmSync('tmp.json')
  })
  .catch(console.error)
