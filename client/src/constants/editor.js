export const TinyMCEApiKey = 'f5vxz3lkvmh5zkhmal129sxmskybn2wef789jf1dzjy1yjo4'

export const plugins = [
  'advlist autolink lists link image charmap',
  'code  autoresize anchor textcolor emoticons',
  'insertdatetime media table code preview'
]

export const toolbar1 = [
  'undo redo',
  'fontselect fontsizeselect styleselect',
  'bold italic underline',
  'backcolor forecolor',
  'bullist numlist outdent indent',
  'alignleft aligncenter alignright alignjustify',
  'link image emoticons charmap',
  'table insertdatetime',
  'code preview'
].join(' | ')

export const content_style = `
  body {
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
  }
`

export const font_formats = [
  "Poppins='Poppins',sans-serif;",
  "Metal Mania='Metal Mania',cursive;",
  "Roboto Mono='Roboto Mono',monospace;"
].join('')

export const fontsize_formats = '8px 10px 12px 14px 16px 18px 20px 24px 36px 48px 72px'

export const content_css = [
  'https://fonts.googleapis.com/css2?family=Metal+Mania&family=Poppins:wght@400;700&family=Roboto+Mono:wght@400;600'
]

export const editorInit = {
  min_height: 800,
  skin: 'snow',
  icons: 'thin',
  statusbar: false,
  menubar: false,
  toolbar_mode: 'wrap',
  plugins,
  toolbar1,
  font_formats,
  fontsize_formats,
  content_css,
  content_style
}
