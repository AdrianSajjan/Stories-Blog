export const TinyMCEApiKey = 'f5vxz3lkvmh5zkhmal129sxmskybn2wef789jf1dzjy1yjo4'

export const plugins = [
  'advlist autolink lists link image charmap preview anchor',
  'searchreplace visualblocks code fullscreen',
  'insertdatetime media table paste code autoresize'
]

export const toolbar = [
  'undo redo ',
  'bold italic underline strikethrough',
  'fontselect fontsizeselect formatselect',
  'alignleft aligncenter alignright alignjustify',
  'outdent indent',
  'numlist bullist',
  'forecolor backcolor removeformat',
  'link image',
  'code'
].join(' | ')

export const content_style = `
  body {
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
  }
`

export const font_formats =
  "Poppins='Poppins',sans-serif;Metal Mania='Metal Mania',cursive;Roboto Mono='Roboto Mono',monospace;"

export const fontsize_formats = '8px 10px 12px 14px 1px 18px 20px 24px 36px 48px 72px'

export const editorInit = {
  min_height: 800,
  skin: 'material-classic',
  content_css: [
    'material-classic',
    'https://fonts.googleapis.com/css2?family=Metal+Mania&family=Poppins:wght@400;700&family=Roboto+Mono:wght@400;600&display=swap'
  ],
  icons: 'material',
  statusbar: false,
  menubar: false,
  toolbar_sticky: true,
  toolbar_mode: 'sliding',
  plugins,
  toolbar,
  font_formats,
  fontsize_formats,
  content_style
}
