import React, {useState} from 'react'
import { View, Text, Button, TextInput } from 'react-native'
import './index.styl'
import { observer } from 'startupjs'

export default observer(function TodoItem(props) {

  const [editFlag, setEditFlag] = useState(false)
  const [input, setInput] = useState('')

  const toggleEdit = () => setEditFlag(ok => !ok)

  return pug`
  View.container
      View.greenButton
          Button(
              title='C'
              color='green'
              onPress=props.onCompleted
          )
      View
        if editFlag
          TextInput(
          value=input
          onSubmitEditing=() => props.onEdit(props.data.id, input)
          onChangeText=input => setInput(input)
          onPress=() => toggleEdit()
        )
        else
          View
            if props.onCompletFlag
              Text.todoCompleted
                #{props.data}
            else
              Text.unfulfilledTodo
                #{props.data} 
      View.redButton
          Button(
              color='red'
              title='DEL'
              onPress=props.onDelete
          )  
`
})