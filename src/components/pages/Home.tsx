import React, { useContext, useEffect, useState } from "react"

import { AuthContext } from "App"
import { Player } from "interfaces/index"
import { getPlayers } from "lib/api/players"

const Home: React.FC = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext)
  const [players, setPlayers] = useState<Player[]>([])

  useEffect(() => {
    const handleGetPlayers = async () => {
      try {
        const res = await getPlayers()
        setPlayers(res?.data)
      } catch (err) {
        // Error
        // console.log(err)
      }
    }

    handleGetPlayers()
  }, [setPlayers])

  return (
    <>
      {
        isSignedIn && currentUser ? (
          <>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Number</th>
                  <th>Nationality</th>
                  <th>Position</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player, index) => (
                  <tr key='{index}'>
                    <td>{player.name}</td>
                    <td>{player.age}</td>
                    <td>{player.number}</td>
                    <td>{player.nationality}</td>
                    <td>{player.position}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <h1>Not signed in</h1>
        )
      }
    </>
  )
}

export default Home
