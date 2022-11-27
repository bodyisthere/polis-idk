import { useState } from "react";

export function Messages() {
  const [user, setUser] = useState({
    name: 'artem ',
    friends: ['stas, ','maks, ','dima, '],
    posts: ['1, ','2, ','3, '],
  })

  // const { passwordHash, ...userData } = user._doc;
  const change = () => {
    console.log(user);
    const { friends, ...name } = user;
    console.log(name)
    friends.push('sasha')
    setUser({
      name,
      friends
    })
  }

  return (
      <div className="test">
        <button onClick={change}>change!</button>
      </div>
    )
}


