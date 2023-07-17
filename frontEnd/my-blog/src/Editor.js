import JoditEditor from "jodit-react"


export default function Editor({value,onChange}) {
    return (
        <JoditEditor ref={editor} 
          value={content} 
        
          onChange={newValue => setContent(newValue)} />
    )
}