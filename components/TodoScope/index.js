import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import TodoItem from 'components/TodoItem'
import './index.styl'
import { observer, useQuery } from 'startupjs'

export default observer(function TodoScope () {

  const [todos, $todos] = useQuery('todos', {})
  if(!todos) return null

  const [input, setInput] = useState('')

  const [completedCount = 0] = useQuery('todos', {$count : true, completed : true})
  const [unCompletedCount = 0] = useQuery('todos', {$count : true, completed : false})

  const addTodo = () => {
      const date = new Date()
      $todos.add({
        text : input,
        completed : false,
        date : date.getDay() +
          "/" + (date.getMonth() + 1) +
          "/" + date.getFullYear()
      })
    setInput('')
  }

  const onEdit = (id, text) => $todos.at(id).setEach('text', text)
  const onDelete = (id) => $todos.at(id).del()
  const onCompleted = (id) => $todos.at(id).set('completed', true)

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
              data=item.text
              todosDate=item.date
              onCompletFlag=item.completed
              onCompleted=() => onCompleted(item.id)
              onEdit=() => onEdit()
              onDelete=() => onDelete(item.id)
            )
      View
        Text Completed: #{completedCount} / Text Items count: #{unCompletedCount}       
`
})