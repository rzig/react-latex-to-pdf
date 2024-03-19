import { useEffect, useRef } from 'react';
import './App.css';

function downloadURI(uri: string, name: string) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


function App() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const pdfLatex = useRef<any>(null);
  useEffect(() => {
    // @ts-ignore
    pdfLatex.current = new PDFTeX();
  }, []);
  const compile = async () => {
    const latexBody = textareaRef.current?.value;
    if(pdfLatex.current == null) {
      return;
    }
    await pdfLatex.current.set_TOTAL_MEMORY(80*1024*1024);
    const dataurl = await pdfLatex.current.compile(latexBody);
    downloadURI(dataurl, "file.pdf");
  }
  return (
    <div className="App">
        Enter latex here:<br/>
        <textarea style={{width: 500, height: 1000}} ref={textareaRef}>
          
        </textarea><br/>
        <button onClick={compile}>Download</button>
    </div>
  );
}

export default App;
