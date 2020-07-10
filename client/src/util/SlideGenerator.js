import pptxgen from "pptxgenjs";

const maxHeightPts = 550;

const generateSlides = payload => {
  const {
    bold,
    underline,
    fontColor,
    fontSize,
    backgroundImage,
    backgroundColor,
    songList,
    italics: italic,
    fontFamily: fontFace,
    textAlignment: align
  } = payload;

  let pptx = new pptxgen();

  pptx.author = 'LyricsSlides.io';
  pptx.company = 'LyricsSlides.io';
  pptx.subject = 'Presentation';
  pptx.title = 'Presentation';
  pptx.layout = 'LAYOUT_16x9';
  
  pptx.defineSlideMaster({
    title: "MASTER_SLIDE",
    bkgd: backgroundColor ? backgroundColor : { data: backgroundImage }
  });

  // Start Slide
  pptx.addSlide({ masterName: "MASTER_SLIDE"});
  const maxLines = getMaxLines(fontSize);

  for (let i = 0; i < songList.length; i++) {
    let curItem = songList[i].content;
    if (!curItem) { continue };

    let formattedContent = formatContent(curItem, maxLines);
    for (let j = 0; j < formattedContent.length; j++) {
      let newSlide = pptx.addSlide({ masterName: "MASTER_SLIDE"});
      let curFormattedContent = formattedContent[j].trim('\n');
      newSlide.addText(
        curFormattedContent, 
        {
          x: 0,
          y: 0,
          w: '100%',
          h: '100%',
          inset: 1,
          valign: 'top',
          color: fontColor.replace('#', ''),
          paraSpaceAfter: fontSize,
          align,
          bold,
          fontFace,
          fontSize, 
          italic,
          underline
        })
    }

    // End Slide
    pptx.addSlide({ masterName: "MASTER_SLIDE"});
  } 

  return pptx
}

const getMaxLines = fontSize => {
  return Math.floor(maxHeightPts / (parseInt(fontSize) * 4) )
}

const formatContent = (content, maxLines) => {
  let formattedContent = content.split('\n\n');
  for (let i = 0; i < formattedContent.length; i++) {
    let curSlide = formattedContent[i];
    let numLines = curSlide.split('\n').length
    if (numLines > maxLines) {
      let splitAt = Math.floor(numLines / 2)
      while (splitAt > maxLines) {
        splitAt = Math.floor(splitAt / 2)
      }

      let splitLines = curSlide.split('\n');
      let subArrays = []
      for (let j = 0, k = splitAt; j < numLines; j += splitAt, k += splitAt) {
          if ((numLines - j) < maxLines) {
            subArrays.push(splitLines.slice(j, numLines).join('\n'))
            break
          } else {
            subArrays.push(splitLines.slice(j, k).join('\n'))
          }
      }

      formattedContent.splice(i, 1, ...subArrays);
    }
  }

  return formattedContent
}

export default generateSlides;