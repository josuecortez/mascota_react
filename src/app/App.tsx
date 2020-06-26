import React from "react"
import { HashRouter, Route } from "react-router-dom"
import LoggedInRoute from "../common/components/LoggedInRoute"
import Info from "../info/Info"
import NewPet from "../pets/NewPet"
import Pets from "../pets/Pets"
import LostPets from "../pets/lostMyPet/LostPets"
import FindPets from "../pets/findPets/findPets"
import FindProfile from "../profile/FindProfile"
import Profile from "../profile/Profile"
import Login from "../user/Login"
import Password from "../user/Password"
import Register from "../user/Register"
import Welcome from "../welcome/Welcome"
import "./App.css"
import Menu from "./Menu"
import Toolbar from "./Toolbar"

export default function App() {
  return (
    <HashRouter>
      <table className="app_table">
        <thead>
          <tr className="app_toolbar">
            <td colSpan={2} >
              <Toolbar />
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="app_menu">
              <Menu />
            </td>
            <td id="content" className="app_content">
              <Route exact path="/" component={Welcome} />
              <Route exact path="/login" component={Login} />
              <Route path="/newUser" component={Register} />
              <LoggedInRoute path="/info" component={Info} />
              <LoggedInRoute path="/password" component={Password} />
              <LoggedInRoute path="/profile" component={Profile} />
              <LoggedInRoute path="/pets" component={Pets} />
              <LoggedInRoute path="/editPet" component={NewPet} />
              <LoggedInRoute path="/editPet/:id" component={NewPet} />
              <LoggedInRoute path="/pets/lostMypet" component={LostPets} />
              <LoggedInRoute path="/pets/findPets" component={FindPets} />
              <LoggedInRoute path="/profile/:userId" component={FindProfile} />

            </td>
          </tr>
        </tbody>
      </table>
    </HashRouter >
  )
}
