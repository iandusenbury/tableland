const avatarSize = 64
const smallerButton = window.innerWidth < 650
const styles = {
  avatar: {
    size: avatarSize,
    margin: '10%'
  },
  legend: {
    height: 'auto',
    width: 'auto',
    position: 'absolute',
    top: '72px',
    left: '16px',
    iconButton: {
      float: 'right',
      position: 'relative',
      bottom: '6px',
      height: '16px'
    }
  },
  panButtonTo: {
    width: smallerButton ? '120px' : '150px',
    float: 'left',
    borderRadius: '15px 0px 0px 0px'
  },
  panButtonOut: {
    width: smallerButton ? '120px' : '150px',
    float: 'right',
    borderRadius: '0px 15px 0px 0px'
  },
  navButtonLeft: {
    width: smallerButton ? '120px' : '150px',
    float: 'left',
    borderRadius: '0px 0px 0px 15px'
  },
  navButtonRight: {
    width: smallerButton ? '120px' : '150px',
    float: 'right',
    borderRadius: '0px 0px 15px 0px'
  },
  chevron: {
    margin: 'auto',
    marginTop: '6px',
    position: 'relative',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0'
  }
}

export default {
  styles,
  avatarSize
}
