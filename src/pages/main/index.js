import React from 'react'
import { View, FlatList, ToastAndroid } from 'react-native'
import { Card, Badge, ListItem, Text, Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import useGet from './../../hooks/useGet'
import usePost from './../../hooks/usePost'

const Main = () => {
  const getData = useGet('feeds')
  const [, post] = usePost('reaction')
  const navigation = useNavigation()

  const voteLike = (id, vote) => {
    const message = {
      feedId: id,
      like: !(vote > 0)
    }
    try {
      showToast('Voto recebido')
      post(message)
      getData.refetch()
    } catch (error) {
      showToast('Houve um erro ao votar')
    }
  }
  const voteLove = (id, vote) => {
    const message = {
      feedId: id,
      love: !(vote > 0)
    }
    try {
      showToast('Voto recebido')
      post(message)
      getData.refetch()
    } catch (error) {
      showToast('Houve um erro ao votar')
    }
  }
  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT)
  }
  const renderItem = ({ item }) => (
    <Card containerStyle={{ }} wrapperStyle={{}}>
      <ListItem.Title>
        <Text numberOfLines={6}>{item.content}</Text>
      </ListItem.Title>
      <ListItem.Subtitle style={{ marginTop: 10 }}>
        <Text>Autor: {item.author.username}</Text>
      </ListItem.Subtitle>
      <ListItem.Content>
        <ListItem style={{ flex: 1, alignSelf: 'center', marginTop: 15 }}>
          <Icon
            name={item.likes > 0 ? 'like1' : 'like2'}
            size={30}
            color={item.activeUserLikedIt > 0 ? 'red' : 'black'}
            onPress={() => voteLike(item.id, item.activeUserLikedIt)}
          />
          <Badge
            value={item.likes}
            textStyle={{ color: 'white' }}
            containerStyle={{ marginTop: -25, marginLeft: -15 }}
          />
          <Icon
            name={item.loves > 0 ? 'heart' : 'hearto'}
            size={30}
            color={item.activeUserLovedIt > 0 ? 'red' : 'black'}
            onPress={() => voteLove(item.id, item.activeUserLovedIt)}
          />
          <Badge
            value={item.loves}
            textStyle={{ color: 'white' }}
            containerStyle={{ marginTop: -25, marginLeft: -15 }}
          />
        </ListItem>
      </ListItem.Content>
    </Card>
  )
  return (
    <View style={{ flex: 1 }}>
      <Header
        centerComponent={{ text: 'Mensagens', style: { color: '#fff' } }}
        rightComponent={
          <Icon
            name='plus'
            size={30}
            color='white'
            onPress={() => navigation.navigate('Message')}
          />
        }
      />
      <FlatList
        maxToRenderPerBatch={15}
        style={{ width: '100%', marginBottom: 15 }}
        data={getData.data}
        keyExtractor={item => String(item.id)}
        renderItem={renderItem}
      />
    </View>
  )
}

export default Main
