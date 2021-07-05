import React, { useEffect } from 'react'
import { ToastAndroid } from 'react-native'
// import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import {
  Container,
  InputText,
  ButtonCreateMessage
} from './styles'
import usePost from '../../hooks/usePost'

const Message = ({navigation}) => {
  const [postData, post] = usePost('feed')
  // const navigation = useNavigation()
  const { control, handleSubmit, formState: { errors } } = useForm({ criteriaMode: 'all' })
  
  const hasError = errors.content?.message ? true : false
  const showToast = () => {
    ToastAndroid.show("Erro cadastrar mensagem!", ToastAndroid.LONG)
  }
  const onSubmit = data => {
    if (hasError) {
        return
    }
    try {
      post(data)
      if(postData.error.length > 0) {
        showToast()
        return
      }
      navigation.goBack()
    } catch (error) {
      console.log(error)
      return
    }
  }

  return (
    <Container>
      <Controller
        styles={{ padding: 0 }}
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Este campo é requerido!'
          },
          minLength: {
            value: 3,
            message: 'mensagem deve ter pelo menos 3 caracteres'
          }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <InputText
            label='Sua mensagem'
            autoCorrect={false}
            autoCapitalize='none'
            onChangeText={onChange}
            placeholder='digite sua mensagem'
            onBlur={onBlur}
            value={value}
            errorMessage={errors.message?.message}
            returnKeyType='next'
          />
        )}
        name='content'
        defaultValue=''
      />
      <ButtonCreateMessage
        loading={postData.loading}
        title='Cadastrar'
        onPress={handleSubmit(onSubmit)}
      />
    </Container>
  )
}
export default Message
