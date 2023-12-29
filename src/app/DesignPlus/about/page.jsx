import React from 'react'
import Aboutus from './components/aboutus/Aboutus'
import Team from './components/Team/Team'
import Circle from './components/Circle/Circle'
import '../../styles/style.css'
import '../css/style.css'
import '../../components/Header/header.css'
/* import Cycle from './components/Cycle'
 */

const about = () => {
  return (
    <div>
      <div style={{ height: '70px' }}>
      </div>
      <Aboutus />
      <Circle />
      <Team />
      {/* <Cycle /> */}
    </div>
  )
}

export default about