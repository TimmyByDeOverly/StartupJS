import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import TodoItem from 'components/TodoItem'
import './index.styl'
import { observer, useQuery } from 'startupjs'

export default observer(function InputBox () {

  const [todos, $todos] = useQuery('todos', {})
  if(!todos) return null

  const [input, setInput] = useState('')

  const [completedCount = 0] = useQuery('todos', {$count : true, completed : true})
  const [unCompletedCount = 0] = useQuery('todos', {$count : true, completed : false})

  const addTodo = () => {
      $todos.add({
        text : input,
        completed : false,
        createdAt : Date.now()
      })
    setInput('')
  }

  const onEdit = (id, text) => $todos.at(id).setEach('text', text)
  const onDelete = (id) => $todos.at(id).del()
  const onToggleCompleted = (id) => {
    const flag = $todos.at(id).set('completed', true)
    $todos.at(id).set('completed', !flag)
  }

  return pug`
    View.container
      View.todoHeader
        Text.textHeaderText TODOAPP
      View.inputContainer
        TextInput.inputForm(
          placeholder='Enter post'
          placeholderTextColor='black'
          value=input
          onChangeText=input => setInput(input)
        )
        TouchableOpacity.inputButton(
          onPress=() => addTodo()
        )
          Text.inputButtonText ADD            
      View
        ScrollView
          each item in todos
            TodoItem(
              key=item.id
              title=item.text
              createdAt=item.createdAt
              onCompletFlag=item.completed
              onToggleCompleted=() => onToggleCompleted(item.id)
              onEdit=() => onEdit()
              onDelete=() => onDelete(item.id)
            )
      View
        Text Completed: #{completedCount} / Text Items count: #{unCompletedCount}       
`
})