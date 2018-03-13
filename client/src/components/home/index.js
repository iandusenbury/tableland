import React from 'react'
import BottomTab from '../../widgets/tabs/tabViewProfile'
import Map from '../map'

const Home = () => (
  <div style={{ height: 'calc(100vh - 56px)' }}>
    <Map />
    <BottomTab />
  </div>
)

export default Home
