import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import Item from 'components/Item'
import './index.styl'
import { observer } from 'startupjs'

export default observer(function App () {

  const [input, setInput] = useState('')
  const[item, setItem] = useState([])

  const AddTodo = () => {
    if(input) {
      const date = new Date()
      setItem([...item, {
        text : input,
        key : Date.now(),
        completed : false,
        date : date.getDay() +
          "/" + (date.getMonth() + 1) +
          "/" + date.getFullYear()
      }])
    }
    setInput('')
  }

  const EditTodo = (id, newItem) => {
    setItem(item.filter((edit) => {
      if(edit.id === id) return edit.text = newItem
      else return edit
    }))
  }

  const DeleteTodo = (id) => {
    setItem(item.filter((todo) => {
      if (todo.key !== id) return true
    }))
  }

  const TodoCompleted = (id) => {
    setItem(item.filter((todo) => {
      if (todo.key === id) todo.completed = !todo.completed
      return todo
    }))
  }

  const CompletedItems = (item) => item.filter(count => count.completed).length

  const Items = (item) => item.length


  return(

    <View styleName='container'>

      <View styleName='headerTodo'>
        <Text styleName='headerText'>TODOAPP</Text>
      </View>

      <View styleName='containerInput'>
        <TextInput
          styleName='input'
          placeholder='Enter post'
          placeholderTextColor='black'
          value={input}
          onChangeText={input => setInput(input)}
        />
        <TouchableOpacity
          styleName='button'
          onPress={() => AddTodo()}
        >
          <Text styleName='text'>ADD</Text>
        </TouchableOpacity>
      </View>

      <View>
        <ScrollView>
          {item.map((text) => (
            <Item
              key={text.id}
              item={text.text}
              date={text.date}
              state={text.completed}
              completed={() => TodoCompleted(text.key)}
              edit={() => EditTodo()}
              delete={() => DeleteTodo(text.key)}
            />
          ))}
        </ScrollView>
      </View>

      <View>
        <Text>
          Completed: {CompletedItems(item)} / Items count : {Items(item)}
        </Text>
      </View>

    </View>
  )
})