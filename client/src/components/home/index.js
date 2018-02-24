import React from 'react'
import BottomTab from '../../constants/tabs/tabViewProfile'
import Map from '../map'

const Home = () => (
  <div style={{ height: 'calc(100vh - 72px)' }}>
    <Map />
    <BottomTab />
  </div>
)

export default Home
