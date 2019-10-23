import React, {useState} from 'react'
import { View, Text, Button, TextInput } from 'react-native'
import './index.styl'
import { observer } from 'startupjs'

export default observer(function Item(props) {

  const [edit, setEdit] = useState(false)
  const [input, setInput] = useState(props.input)

  const Edit = () => {
    setEdit(edit => !edit)
  }

    return(
        <View styleName='container'>

            <View styleName='greenButton'>
                <Button
                    title='C'
                    color='green'
                    onPress={props.completed}
                />
            </View>

            <View>
              {edit ?
                <TextInput
                  value={input}
                  onSubmitEditing={() => {
                    props.edit(props.item.id, input)
                    Edit()
                  }}
                  onChangeText={input => setInput(input)}
                /> : <Text styleName={props.state ? 'completed' : 'display'}>
                  {props.item} [date:{props.date}]
                </Text>}
            </View>

            <View styleName='redButton'>
                <Button
                    title='DEL'
                    color='red'
                    onPress={props.delete}
                />
            </View>

        </View>
    )
})