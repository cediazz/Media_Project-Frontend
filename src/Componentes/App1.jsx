import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ContextUser } from './Context/StateUsersGlobals'
import Signin from './Login/Signin'
import Sidebar from './Sidebar/Sidebar'
import { Container, Row, Col } from 'react-bootstrap'
import Media from './MediaManagement/MediaManagement'
import Plan from './PlanManagement/PlanManagement'
import Category from './CategoryManagement/CategoryManagement'


function App1(props) {
   
    return (
        <BrowserRouter>
        <Container fluid={true}>
          <Row>
            <Col sm={3}><Sidebar /></Col>
            <Col sm={9}>
              <Routes>
                <Route path="/Login" element={<Signin />} />
                <Route path="/gestionar-medios" element={<Media />} />
                <Route path="/gestionar-planos" element={<Plan />} />
                <Route path="/gestionar-categoria" element={<Category />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </BrowserRouter>
    )
}
export default App1