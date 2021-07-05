import styled from 'styled-components/native'
import { Button, Input } from 'react-native-elements'

export const Container = styled.View`
flex: 1;
justify-content: center;
align-content: center;
background-color: white;
/* background-color: #f0f0f0; */
padding-left: 18px;
padding-right: 18px;
`
export const InputText = styled(Input)`
background-color: white;
color: black;
font-family: 'Jost Medium 500'
`
export const ButtonSignIn = styled(Button).attrs({
  containerStyle: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  buttonStyle: {
    backgroundColor: 'red',
    height: 60
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Jost Medium 500'
  }
})`
margin-left: 10px;
`
export const ButtonCreateAccount = styled(Button).attrs({
  titleStyle: {
    color: 'red',
    fontWeight: 'bold',
    fontFamily: 'Jost Medium 500'
  }
})`
`

export const ContainerCreateAccount = styled.View`
flex-direction: row;
margin-top: 20px;
justify-content: flex-end;
align-items: center;
margin-right: 10px;
`

export const LabelCreateAccount = styled.Text`
margin-right: 10px;
color: black;
font-size: 15px;
font-family: 'Jost Medium 500'
`
export const Title = styled.Text`
margin-right: 10px;
margin-bottom: 40px;
text-align: center;
color: black;
font-size: 35px;
font-family: 'Jost Medium 500'

`
