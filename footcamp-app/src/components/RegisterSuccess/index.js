import React from 'react'
import { withRouter } from "react-router-dom"
import InitialHeader from '../InitialHeader'

function RegisterSuccess(props){
    
    const { history } = props
    
    return (
        <div>
          <section className="register-successful">
            <InitialHeader />
            
            <h2 className="register-successful__title" >REGISTER SUCCESS</h2>
            <div className="register-successful__content">
            

            
            <a className="links" href="#" onClick={event => {
                event.preventDefault()
                history.push('/login')
            }}>Go to Login</a>

          <a className="link" href="#" onClick={event => {
            event.preventDefault()
            history.push('/')
              }}> 
              <i className="fas fa-arrow-circle-left fa-2x"> </i>
            </a>


         </div>
         </section>
       </div>
        
    )
}

export default withRouter(RegisterSuccess)