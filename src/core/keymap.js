export default {
  'Ctrl-F': () => {
    cm.setOption('fullScreen', !cm.getOption('fullScreen'))
    this.$refs?.preview?.classList.toggle('fullscreen')
  },
  // strong
  'Cmd-B'(cm) {
    const doc = cm.getDoc()
    const selection = doc.getSelection()
    if (selection) {
      doc.replaceSelection(`**${selection}**`)
    } else {
      const cursor = doc.getCursor()
      doc.replaceRange('****', cursor)
      cursor.ch += 2
      doc.setCursor(cursor)
    }
  },
  // italic
  'Cmd-I'(cm) {
    const doc = cm.getDoc()
    const selection = doc.getSelection()
    if (selection) {
      doc.replaceSelection(`*${selection}*`)
    } else {
      const cursor = doc.getCursor()
      doc.replaceRange('**', cursor)
      cursor.ch += 1
      doc.setCursor(cursor)
    }
  },
  // underline
  'Cmd-U'(cm) {
    const doc = cm.getDoc()
    const selection = doc.getSelection()
    if (selection) {
      doc.replaceSelection(`<u>${selection}</u>`)
    } else {
      const cursor = doc.getCursor()
      doc.replaceRange('<u></u>', cursor)
      cursor.ch += 3
      doc.setCursor(cursor)
    }
  },
  // code
  'Alt-`'(cm) {
    const doc = cm.getDoc()
    const cursor = doc.getCursor()
    doc.replaceRange('``', cursor)
    cursor.ch += 1
    doc.setCursor(cursor)
  },
  // ref link
  'Cmd-K'(cm) {
    const doc = cm.getDoc()
    const cursor = doc.getCursor()
    doc.replaceRange('[]()', cursor)
    cursor.ch += 1
    doc.setCursor(cursor)
  },
  // code block
  'Alt-`'(cm) {
    const doc = cm.getDoc()
    const cursor = doc.getCursor()
    doc.replaceRange('```\n\n```', cursor)
    cursor.ch += 3
    doc.setCursor(cursor)
  },
  // tab to space
  Tab(cm) {
    const doc = cm.getDoc()
    const cursor = doc.getCursor()
    doc.replaceRange('  ', cursor)
  },
}
