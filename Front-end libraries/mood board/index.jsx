export function MoodBoardItem({color,image,description}) {
  return (
    <div className="mood-board-item" style= {{
      backgroundColor: color
    }}>
    <img className="mood-board-image" src= {image}/>
    <h3 className="mood-board-text">{description}</h3>
    </div>
  )
}

export function MoodBoard() {
  return(
    <div>
      <h1 className="mood-board-heading">Destination Mood Board</h1>
      <div className="mood-board">
      <MoodBoardItem color="#004d40" image="https://cdn.freecodecamp.org/curriculum/labs/pathway.jpg
" description="Kayaking in Thailand"/>
      <MoodBoardItem color="#1565c0" image="https://cdn.freecodecamp.org/curriculum/labs/shore.jpg" description="Beach walks in Ireland"/>
      <MoodBoardItem color="#33691e" image="https://cdn.freecodecamp.org/curriculum/labs/grass.jpg" description="Flowers blooming in Cambodia"/>
    </div>
  </div>)
}