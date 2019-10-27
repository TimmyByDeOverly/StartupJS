import React, { useState } from 'react'
import { View, Text, Button, TextInput } from 'react-native'
import './index.styl'
import { observer } from 'startupjs'

export default observer(function TodoItem(props) {

  const [editFlag, setEditFlag] = useState(false)
  const [input, setInput] = useState(props.input)

  const toggleEdit = () => setEditFlag(ok => !ok)

  return pug`
  View.container
    View
      View.navigationButtons
        Button(
          title='Complete'
          onPress=props.onToggleCompleted
        )
        Button(
          title='Delete'
          onPress=props.onDelete
        )
        Button(
          title='Edit'
          onPress=toggleEdit
        )
    View
      if editFlag
        TextInput.textInput(
          value=input
          onSubmitEditing=() => props.onEdit(props.title.id, input)
          onChangeText=input => setInput(input)
        )
        if props.onCompletFlag
          Text.flagCompleted Completed!
      else
        View
          Text.unfulfilledTodo
            ${props.title}
          if props.onCompletFlag
            Text.flagCompleted Completed!
`
})