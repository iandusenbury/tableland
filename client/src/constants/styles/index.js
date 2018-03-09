const thermalRed = '#ea4e46'
/*
const quantumOrange = "#ff9e15"
const atomicGreen = "#bed62f"
const waveBlue = "#8195b1"
const rawUmber = "#715558"
const sand = "#e7e0d7"
*/

const styles = {
  toolbar: {
    backgroundColor: thermalRed,
    width: '100vw',
    height: '56px',
    padding: '0px'
  },
  toolbarGroupLeft: {
    width: '20vw',
    flatButton: {
      marginLeft: '1vw',
      marginRight: '1vw',
      minWidth: '70px'
    }
  },
  toolbarGroupRight: {
    width: '80vw',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  searchBar: {
    width: '33vw',
    maxWidth: '300px',
    marginRight: '14px'
  }
}

export default styles
