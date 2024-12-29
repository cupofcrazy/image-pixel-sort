import P5 from 'p5'
import { Pane } from 'tweakpane'
import { inject } from '@vercel/analytics'
import { $, systemFonts } from './lib/utils'
import './style.css'


const sketch = (p: P5) => {
  const WIDTH = 400
  const HEIGHT = 560

  const imageInput = $('input[type="file"]') as HTMLInputElement
  let img = p.loadImage('/images/longlegs-poster.jpg')

  const settings = {
    pixels: HEIGHT/2,
    imageScale: 1,
    hideImage: false,
    pixelSpeed: 0.05,
    font: 'Arial',
    text: '',
    textColor: '#fff',
    fontSize: 16,
    textPosition: {
      x: 0,
      y: -HEIGHT/2 + 32
    }
  }

  let isAdjustingPixels = false
  const pane = new Pane()


  p.setup = () => {
    const c = p.createCanvas(WIDTH, HEIGHT)
    c.parent('app')


    // drop area
    c.drop(file => {
      if (file.type === 'image') {
        img = p.loadImage(file.data, () => {
          console.log('Dropped image loaded successfully')
        }, (err) => {
          console.error('Error loading dropped image:', err)
        })
      }
    })

    // Load selected image
    imageInput.addEventListener('change', (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        img = p.loadImage(URL.createObjectURL(file))
      }
    })

    
    p.textFont(settings.font)
    
    /**
     * Settings
     */
    const imageSettingsFolder = pane.addFolder({
      title: 'Image Settings'
    })

    imageSettingsFolder.addBinding(settings, 'hideImage', {
      label: 'Hide Image',
    })

    imageSettingsFolder.addBinding(settings, 'pixels', {
      label: 'Pixel Position',
      min: 1,
      max: p.height - 1,
      step: 1
    }).on('change', () => {
      if (isAdjustingPixels) return
      isAdjustingPixels = true;

      // Reset the flag after a short delay
      setTimeout(() => {
        isAdjustingPixels = false;
      }, 500);
    });

    imageSettingsFolder.addBinding(settings, 'imageScale', {
      label: 'Image Scale',
      min: 0.5,
      max: 1.5,
      step: 0.01
    })

    imageSettingsFolder.addBinding(settings, 'pixelSpeed', {
      label: 'Pixel Speed',
      min: 0,
      max: 0.5,
      step: 0.01
    })

    /**
     * Font and text settings
     */
    const textSettingsFolder = pane.addFolder({
      title: 'Text Settings',
      expanded: false
    })

    textSettingsFolder.addBinding(settings, 'textColor')
    textSettingsFolder.addBinding(settings, 'fontSize', {
      min: 10,
      max: 100,
      step: 1
    })

    textSettingsFolder.addBinding(settings, 'text')
    textSettingsFolder.addBinding(settings, 'font', {
      options: systemFonts,
    }).on('change', (props) => {
      p.textFont(props.value)
    })
    textSettingsFolder.addBinding(settings, 'textPosition', {
      x: {
        min: -WIDTH/2,
        max: WIDTH/2,
        step: 1
      },
      y: {
        min: -HEIGHT/2,
        max: HEIGHT/2,
        step: 1
      }
    })


    // Save button for PNG
    const saveButton = pane.addButton({
      title: 'Save PNG',
    })
    saveButton.on('click', () => {
      p.save('pixel-image.png')
    })

    // Save button for GIF
    const saveButtonGif = pane.addButton({
      title: 'Save GIF',
    })
    saveButtonGif.on('click', () => {
      p.saveGif('pixel-image.gif', settings.pixelSpeed * 100, () => {
        console.log('saved')
      })
    })
  }

  
  p.draw = () => {
    /**
     * Background
     */
    p.background('#111')


    /**
     * Pixel lines from image
     */
    p.push()
    p.imageMode(p.CENTER)
    img.loadPixels()
    for (let x = 0; x <= p.width; x++) {
      const sourceX = x
      const yOffset = p.sin(p.frameCount * settings.pixelSpeed + x * 0.1)
      const sourceY = (settings.pixels * (img.height / p.height)) + yOffset
      const c = img.get(sourceX * (img.width / p.width), sourceY)
      p.stroke(c)
      p.strokeWeight(1)

      const lineHeight = p.height + p.sin(p.frameCount * 0.02 * 0.05)
      p.rect(x, 0, 1, lineHeight)
    }
    p.pop()

    /**
     * Selected image
     */
    if (!settings.hideImage) {
      const aspectRatio = img.width / img.height
      const maxWidth = p.width / 2

      const imageWidth = Math.min(maxWidth, img.width)
      const imageHeight = imageWidth / aspectRatio

      p.push()
      p.imageMode(p.CENTER)
      p.translate(p.width / 2, p.height / 2)
      p.scale(settings.imageScale)
      p.image(img, 0, 0, imageWidth, imageHeight)

      // Only draw the horizontal helper line when adjusting pixels
      if (isAdjustingPixels) {
        p.stroke('#ffffff') // White line
        p.strokeWeight(1)
        const yPos = (settings.pixels * (img.height / p.height)) * (imageHeight / img.height)
        p.line(-imageWidth/2, yPos - imageHeight/2, imageWidth/2, yPos - imageHeight/2)
      }
      p.pop()
    }
    
    /**
     * Text
     */
    p.push()
    p.textSize(settings.fontSize)
    p.textWrap(p.WORD)
    p.fill(settings.textColor)
    p.textAlign(p.CENTER, p.CENTER)
    p.translate(p.width/2, p.height/2)
    p.text(settings.text, settings.textPosition.x, settings.textPosition.y)
    p.pop()
  }
}

new P5(sketch)

inject()
