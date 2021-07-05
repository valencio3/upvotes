import React, { useEffect } from 'react'
import { ToastAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import api from '../../services/api'
import {
  Container,
  InputText,
  ButtonSignIn,
  ButtonCreateAccount,
  ContainerCreateAccount,
  LabelCreateAccount,
  Title
} from './styles'
import usePost from './../../hooks/usePost'

const SignIn = ({ navigation }) => {
  const [postData, post] = usePost('sign-in')
  // const navigation = useNavigation()
  const { control, handleSubmit, formState: { errors } } = useForm({ criteriaMode: 'all' })
  
   useEffect(() => {
    if(postData.data.length > 0) {
      api.defaults.headers.Authorization = `Bearer ${postData.data}`
      navigation.navigate('Main')
    }
   },[postData.data])

  const hasError = errors.username?.message || errors.password?.message ? true : false
  const showToast = () => {
    ToastAndroid.show("Erro fazer login!", ToastAndroid.LONG)
  }
  const onSubmit = data => {
    if (hasError) {
        return
    }
    try {
      post(data)
      if(postData.error.length > 0) {
        showToast()
      }
    } catch (error) {
      console.log(error)
      return
    }
  }

  const handleCreateAccount = () => {
    navigation.navigate('SignUp')
  }

  return (
    <Container>
      <Title>Login</Title>
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
            message: 'o usuário deve ter pelo menos 3 caracteres'
          }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <InputText
            label='Usuário'
            autoCorrect={false}
            autoCapitalize='none'
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholder='seu usuário'
            errorMessage={errors.username?.message}
            returnKeyType='next'
            leftIcon={<Icon name='account-circle' size={35} color='black' />}
            leftIconContainerStyle={{ background: 'red' }}
          />
        )}
        name='username'
        defaultValue=''
      />
      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Este campo é requerido!'
          },
          minLength: {
            value: 3,
            message: 'a senha deve ter pelo menos 3 caracteres'
          }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <InputText
            label='Senha'
            autoCorrect={false}
            autoCapitalize='none'
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            errorMessage={errors.password?.message}
            returnKeyType='next'
            placeholder='sua senha'
            secureTextEntry
            leftIcon={<Icon name='lock' size={35} color='black' />}
          />
        )}
        name='password'
        defaultValue=''
      />
      <ButtonSignIn loading={postData.loading} title='Entrar' onPress={handleSubmit(onSubmit)} />
      <ContainerCreateAccount>
        <LabelCreateAccount>Não tem cadastro?</LabelCreateAccount>
        <ButtonCreateAccount title='Cadastre-se' type='clear' onPress={handleCreateAccount} />
      </ContainerCreateAccount>
    </Container>
  )
}
export default SignIn
