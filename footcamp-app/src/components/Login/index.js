import React, { useState, useContext } from 'react'
import logic from '../../logic'
import { withRouter } from "react-router-dom"
import Context from '../Context'
import Feedback from '../Feedback'
import InitialHeader from '../InitialHeader'


function Login(props) {


  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { user, setUser } = useContext(Context)
  const [error , setError] = useState(undefined) 
  const [league , setLeague] = useState(undefined) 
  const { history } = props
  
  
  function handleEmailInput(event) {
    event.preventDefault()
    setEmail(event.target.value)
  }

  function handlePasswordInput (event) {
    event.preventDefault()
    setPassword(event.target.value)
  }

  function handleLogin(email, password)  {

    return(async()=>{

        try {
          
          await logic.authenticateUser(email, password)
          
          //setting the user for further use
          const user = await logic.retrieveUser()
          setUser(user)
          sessionStorage.id= user.id
          
          //check if the user has leagues
          const leagueId = await logic.retrieveAllLeagues()
                    
          !leagueId ? history.push('/create-leagues') : history.push('/myleague')

          
        } catch({message}) {
            setError(message)
        }
        
      
        
    })()
 }

 const handleFormSubmit = event => {
   event.preventDefault()
   handleLogin(email, password)
}

  const handleBack = () => {
     
        history.push('/')
    }
  
    return (
        <div >
          <section className="login">
          <InitialHeader />
          <div className="login__content">
          <h2 className="login__content__title" >LOGIN</h2>
            <form onSubmit={handleFormSubmit}>
             <div className="form__inputs"> 
                <input
                    
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleEmailInput}
                    
                />
            </div>
            <div className="form__inputs">
                <input
                    
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handlePasswordInput}
                    
                />
              </div>
                <button>Submit</button>
            </form>
            {error && <Feedback message={error}/>}
            <a className="link" href="#" onClick={event => {
            event.preventDefault()
            handleBack()
        }}><i className="fas fa-arrow-circle-left fa-2x"></i></a>
        </div>
       
        </section>
        </div>
    )
}

export default withRouter(Login)
