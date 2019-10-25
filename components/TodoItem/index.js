import React, {useState} from 'react'
import { View, Text, Button, TextInput } from 'react-native'
import './index.styl'
import { observer } from 'startupjs'

export default observer(function TodoItem(props) {

  const [editFlag, setEditFlag] = useState(false)
  const [input, setInput] = useState(props.input)

  const toggleEdit = () => setEditFlag(ok => !ok)

  return pug`
  View.container
      View.greenButton
          Button(
              title='C'
              color='green'
              onPress=props.onToggleCompleted
          )
          View.redButton
          Button(
              color='red'
              title='D'
              onPress=props.onDelete
          )
          View.yellowButton
          Button(
              color='#FFCE00'
              title='E'
              onPress=toggleEdit
          )
      View
        if editFlag
          if props.onCompletFlag
            Text.todoCompleted Completed!
          else  
          TextInput.textInput(
          value=input
          onSubmitEditing=() => props.onEdit(props.title.id, input)
          onChangeText=input => setInput(input)
          onPress=() => toggleEdit()
        )
        else
          View
            if props.onCompletFlag
              Text.todoCompleted Completed!
            else
              Text.unfulfilledTodo
                ${props.title}
`
})